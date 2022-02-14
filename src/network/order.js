import request from './request';

// 订单预览
export function getSettlementData (data) {
  return request({
    url: `/api/v1/user/order/preview`,
    headers: { 'content-type': 'application/json' },
    method:'post',
    data
  })
}

// 提交订单
export function submitOrder (data) {
  return request({
    url: '/api/v1/user/order/buy',
    headers: { 'content-type': 'application/json' },
    method: 'post',
    data
  })
}

// 获取支付二维码
// export function getPayCode (order, type) { 
//   return request({
//     url: `/api/orders/${order}/pay`,
//     params: {
//       type,
//     }
//   })
// }

export function balancePay (data){
  return request({
    url: `/api/v1/user/order/payment`,
    headers: { 'content-type': 'application/json' },
    method: 'post',
    data
  })
}

// 查询支付状态
// export function getPayStatus (order) {
//   return request({
//     url: `/api/orders/${order}/status`
//   })
// }

// 订单列表
export function getOrderList (status, page) {
  return request({
    url: '/api/v1/user/orderlist',
    params: {
      status,
      page
    }
  })
}

// 订单详情
export function orderDetail (order) {
  return request({
    url: `/api/v1/user/orderdetail/${order}`,
  })
}