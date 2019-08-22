<template>
  <div>
    <van-panel :title="newsinfo.title" >
        <p class="subtitle">
      <span>发表时间：{{newsinfo.add_time | dateFormate}}</span>
      <span style="float:right;">点击：{{newsinfo.click}}次</span>
    </p>
  <div v-html="newsinfo.content"></div>
</van-panel>

<combox :id="this.id"> </combox>  

  </div>
</template>

<script>
import combox from '../subcomponents/coments.vue'
import Vue from 'vue';
import { Panel } from 'vant';
Vue.use(Panel);
import { Toast } from 'vant';
Vue.use(Toast);

export default {
 data(){
     return{
         id:this.$route.params.id,
         newsinfo:{}
     }
 },
 created(){
     this.getNewsInfo();
 },
 methods:{
     getNewsInfo(){
         this.$http.get("api/getnew/"+this.id).then(result=>{
             if (result.body.status == 0) {
                 this.newsinfo =result.body.message[0];
                //  console.log(result.body.message);
             } else {
                 Toast("获取新闻失败！");
             }
         })
     }
 },components:{
   combox:combox
 }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-panel{padding: 0 5px;}

</style>
