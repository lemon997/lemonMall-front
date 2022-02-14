import request from './request';

// 加入/取消收藏
//取消收藏
export function cancelCollectStatus(goods) {
    return request({
        url: `/api/v1/user/collects/cancelgoods/${goods}`,
        method: 'patch',
    })
}
    //加入收藏
export function setCollectStatus(goods) {
    return request({
        url: `/api/v1/user/collects/setgoods/${goods}`,
        method: 'patch',
    })
}

export function checkCollectStatus(goods) {
    return request({
        url: `/api/v1/user/collects/checkgoods/${goods}`,
        method: 'get',
    })
}

// 收藏列表
export function getCollectList(page) {
    return request({
        url: '/api/v1/user/collects',
        params: {
            page
        }
    })
}