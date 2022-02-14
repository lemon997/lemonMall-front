<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar title="lemonMall"></nav-bar>
    <div>
      <!-- <div v-if="showGoodsList.length"> -->
      <!-- 轮播图 -->
      <swiper class="swiper" :list="banners"></swiper>
      <!-- 推荐商品 -->
      <home-recommend :goods="recommends"></home-recommend>
      <!-- <home-recommend></home-recommend> -->
      <!-- 标签栏 -->
      <tab-bar :title="title" @onClick="tabClick"></tab-bar>
      <!-- 商品展示 -->
      <van-list
        class="list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="offset"
        :immediate-check="false"
        @load="onLoad"
      >
        <!-- 商品内容 -->
        <goods-list-item
          :list="showGoodsList"
          @collectOnClick="collectOnClick"
        ></goods-list-item>
      </van-list>
    </div>
    <!-- 回到顶部 -->
    <back-top />
  </div>
</template>

<script>
import {
  reactive,
  toRefs,
  computed,
  onMounted,
  onActivated,
  onDeactivated,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
import {
  getHomeAllData,
  getTabGoodsData,
  getHomeRecommendData,
} from "network/home";
import { setCollectStatus } from "network/collect";

import HomeRecommend from "./childComp/HomeRecommend";
// components
import Swiper from "components/common/swiper/Swiper";
import BackTop from "components/common/backTop/BackTop";
import TabBar from "components/content/tabBar/TabBar";
import GoodsListItem from "components/content/goods/GoodsListItem";
import NavBar from "components/content/navBar/NavBar";

export default {
  name: "Home",
  components: {
    // childComp
    HomeRecommend,
    // components
    Swiper,
    BackTop,
    TabBar,
    GoodsListItem,
    NavBar,
  },
  setup() {
    const route = useRoute();
    const store = useStore();

    const state = reactive({
      banners: [],
      recommends: [],
      scrollTop: 0,
      //标题
      title: {
        sales: "热销",
        recommend: "推荐",
        new: "新款",
      },
      //商品数据模型
      goods: {
        sales: { page: 0, list: [] },
        recommend: { page: 0, list: [] },
        new: { page: 0, list: [] },
      },

      // 当前标签类型
      currentType: "sales",
      // list绑定参数
      loading: false,
      finished: false,
      offset: 0,
    });

    // 当前商品信息
    let showGoodsList = computed(() => {
      return state.goods[state.currentType].list;
    });

    const init = () => {
      Toast.loading({
        message: "加载中",
        forbidClick: true,
        loadingType: "spinner",
      });
      getHomeAllData().then((result) => {
        // console.log(result.access_imgs_url)
        state.banners = result.access_imgs_url;
        Toast.clear();
      });
      getHomeRecommendData().then((result) => {
        // console.log(result.access_imgs_url)
        state.recommends = result.access_imgs_url;
        Toast.clear();
      });
      _getTabGoodsData("sales");
      _getTabGoodsData("recommend");
      _getTabGoodsData("new");
    };
    //初始化标签栏内容
    const _getTabGoodsData = (type, load = false) => {
      if (load) {
        // 设置加载完成，阻止load事件一直加载
        state.finished = true;
      }
      let page = state.goods[type].page + 1;
      getTabGoodsData(type, page).then((result) => {
        // console.log("data", result.tab);
        state.goods[type].list.push(...result.tab);
        state.goods[type].page += 1;
        if (load) {
          // 设置为非加载中
          state.loading = false;
          // 如果网络请求的数据为空，则设置加载完成
          if (result.tab.length) {
            state.finished = false;
          } else {
            Toast("没有更多数据");
            state.finished = true;
          }
        }
      });
    };
    // 挂载
    onMounted(() => {
      init();
    });

    // 激活组件
    onActivated(() => {
      // 设置滚动高度
      document.documentElement.scrollTop = document.body.scrollTop =
        state.scrollTop;
    });

    // 销毁组件
    onDeactivated(() => {
      // 保存滚动高度
      state.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    });

    // 切换标签栏
    const tabClick = (name) => {
      state.currentType = name;
      if (state.goods[name].page >= 1) {
        // 清空列表
        state.finished = true;
        // 滚动条设置滚动到顶部
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        setTimeout(() => {
          // 2秒之后设置可以重新滚动
          state.finished = false;
        }, 2000);
      }
    };

    // 加载更多事件
    const onLoad = () => {
      _getTabGoodsData(state.currentType, true);
    };

    // 加入/取消
    const collectOnClick = (id) => {
      // 登录才可以收藏
      if (store.state.user.isLogin) {
        setCollectStatus(id).then((result) => {
          init();
        });
      }
    };

    return {
      ...toRefs(state),
      showGoodsList,
      tabClick,
      onLoad,
      collectOnClick,
    };
  },
};
</script>

<style scoped lang="scss">
.swiper {
  margin-top: var(--van-nav-bar-height);
}
.list {
  background: #f5efef;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>