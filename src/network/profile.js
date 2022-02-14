import request from './request';
// 修改用户昵称
export function motifyUserName(name) {
  return request({
    url: '/api/user',
    method: 'put',
    data: {
      name,
    }
  })
}

// 用户信息
export function getUserName() {
  return request({
    url: '/api/v1/user/name',
    method: 'get',
  })
}

// 修改用户头像
export function motifyUserAvatar(data) {

  return request({
    url: '/api/v1/uploading/file',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data; boundary= ' },
    data,
  })
}

// 修改密码
export function modifyPassword(data) {
  return request({
    url: '/api/auth/password/update',
    method: 'post',
    data
  })
}