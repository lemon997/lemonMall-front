<template>
  <div id="settlement" v-if="goods.length">
    <!-- 导航栏 -->
    <nav-bar title="确认订单" :isShowLeft="true"></nav-bar>
    <!-- 收货人信息 -->
    <settlement-consignee
      :address="address"
      @goAddressOnClick="goAddressOnClick"
    ></settlement-consignee>
    <!-- 商品信息 -->
    <settlement-goods :goods="goods"></settlement-goods>
    <!-- 提交订单 -->
    <van-submit-bar
      :price="totalPrice"
      :loading="loading"
      button-text="提交订单"
      @submit="onSubmit"
    />
    <!-- 提交订单完成遮罩层 -->
    <settlement-pay :info="pay" @blanceOnClick="blanceOnClick"></settlement-pay>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { Notify } from "vant";
import {
  getSettlementData,
  submitOrder,
  // getPayCode,
  // getPayStatus,
  balancePay,
} from "network/order";
import { getAddressDetail } from "network/address";
import { getTel } from "common/utils";

// childcomp
import SettlementConsignee from "./childComp/SettlementConsignee";
import SettlementGoods from "./childComp/SettlementGoods";
import SettlementPay from "./childComp/SettlementPay";
// components
import NavBar from "components/content/navBar/NavBar";

export default {
  name: "Settlement",
  components: {
    // childComp
    SettlementConsignee,
    SettlementGoods,
    SettlementPay,
    // components
    NavBar,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();

    // 数据模型
    const state = reactive({
      address: {},
      goods: [],
      address_id: "",
      product_ids: [],
      loading: false,
      price: [],
      order_nos: [],
      pay: {
        show: false,
        order_id: "",
        alipay: "",
        wechat: "",
        balance: "",
      },
    });
    // 计算总价
    const totalPrice = computed(() => {
      var arr = [];
      let sum = 0;
      state.goods.forEach((item) => {
        sum += parseInt(item.num) * parseFloat(item.goods.price);
        arr.push(parseInt(item.num) * parseFloat(item.goods.price) * 100);
      });
      state.price = arr;

      return sum * 100;
    });

    // 初始化网络请求
    const init = () => {
      // 如果路由传入address_id
      if (route.query.address_id) {
        getAddressDetail(route.query.address_id).then((result) => {
          state.address = result;
          state.address_id = result.id;
        });
      }

      var arr = [];
      for (var i in state.product_ids) {
        arr.push(parseInt(state.product_ids[i]));
      }

      // 获取结算订单预览
      var data1 = {
        settlement_product_ids: arr,
      };
      getSettlementData(data1).then((result) => {
        // 如果存在地址，则获取默认地址
        if (result.access_addrs.length && !route.query.address_id) {
          // 判断是否存在默认地址，如果存在则给页面显示默认地址，否则显示第一条地址
          if (
            !result.access_addrs.filter((item) => item.is_default == 1).length
          ) {
            state.address = result.access_addrs[0];
          } else {
            state.address = result.access_addrs.find(
              (item) => (item.is_default = 1)
            );
          }
          state.address.phone = getTel(state.address.phone);
          // 地址id
          state.address_id = state.address.customer_addr_id;
        }
        state.goods = result.goods;
      });
      // 页面刷新，设置vuex-settlementAddressId状态为false
      store.commit("setSettlementAddressId", false);
    };

    // 支付网络请求
    const _getPayCode = (order_id, type) => {
      // getPayCode(order_id, type).then((result) => {
      //   if (type == "aliyun") {
      //     state.pay.alipay = result.qr_code_url;
      //   } else if (type == "wechat") {
      //     state.pay.wechat = result.qr_code_url;
      //   }
      state.pay.order_id = order_id;
      state.pay.show = true;

      setTimeout(() => {
        state.loading = false;
      }, 1000);
      //   // 轮询查看支付是否完成
      // _getPayStatus(order_id);
      // });
    };

    // 轮询查看支付状态
    // const _getPayStatus = (order_id) => {
    //   const timer = setInterval(() => {
    //     getPayStatus(order_id).then((result) => {
    //       // 支付完成，跳转到订单详情页面
    //       if (result != 1) {
    //         // 清除轮询
    //         clearInterval(timer);
    //         // 跳转页面
    //         router.push({
    //           path: "/orderDetail",
    //           query: {
    //             id: order_id,
    //           },
    //         });
    //       }
    //     });
    //   }, 5000);
    // };

    //点击付款的事件
    const blanceOnClick = () => {
      var arr = [];
      for (var i in state.price) {
        arr.push(parseInt(state.price[i]));
      }

      var arr1 = [];
      for (var i in state.order_nos) {
        arr1.push(parseInt(state.order_nos[i]));
      }

      // 提交付款订单和订单编号
      var data1 = {
        order_nos: arr1,
        price: arr,
        pay_type: 'balance',
      };
      balancePay(data1).then((result) => {
        // console.log(result);
        router.push({
          path: '/order',
          query: {
            status: 0
          }
        })
      });
    };
    // 挂载
    onMounted(() => {
      // 路由id赋值给当前id
      state.product_ids = route.query.id;
      init();
    });

    // 跳转到
    const goAddressOnClick = () => {
      // 在结算页面地址为空时，跳转到地址管理页面，设置vuex--settlementAddressId状态为true
      store.commit("setSettlementAddressId", true);
      router.push({
        path: "/address",
      });
    };

    // 提交订单
    const onSubmit = () => {
      if (!state.address_id) {
        Notify("请先选择收货地址");
        return false;
      }
      state.loading = true;

      var arr = [];
      for (var i in state.product_ids) {
        arr.push(parseInt(state.product_ids[i]));
      }

      var data1 = {
        addr_id: state.address_id,
        product_ids: arr,
      };

      submitOrder(data1).then((result) => {
        // 设置购物车数量
        store.dispatch("updateCartCount");
        state.order_nos = result.order_nos;
        // _getPayCode(result.order_nos, "aliyun");
        // _getPayCode(result.order_nos, "wechat");
        _getPayCode(result.order_nos, "balance");
      });
    };

    return {
      ...toRefs(state),
      totalPrice,
      goAddressOnClick,
      onSubmit,
      blanceOnClick,
    };
  },
};
</script>

<style scoped lang="scss">
#settlement {
  background: #eeeeee;
  height: 100vh;
  margin-bottom: 50px;
}
</style>