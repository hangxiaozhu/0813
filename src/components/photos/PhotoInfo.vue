<template>
  <div>
    <div style="padding:0 5%">
      <p style="font-size:17px;color:#FF0000;">{{imginfo.title}}</p>
  <p style="height:30px;">点击量：<span style="color:#ff0000">{{imginfo.click}}次</span> <span style="float:right;">{{imginfo.add_time | dateFormate}}</span></p>
   
   <div style="text-align:center;"><img v-for="(item,index) in thumimg" :src="item.src"  :key="item.src" alt="" @click="imgClick(index)"></div>
   
    <div style="padding: 10px 0; color:#666;" v-html='imginfo.content'></div>
    </div>

    <combox :id="this.id"> </combox> 
    
  </div>
</template>

<script>
import Vue from 'vue';
import { ImagePreview } from 'vant';

Vue.use(ImagePreview);
import combox from '../subcomponents/coments.vue'
export default {
  data () {
    return {
      id:this.$route.params.id,
     imginfo:{},
     thumimg:[],
     bigimg:[]
    }
  },
  created(){
    this.getImgs();
    this.getImginfo();
  },
  methods:{
    getImgs(){
      this.$http.get("api/getthumimages/" + this.id).then(result=>{
        if (result.body.status === 0) {
          // result.body.message.forEach(item => {
          //   item.w=600;
          //   item.h=400;
          // });
          this.thumimg = result.body.message
          console.log(this.thumimg);
            this.thumimg.forEach(item=>{
              this.bigimg.push(item.src)
            })
        } 
      })
    },
    getImginfo(){
      this.$http.get("api/getimageInfo/" + this.id).then(result=>{
        if (result.body.status === 0) {
          this.imginfo = result.body.message[0]
          // console.log(this.imginfo)
        } 
      })

    },
    imgClick(id){
      ImagePreview({
  images:this.bigimg,
  startPosition: id,
  onClose() {
    // do something
  }
});
    }
  },
  components:{
   combox:combox
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.van-image-preview__image{width: 100% !important;}
</style>
