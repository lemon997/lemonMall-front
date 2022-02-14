<template>
  <router-view v-slot="{ Component }">
    <transition name="component-fade" mode="out-in">
      <div>
        <keep-alive :include="$store.state.keepAliveList">
          <component :is="Component"></component>
        </keep-alive>
      </div>
    </transition>
  </router-view>
  <tab-control v-if="$route.meta.isShowFooter"></tab-control>
</template>

<script>
// components
import TabControl from "components/content/tabcontrol/TabControl";

export default {
  name: "App",
  components: {
    // components
    TabControl,
  },
};
</script>

<style>
@import "assets/css/base.css";
.van-nav-bar {
  background: var(--color-tint);
}
</style>
