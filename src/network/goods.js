import request from './request';

//  商品详情
export function getGoodsDetail (good) {
  return request({
    url: `/api/v1/getgoodsdetail/${good}`
  })
}