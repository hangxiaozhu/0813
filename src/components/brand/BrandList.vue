<template>
  <div>

    <van-cell-group>
  <van-field
     v-model="name"
    label="品牌："
    left-icon="diamond-o"
  />
  <van-button type="info" @click="add()">添加</van-button>
</van-cell-group>

<van-search placeholder="请输入搜索关键词" v-model="keywords" />

    <van-row style="background:rgba(0,0,0,.5)">
      <van-col span="2"></van-col>
  <van-col style="color:#FFF;" span="8">品牌名</van-col>
  <van-col style="color:#FFF;" span="10">添加时间</van-col>
  <van-col style="color:#FFF;" span="4">删除</van-col>
    </van-row>
<van-row v-for="(item,index) in search(keywords)" :key="item.id">
  <van-col span="2">{{index}}</van-col>
  <van-col span="8">{{item.name}}</van-col>
  <van-col span="10">{{item.ctime | dateFormate}}</van-col>
  <van-col span="4"><van-button @click.prevent="del(item.id)" icon="close" type="default" /></van-col>
</van-row>

  </div>
</template>

<script>
import Vue from 'vue';
import { Row, Col } from 'vant';
Vue.use(Row).use(Col);
import { Button } from 'vant';
Vue.use(Button);
import { Field } from 'vant';
Vue.use(Field);
import { Toast } from 'vant';
Vue.use(Toast);
import { Search } from 'vant';

Vue.use(Search);
export default {
  data () {
    return {
     name:'',
     keywords:'',
     brandList:[]
    }
  },
  created(){
      this.getAllList();
     
  },
  methods:{
      getAllList(){
         // 获取轮播图数据的方法
      this.$http.get("api/getprodlist").then(result => {
        // console.log(result.body);
        if (result.body.status === 0) {
          // 成功了
          this.brandList = result.body.message;
          // console.log(this.brandList)
        } 
      }); 
          
      },
      add(){
        if (this.name.trim().length === 0) {
         Toast("内容不能为空！");
      }else{
        this.$http.post("api/addproduct",{name:this.name}).then(result => {
        // console.log(result.body);
        if (result.body.status === 0) {
          // 成功了
          this.getAllList();
          this.name = ''
          Toast("添加成功");
        } 
      }
      );

      }
        

      },
      del(id) { // 删除品牌
          this.$http.get('api/delproduct/' + id).then(result => {
            if (result.body.status === 0) {
              // 删除成功
              Toast("删除成功")
              this.getAllList()
            } else {
              Toast("删除失败")
            }
          })
        },
        search(keywords){
           return this.brandList.filter(item => {
            // if(item.name.indexOf(keywords) != -1)

            // 注意 ： ES6中，为字符串提供了一个新方法，叫做  String.prototype.includes('要包含的字符串')
            //  如果包含，则返回 true ，否则返回 false
            //  contain
            if (item.name.includes(keywords)) {
              return item
             
            }
            
          })
        }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-row{line-height: 50px;height: 50px; padding: 3px 2%;border-bottom: 1px solid #DDD;overflow: hidden;}
.van-field{border-bottom: 1px solid #DDD;}
.van-cell-group .van-button{width: 50%;margin: 20px 24%;}
.van-col{font-size: 12px;}
</style>
