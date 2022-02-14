<template>
  <div class="list" v-for="item in list" :key="item.id" @click="onClick(item.order_no)">
    <div class="list-top">
      <span><strong>{{item.order_no}}</strong></span>
      <span>{{item.order_status}}</span>
    </div>
    <!-- <div class="list-center" v-for="it in item.goods" :key="it.id"> -->
    <div class="list-center">
      <div class="center-img">
        <img v-lazy="item.goods.img_url"/>
      </div>
      <div class="center-title">
        <strong>{{item.goods.product_name}}</strong>
      </div>
      <div class="center-price">
        <p><small>￥</small>{{item.goods.price}}</p>
        <p><small>×</small>{{item.num}}</p>
      </div>
    </div>
    <div class="list-bottom">
      
      <strong>实付款：<small>￥</small>{{parseFloat(item.amount/100).toFixed(2)}}</strong>
    </div>
  </div>
</template>

<script>
  import { reactive, toRefs } from 'vue';

  export default {
    name: 'OrderList',
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    emits: [
      'detailOnClick'
    ],
    setup(props, { emit }) {
      const onClick = (id) => {
        emit('detailOnClick', id);
      }
      return {
        onClick
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list {
    border-radius: 10px;
    background: #FFFFFF;
    padding: 10px;
    margin: 10px 0;
    font-size: 12px;
    .list-top {
      display: flex;
      justify-content: space-between;
      color: #000000;
      font-size: 12px;
      margin-bottom: 10px;
    }
    .list-center {
      display: flex;
      justify-content: space-between;
      .center-img {
        width: 30%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
      .center-title {
        flex-grow: 2;
        margin-top: 10px;
        color: #000000;
      }
      .center-price {
        margin-top: 10px;
        text-align: right;
        p {
          padding-bottom: 5px;
        }
      }
    }
    .list-bottom {
      margin-top: 10px;
      text-align: right;
      color: #000000;
    }
  }
</style>