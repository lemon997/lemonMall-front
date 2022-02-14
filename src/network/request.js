import axios from 'axios';
import { Notify, Toast } from 'vant';
import router from '../router';

export default function request(config) {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    timeout: 5000
  })

  // 请求拦截
  instance.interceptors.request.use(config => {
    // 统一设置需要认证后才能访问页面
    const token = window.localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  })

  //  响应拦截
  instance.interceptors.response.use(result => {
    return result.data ? result.data : result;
  }, error => {
    // 设置需要页面是否需要登录认证
    // console.log('error.res',error.response.status)
    if (error.response.status == 401) {
      // window.localStorage.removeItem('token')
      // // 重新跳转到login页面
      // router.push('/login')
      // window.localStorage.setItem("token", "");//清空过期token
      Toast.fail("请先登录");
      router.push({
        path: '/login'
      })
      // 跳转到登录页面
      // setTimeout(() => {
      //   router.push({
      //     path: '/login'
      //   })
      // }, 500);
    }
    // 拦截错误信息
    Notify(error.response.data.errors[Object.keys(error.response.data.errors)[0]][0]);
  })

  return instance(config);
}