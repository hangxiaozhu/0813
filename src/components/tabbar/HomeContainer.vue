<template>
  <div>
<swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
      
<br>
<van-grid clickable :column-num="4" :gutter="15">
  <van-grid-item
    icon="new-o"
    text="资讯"
    to="/home/newslist"
  />
  <van-grid-item
    icon="photo-o"
    text="图库"
    to="/home/photolist"
  />
  <van-grid-item
    icon="shop-o"
    text="商城"
    to="/home/goodslist"
  />
  <van-grid-item
    icon="diamond-o"
    text="品牌"
    to="/home/brandlist"
  />
 
</van-grid>
    
  </div>
</template>

<script>
import Vue from 'vue';
import { Grid, GridItem } from 'vant';
Vue.use(Grid).use(GridItem);
import { Toast } from 'vant';
Vue.use(Toast);
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);
import swiper from '../subcomponents/swiper'
export default {
  data () {
    return {
     lunbotuList:[]
    }
  },
  created(){
      this.getLunbotu();
  },
  methods:{
      getLunbotu(){
         // 获取轮播图数据的方法
      this.$http.get("api/getlunbo").then(result => {
        // console.log(result.body);
        if (result.body.status === 0) {
          // 成功了
          this.lunbotuList = result.body.message;
        //   console.log(this.lunbotuList)
        } else {
          // 失败的
          Toast("加载轮播图失败。。。");
        }
      }); 
          
      }

  },components:{swiper}
}
</script>

<style scoped>

</style>