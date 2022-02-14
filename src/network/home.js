import request from "./request";

// 首页全部数据
//轮播图请求
export function getHomeAllData() {
  return request({
    url: '/api/v1/swipe'
  })
}

export function getHomeRecommendData() {
  return request({
    url: '/api/v1/recommend'
  })
}

// 首页标签栏数据（热销、推荐、新款）
export function getTabGoodsData(type, page) {
  return request({
    url: `/api/v1/gettabgoodsdata/${page}`,
    // url: `/api/index?${type}=1`,
    // params: {
    //   page
    // }
  })

}