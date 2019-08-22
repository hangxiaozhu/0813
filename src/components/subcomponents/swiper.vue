<template>
  <div>
    <van-swipe :loop="true"  indicator-color="white">
  <van-swipe-item v-for='item in lunbotuList' :key="item.id"><img :src="item.img" :class="{'full': isfull}" alt=""></van-swipe-item>
</van-swipe>
    
  </div>
</template>

<script>
export default {
 props:['lunbotuList','isfull']
}
</script>

<style scoped>
.van-swipe{width: 100%; height: 200px;overflow: hidden;}
.van-swipe .van-swipe-item {width: 100%;height: 100%;}
.van-swipe .van-swipe-item img{height: 100%;}
.full{width: 100%;}
</style>