<template>
  <van-card v-for="item in list" 
    :key="item.product_id"
    :num="item.collects_count"
    :price="item.price"
    desc=""
    :title="item.product_name"
    :thumb="item.img_url" 
    lazy-load
    @click="onClick(item.product_id)" />
</template>

<script>
  import { useRouter } from 'vue-router';
  export default {
    name: 'CatGoodsListItem',
    props: {
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    setup() {
      const router = useRouter();
      const onClick = (id) => {
        router.push({
          path: '/goodsDetail',
          query: {
            id
          }
        })
      }

      return {
        onClick
      }
    }
  }
</script>

<style scoped lang="scss">

</style>