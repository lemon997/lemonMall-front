module.exports = {
  publicPath:"./",
  outputDir:"dist",
  assetsDir:"assets",
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network',
        'sotre': '@/store',
        'router': '@/router'
      }
    }
  },
  devServer: {
    // host: '127.0.0.1',
    // port: '8080',
    https: false,
    // open: true,
    proxy: {
      '/api': { //匹配所有以'/api'开头的请求路径
        target: process.env.VUE_APP_BASEURL,//代理目标的基础路径
        changeOrigin: true,//支持跨域
        pathRewrite: {//重写路径：去掉路径中开头的'/api'
          '^/api': '',
        }
      }
    }
  }
}