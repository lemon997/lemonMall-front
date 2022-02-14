<template>
  <div id="profile" v-if="Object.keys(user).length">
    <!-- <div id="profile"> -->
    <!-- 用户信息 -->
    <profile-info></profile-info>
    <!-- 订单管理 -->
    <profile-order></profile-order>
    <!-- 个人信息 -->
    <profile-setting></profile-setting>
    <!-- 退出登录 -->
    <profile-logout @logoutOnClick="logoutOnClick"></profile-logout>
    <!-- <profile-logout></profile-logout> -->
  </div>
</template>

<script>
import { onActivated, onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";

import { getUserName } from "network/profile";
import { logout } from "network/auth";

import ProfileInfo from "./childComp/ProfileInfo";
import ProfileSetting from "./childComp/ProfileSetting";
import ProfileLogout from "./childComp/ProfileLogout";
import ProfileOrder from "./childComp/ProfileOrder";

export default {
  name: "Profile",
  components: {
    ProfileInfo,
    ProfileSetting,
    ProfileLogout,
    ProfileOrder,
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const state = reactive({
      user: {},
      scrollTop: 0,
    });

    // 初始化网络请求数据
    const init = () => {
      Toast.loading({ forbidClick: true, loadingType: "spinner" });
      getUserName().then((result) => {
        state.user = result.data;
        Toast.clear();
      });
    };

    // 挂载
    onMounted(() => {
      init();
    });

    // 激活组件
    onActivated(() => {
      if (store.state.user.name && state.user.name != store.state.user.name) {
        init();
      }
    });

    // 退出登录
    const logoutOnClick = () => {
      Toast.loading({ forbidClick: true, loadingType: "spinner" });
      logout().then((result) => {
        // console.log(result);
        // 清除储存在本地的token
        window.localStorage.setItem("token", "");
        // 清除储存在vuex中的状态
        store.commit("setLogin", false);
        // 直接跳转到登录页面
        router.push({
          path: "/login",
        });
      });
    };

    return {
      ...toRefs(state),
      logoutOnClick,
    };
  },
};
</script>
<style scoped lang="scss">
#profile {
  background: #eeeeee;
  height: 100vh;
}
</style>l
