import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main.vue'
import Cart from '@/components/Cart.vue'
import Member from '@/components/Member.vue'
import Search from '@/components/Search.vue'
import NewsList from '@/components/news/NewsList.vue'
import NewsInfo from '@/components/news/NewsInfo.vue'
import PhotosList from '@/components/photos/PhotosList.vue'
import Photoinfo from '@/components/photos/Photoinfo.vue'
import GoodsList from '@/components/goods/GoodsList.vue'
import GoodsInfo from '@/components/goods/GoodsInfo.vue'
import GoodsDesc from '@/components/goods/GoodsDesc.vue'
import GoodsComment from '@/components/goods/GoodsComment.vue'
import AboutMe from '@/components/about/AboutMe.vue'
Vue.use(Router)

export default new Router({
  routes: [
    { path: "/",  redirect: '/main' },
    { path: "/main", component: Main },
    { path: "/cart", component: Cart },
    { path: "/member", component: Member },
    { path: "/search", component: Search },
    { path: "/main/newslist", component: NewsList },
    { path: "/main/newinfo/:id", component: NewsInfo },
    { path: "/main/photoslist", component: PhotosList },
    { path: "/main/photoinfo/:id", component: Photoinfo },
    { path: "/main/goodslist", component: GoodsList },
    { path: "/main/goodsinfo/:goodsId", component: GoodsInfo, name: "goodsinfo" },
    { path: "/main/goodsdesc/:goodsId", component: GoodsDesc, name: "goodsdesc" },
    { path: "/main/goodscommnet/:goodsId", component: GoodsComment, name: "goodscommnet" },
    { path: "/main/aboutme", component: AboutMe, name: "aboutme" }
  ],
  linkActiveClass: 'mui-active'
})
