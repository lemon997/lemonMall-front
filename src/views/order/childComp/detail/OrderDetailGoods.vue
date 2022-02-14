<template>
  <div class="goods" v-if="goods">
    <van-card v-for="item in goods.goods" :key="item.id"
      :num="goods.num"
      :price="item.price"
      :title="item.product_name"
      :thumb="item.img_url"
      lazy-load></van-card>
  </div>
</template>

<script>
  export default {
    name: 'OrderDetailGoods',
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .goods {
    background: #FFFFFF;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 10px;
  }
</style>