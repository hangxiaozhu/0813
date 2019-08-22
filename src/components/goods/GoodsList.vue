<template>
  <div class="hello">
    <router-link v-for="item in list" :key="item.id" :to="'/goodsinfo/'+item.id">
  <van-card
   
   
  :num="item.stock_quantity"
  tag="热销"
  :price="item.sell_price"
  :desc="item.zhaiyao"  
  :title="item.title"
  :thumb="item.img_url"
  :origin-price="item.market_price"
/>
</router-link>
<van-button type="info" @click='getMore'>加载更多</van-button>
  </div>


</template>

<script>
import Vue from 'vue';
import { Card } from 'vant';
Vue.use(Card);
import { Toast } from 'vant';
Vue.use(Toast);
import { Button } from 'vant';
Vue.use(Button);

export default {
   data() {
    return {
        pageindex:1,
      list: [],
    };
  },
 created() {
    this.getproList();
  },
  methods: {
       getproList() {
      // 获取新闻列表
      this.$http.get("api/getgoods?pageindex="+ this.pageindex).then(result => {
        if (result.body.status === 0) {
          // 如果没有失败，应该把数据保存到 data 上
          this.list =this.list.concat(result.body.message) ;
        // console.log(this.list);
        } else {
          Toast("获取商品列表失败！");
        }
      });
    },
    getMore() {
      this.pageindex++;
      this.getproList();
    },
   
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-button{width: 50%;margin: 10px 24%;}
</style>
