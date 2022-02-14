import request from "./request";

// 购物车列表
export function getCartList () {
  return request({
    url: '/api/v1/user/carts',
    method: 'get',
    params: {
      include: 'goods'
    }
  })
}

// 加入购物车
export function addCart (data) {
  return request({
    url: '/api/v1/user/carts',
    method: 'post',
    headers: { 'content-type': 'application/json' },
    data
  })
}

// 购物车数量改变
export function motifyNumCart (id, data) {
  // id是商品id
  return request({
    url: `/api/v1/user/carts/${id}`,
    method: 'put',
    headers: { 'content-type': 'application/json' },
    data
  })
}

// 改变选择状态
export function changeCheckedStatus (data) {
  return request({
    url: '/api/v1/user/carts/checked',
    method: 'post',
    headers: { 'content-type': 'application/json' },
    data
  })
}

// 删除购物车
export function delCart (cart) {
  return request({
    url: `/api/v1/user/carts/${cart}`,
    method: 'delete'
  })
}