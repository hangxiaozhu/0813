<template>
  <div id="app">
    <van-nav-bar
  title="模板"
  :left-arrow='flag'
  fixed
  @click-left="onClickLeft"
>
 <van-icon name="wap-home" slot="right" v-if="flag" @click="goHome"/>
</van-nav-bar>
    <router-view/>
  <van-tabbar v-model="active">
  <van-tabbar-item  to="/home" icon="wap-home">首页</van-tabbar-item>
  <van-tabbar-item to="/search" icon="search" >搜索</van-tabbar-item>
  <van-tabbar-item to="/cart" icon="cart-o" :info="$store.getters.getAllCount">购物车</van-tabbar-item>
  <van-tabbar-item to="/setting" icon="setting-o" >设置</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
import Vue from 'vue';
import { Icon } from 'vant';
Vue.use(Icon);
export default {
  name: 'App',
  data(){
      return {
      active: 0,
      flag:false
    }
  },
  created(){
    this.flag = this.$route.path === '/home' ?false : true
  },
  methods:{
    onClickLeft(){
      this.$router.go(-1)
    },
    goHome(){
      this.$router.push('/home')
    }

  },
  watch:{
    '$route.path':function(newVal){
      if (newVal === '/home') {
        this.flag=false
      } else {
        this.flag=true
      }
    }
    
  }
}
</script>

<style>
.van-nav-bar .van-icon{color: #FF0000;}
#app{padding-top: 46px;padding-bottom:50px; }
</style>
