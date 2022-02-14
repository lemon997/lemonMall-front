import request from './request';
// import qs from 'qs'

// 注册
export function register(data) {
    return request({
        url: '/api/v1/register',
        method: 'post',
        headers: { 'content-type': 'application/json' },
        data
    })
}

// 登录
export function login(data) {
    return request({
        url: '/api/v1/login',
        method: 'post',
        headers: { 'content-type': 'application/json' },
        data
    })
}

// 退出登录
export function logout() {
    return request({
        url: '/api/v1/user/logout',
        method: 'post'
    })
}