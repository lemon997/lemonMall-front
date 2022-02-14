<template>
  <div class="detail">
    <!-- 导航栏 -->
    <nav-bar title="订单详情" :isShowLeft="true"></nav-bar>
    <div v-if="Object.keys(order).length">
      <!-- 地址信息 -->
      <order-detail-address :address="address"></order-detail-address>
      <!-- 订单信息 -->
      <order-detail-info :info="order"></order-detail-info>
      <!-- 商品信息 -->
      <order-detail-goods :goods="value"></order-detail-goods>
      <!-- 底部 -->
      <order-detail-bottom :info="bottom" @goPayOnClick="goPayOnClick"></order-detail-bottom>
      <!-- 弹出层 -->
      <payment :info="payment" @paymentOnClose="paymentOnClose" @blanceOnClick="blanceOnClick"></payment>
    </div>
  </div>
</template>

<script>
  import { onMounted, reactive, toRefs } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { orderDetail,balancePay } from 'network/order';
  import { getAddressDetail } from 'network/address';
  import { getTel } from 'common/utils';

  // childComp
  import OrderDetailInfo from './childComp/detail/OrderDetailInfo';
  import OrderDetailAddress from './childComp//detail/OrderDetailAddress';
  import OrderDetailGoods from './childComp/detail/OrderDetailGoods';
  import OrderDetailBottom from './childComp/detail/OrderDetailBottom';
  // components
  import NavBar from 'components/content/navBar/NavBar';
  import Payment from 'components/content/payment/Payment';

  export default {
    name: 'OrderDetail',
    components: {
      // childComp
      OrderDetailInfo,
      OrderDetailAddress,
      OrderDetailGoods,
      OrderDetailBottom,
      // components
      NavBar,
      Payment
    },
    setup() {
      const router = useRouter();
      const route = useRoute();
      // 数据模型
      const state = reactive({
        order: {},
        value:{
          goods:[],
          num:1,
        },
        // goods: [],
        // num:1,
        address: {},
        order_id: route.query.id,
        bottom: {
          status: 1,
          loading: false
        },
        payment: {
          show: false,
          order_id: '',
          alipay: '',
          wechat: '',
          
        }
      });

      // 初始化网络请求
      const init = () => {
        orderDetail(state.order_id).then(result => {
          
          // 商品信息
          state.value.num = result.data.order_detail.num
          
          state.value.goods = result.data.goods;
          // 订单信息
          state.order = result.data.order_detail;
          // 订单状态
          state.bottom.status = result.data.order_detail.order_status;
          // 地址信息
          _getAddressDetail(result.data.order_detail.customer_addr_id);
        })
      }

      // 请求收货地址
      const _getAddressDetail = (id) => {
        getAddressDetail(id).then(result => {
          state.address = result.access_addrs;
          var phone = result.access_addrs.phone

          state.address.phone = getTel(phone + "");
        })
      }

      // 支付网络请求
      const _getPayCode = (order_id, type) => {
        // getPayCode(order_id, type).then(result => {
        //   if (type == 'aliyun') {
        //     state.payment.alipay = result.qr_code_url;
        //   } else if (type == 'wechat') {
        //     state.payment.wechat = result.qr_code_url;
        //   }
          state.payment.order_id = order_id;
          state.payment.show = true;
          // 轮询查看支付是否完成
          // _getPayStatus(order_id);
        // })
      }

      // 轮询查看支付状态
      // const _getPayStatus = (order_id) => {
      //   const timer = setInterval(() => {
      //     getPayStatus(order_id).then(result => {
      //       // 支付完成，跳转到订单详情页面
      //       if (result != 1) {
      //         // 清除轮询
      //         clearInterval(timer);
      //         // 重新加载页面数据
      //         init();
      //       }
      //     })
      //   }, 2000);
      //   // 4秒之后关闭轮询
      //   setTimeout(() => {
      //     clearInterval(timer);
      //   }, 4000);
      // }

      // 挂载
      onMounted(() => {
        init();
      })

      const blanceOnClick = () => {
        var arr = []
        var n = state.order.num
       
        for (var i in state.goods) {
          arr.push(parseInt(state.goods[i].price * n * 100));
        }

        var arr1 = [];
        arr1.push(parseInt(state.order.order_no))

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

      // 去支付
      const goPayOnClick = () => {
        state.bottom.loading = true;
        // _getPayCode(state.order_id, 'aliyun');
         _getPayCode(state.order_id, 'balance');
        
        setTimeout(() => {
           state.bottom.loading = false;
        }, 2000);
        // _getPayCode(state.order_id, 'wechat');
      }
      // 关闭支付窗口
      const paymentOnClose = () => {
        init();
      }

      return {
        ...toRefs(state),
        goPayOnClick,
        paymentOnClose,
        blanceOnClick
      }
    }
  }
</script>

<style scoped lang="scss">
  .detail {
    background: #eeeeee;
    height: 100vh;
    margin-top: var(--van-nav-bar-height);
  }
</style>