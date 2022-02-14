import request from './request';

// 地区数据
export function getAreaList(pid = 0) {
  return request({
    // url: '/api/city',
    params: {
      pid,
    }
  })
}

// 地址列表
export function getAddressList() {
  return request({
    url: '/api/v1/user/getalladdress'
  })
}

// 地址详情
export function getAddressDetail(address) {
  return request({
    url: `/api/v1/user/getaddressdetail/${address}`
  })
}

// 新增地址
export function addAddress(data) {
  return request({
    url: '/api/v1/user/addaddress',
    method: 'post',
    headers: { 'content-type': 'application/json' },
    data
  })
}

// 更新地址
export function motifyAddress(address, data) {
  return request({
    url: `/api/v1/user/addressmodify/${address}`,
    method: 'put',
    headers: { 'content-type': 'application/json' },
    data,
  })
}

// 删除地址
export function delAddress(data) {
  return request({
    url: `/api/v1/user/deladdress/${data}`,
    method: 'delete',
  })
}

// 设置默认地址
export function setDefaultAddress(address) {
  return request({
    url: `/api/v1/user/addressdefault/${address}`,
    method: 'patch',
  })
}