# mall

化妆品商城实现的前端<br>
大部分代码来源来自以下，非常感谢这位大佬
```
https://github.com/Exiejiebing/Vue3-cli4-demoShop
```

后端使用GO语言实现，地址如下
```
https://github.com/lemon997/lemonMall
```

项目案例已经上线，地址如下
```
http://120.79.132.3
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 目录结构
```
── babel.config.js
├── LICENSE
├── package.json
├── package-lock.json
├── public
│   ├── favicon.ico
│   └── index.html
├── README.md
├── src
│   ├── App.vue
│   ├── assets
│   │   ├── css
│   │   │   ├── base.css
│   │   │   ├── font
│   │   │   │   ├── iconfont.css
│   │   │   │   ├── iconfont.js
│   │   │   │   ├── iconfont.json
│   │   │   │   └── iconfont.ttf
│   │   │   └── normalize.css
│   │   └── images
│   │       ├── cart.png
│   │       ├── comment
│   │       │   ├── 1.jpg
│   │       │   ├── 2.jpg
│   │       │   ├── 3.jpg
│   │       │   ├── 4.jpg
│   │       │   └── 5.jpg
│   │       ├── lazyload.png
│   │       └── user.png
│   ├── common
│   │   ├── area.js
│   │   └── utils.js
│   ├── components
│   │   ├── common
│   │   │   ├── backTop
│   │   │   │   └── BackTop.vue
│   │   │   ├── scroll
│   │   │   │   └── Scroll.vue
│   │   │   └── swiper
│   │   │       └── Swiper.vue
│   │   └── content
│   │       ├── goods
│   │       │   └── GoodsListItem.vue
│   │       ├── navBar
│   │       │   └── NavBar.vue
│   │       ├── payment
│   │       │   └── Payment.vue
│   │       ├── tabBar
│   │       │   └── TabBar.vue
│   │       └── tabcontrol
│   │           └── TabControl.vue
│   ├── main.js
│   ├── network
│   │   ├── address.js
│   │   ├── auth.js
│   │   ├── cart.js
│   │   ├── category.js
│   │   ├── collect.js
│   │   ├── goods.js
│   │   ├── home.js
│   │   ├── order.js
│   │   ├── profile.js
│   │   └── request.js
│   ├── router
│   │   └── index.js
│   ├── store
│   │   └── index.js
│   └── views
│       ├── address
│       │   ├── Address.vue
│       │   └── childComp
│       │       ├── AddressList.vue
│       │       └── AddressMotify.vue
│       ├── auth
│       │   ├── Login.vue
│       │   └── Register.vue
│       ├── cart
│       │   ├── Cart.vue
│       │   └── childComp
│       │       ├── CartBottom.vue
│       │       ├── CartEmpty.vue
│       │       └── CartList.vue
│       ├── category
│       │   ├── Category.vue
│       │   └── childComp
│       │       ├── CatGoodsListItem.vue
│       │       └── CatLeftMenu.vue
│       ├── collect
│       │   ├── childComp
│       │   │   └── CollectList.vue
│       │   └── Collect.vue
│       ├── goods
│       │   ├── childComp
│       │   │   ├── DetailBottomBar.vue
│       │   │   ├── DetailComment.vue
│       │   │   ├── DetailInfo.vue
│       │   │   └── DetailTabBar.vue
│       │   └── Detail.vue
│       ├── home
│       │   ├── childComp
│       │   │   └── HomeRecommend.vue
│       │   └── Home.vue
│       ├── order
│       │   ├── childComp
│       │   │   ├── detail
│       │   │   │   ├── OrderDetailAddress.vue
│       │   │   │   ├── OrderDetailBottom.vue
│       │   │   │   ├── OrderDetailGoods.vue
│       │   │   │   └── OrderDetailInfo.vue
│       │   │   └── order
│       │   │       └── OrderList.vue
│       │   ├── OrderDetail.vue
│       │   └── Order.vue
│       ├── profile
│       │   ├── childComp
│       │   │   ├── ProfileInfo.vue
│       │   │   ├── ProfileLogout.vue
│       │   │   ├── ProfileOrder.vue
│       │   │   └── ProfileSetting.vue
│       │   └── Profile.vue
│       ├── setting
│       │   ├── childComp
│       │   │   ├── SettingInfo.vue
│       │   │   ├── SettingName.vue
│       │   │   └── SettingPassword.vue
│       │   └── Setting.vue
│       └── settlement
│           ├── childComp
│           │   ├── SettlementConsignee.vue
│           │   ├── SettlementGoods.vue
│           │   └── SettlementPay.vue
│           └── Settlement.vue
└── vue.config.js

```

