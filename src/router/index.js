import Vue from 'vue'
import Router from 'vue-router'
import HomeContainer from '@/components/tabbar/HomeContainer'
import ShopcarContainer from '@/components/tabbar/ShopcarContainer'
import NewsList from '@/components/news/NewsList.vue'
import NewsInfo from '@/components/news/NewsInfo.vue'
import PhotoList from '@/components/photos/PhotoList.vue'
import PhotoInfo from '@/components/photos/Photoinfo.vue'
import BrandList from '@/components/brand/BrandList.vue'
import GoodsList from '@/components/goods/GoodsList.vue'
import GoodsInfo from '@/components/goods/GoodsInfo.vue'
import GoodsComment from '@/components/goods/GoodsComment.vue'
Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContainer },
        { path: '/cart', component: ShopcarContainer, name: 'cart' },
        { path: '/home/newslist', component: NewsList },
        { path: '/home/newsinfo/:id', component: NewsInfo },
        { path: '/home/photolist', component: PhotoList },
        { path: '/home/photoinfo/:id', component: PhotoInfo },
        { path: '/home/brandlist', component: BrandList },
        { path: '/home/goodslist', component: GoodsList },
        { path: '/goodsinfo/:id', component: GoodsInfo },
        { path: '/goodscomment/:id', component: GoodsComment, name: 'goodscomment' }
    ]
})