<template>
  <div id="detail">
    <!-- 导航栏 -->
    <nav-bar title="lemonMall" :isShowLeft="true"></nav-bar>
    <div v-if="Object.keys(goods).length">
      <!-- 封面图 -->
      <!-- <img v-lazy="goods.img_url" /> -->
      <!-- <van-swipe class="my-swipe" :indicator-color="white">
      <van-swipe-item>goods.img_url</van-swipe-item>
      </van-swipe> -->
      <swiper class="swiper" :list="goods.pics_url"></swiper>
      <!-- 商品信息 -->
      <detail-info :info="goods"></detail-info>
      <!-- 商品明细 -->
      <detail-tab-bar
        :title="title"
        :goods="goods"
        :recommends="recommends"
      ></detail-tab-bar>
      <!-- 底部导航栏 -->
      <detail-bottom-bar
        :info="bottom"
        @collectOnClick="collectOnClick"
      ></detail-bottom-bar>
    </div>
    <!-- 回到顶部 -->
    <back-top />
  </div>
</template>

<script>
import { onMounted, reactive, ref, toRefs } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
import { getGoodsDetail } from "network/goods";
import { setCollectStatus, checkCollectStatus } from "network/collect";
// childComp
import DetailInfo from "./childComp/DetailInfo";
import DetailTabBar from "./childComp/DetailTabBar";
import DetailBottomBar from "./childComp/DetailBottomBar";
// components
import Swiper from "components/common/swiper/Swiper";
import BackTop from "components/common/backTop/BackTop";
import NavBar from "components/content/navBar/NavBar";

export default {
  name: "Detail",
  components: {
    // childComp
    DetailInfo,
    DetailTabBar,
    DetailBottomBar,
    // components
    Swiper,
    BackTop,
    NavBar,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    // 当前id
    const currentId = ref(0);
    // 数据模型
    let state = reactive({
      goods: {},
      recommends: [],
      bottom: {
        id: 0,
        is_collect: 0,
      },
    });
    // 标签栏
    const title = ref([]);
    title.value = ["概述", "评论", "相关推荐"];

    // 初始化网络请求数据
    const init = () => {
      getGoodsDetail(currentId.value).then((result) => {
        state.goods = result.goods;
        // 判断商品是否为多图，如果不是则把封面图赋值
        // if (!result.goods.pics_url.length) {
        //   state.goods.pics_url.push({'img_url': result.goods.img_url});
        // }
        var tmpUrl = new Array();
        tmpUrl.push(result.goods.img_url);
        state.goods.pics_url = tmpUrl;

        //以下是推荐
        // state.recommends.push(...result.goods);
        // console.log(result.goods)
        // 底部信息
        state.bottom.id = result.goods.product_id;
        // 滚动条到达顶部
        document.documentElement.scrollTop = 0;
      });
      checkCollectStatus(currentId.value).then((result) => {
        //查看是否已经收藏
        state.bottom.is_collect = result.is_collect;
      });
    };

    // 挂载
    onMounted(() => {
      // 路由id赋值给当前id
      
      currentId.value = route.query.id;
      init();
    });

    // 组件内导航守卫：当路由的id发生变化时，更新页面的数据
    onBeforeRouteUpdate(async (to, from) => {
      if (to.query.id != from.query.id) {
        // 路由id赋值给当前id
        console.log("to的路由id", to.query.id);
        currentId.value = to.query.id;
        init();
      }
    });

    // 加入/取消收藏
    const collectOnClick = (id) => {
      
      if (store.state.user.isLogin) {
        setCollectStatus(id).then((result) => {
          Toast({ message: "操作成功" });
          init();
        });
      }
    };

    return {
      ...toRefs(state),
      title,
      collectOnClick,
    };
  },
};
</script>

<style scoped lang="scss">
#detail {
  background: #f5efef;
  height: 100%;
}
.swiper {
  margin-top: var(--van-nav-bar-height);
}
img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>