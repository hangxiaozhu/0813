<template>
  <div >
    <van-tabs @click="getPhotoListByCateId"  swipeable>
  <van-tab v-for="item in cates" :key='item.id' :name='item.id' :title="item.title"   >
   
<router-link class="rel" v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+ item.id">
  <img   v-lazy="item.img_url" >
    <p>{{item.title}}</p>
 </router-link>
  </van-tab>
</van-tabs>
  </div>
</template>

<script>
import Vue from 'vue';
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
import { Tab, Tabs } from 'vant';
import { Lazyload } from 'vant';
Vue.use(Tab).use(Tabs);
export default {
  data() {
    return {
      cates: [], // 所有分类的列表数组
      list: [] // 图片列表的数组
    };
  },
  created() {
    this.getAllCategory();
    // 默认进入页面，就主动请求 所有图片列表的数据
    this.getPhotoListByCateId(0);
  },
  mounted() {
  
  },
  methods: {
    getAllCategory() {
      // 获取所有的图片分类
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          // 手动拼接出一个最完整的 分类列表
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    getPhotoListByCateId(cateId) {
      // 根据 分类Id，获取图片列表
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          this.list = result.body.message;
          
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-tabs__content img{width: 100%;padding-top: 10px;}
.rel{position: relative;}
.rel p{text-indent: 30px; min-height: 50px; position: absolute;left: 0;bottom: 0;background-color: rgba(0, 0, 0, .6);color: #ffffff;margin: 0;width: 100%;}
</style>
