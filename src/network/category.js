import request from './request';

// 商品所有分类
export function getCategoryData () {
  return request({
    url: `/api/v1/category`
  })
}

//  商品数据
export function getGoodsData (type, page = 1, category_children_id) {
  return request({
    url: `/api/v1/getgooddate`,
    params: {
      type,
      category_children_id,
      // title,
      page
    }
  })

}