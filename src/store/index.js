import { createStore } from 'vuex'
import { getCartList } from "network/cart";
import { motifyUserName } from "network/profile";

const state = {
  user: {
    name: '',
    isLogin: window.localStorage.getItem('token') ? true : false
  },
  cartCount: 0,
  isClickAddCart: false,
  settlementAddressId: false,
  keepAliveList: []
}

const mutations = {
  // 设置keep-alive组件
  setKeepAliveList(state, payload) {
    if (!state.keepAliveList.includes(payload)) {
      state.keepAliveList = state.keepAliveList.concat(payload)
    }
  },
  // 设置登录状态
  setLogin(state, payload) {
    state.user.isLogin = payload
  },
  // 设置用户昵称
  setName(state, payload) {
    state.user.name = payload;
  },
  // 设置购物车数量
  setCartCount(state, payload) {
    state.cartCount = payload;
  },
  // 设置是否点击加入购物车
  setIsClickAddCart(state, payload) {
    state.isClickAddCart = payload;
  },
  // 设置结算地址id
  setSettlementAddressId(state, payload) {
    state.settlementAddressId = payload;
  },
}

const actions = {
  // 更新购物车数量
  updateCartCount({ state, commit }) {
    // 登录之后才可以获取
    if (state.user.isLogin) {
      getCartList().then((result) => {
        const count = result.data.length || 0;
        commit('setCartCount', count);
      });
    }
  },
  // 更新昵称
  updataName({ commit }, payload) {
    return new Promise((resolve, reject) => {
      motifyUserName(payload).then(result => {
        commit('setName', payload);
        // 把结果返回
        resolve(result)
      })
    })
  }
}

const getters = {}

export default createStore({
  state,
  mutations,
  actions,
  getters,
})
