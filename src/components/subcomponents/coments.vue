<template>
  <div class="comments">
      <h3>发布评论</h3>
      <hr> 
    <textarea placeholder="请输入要BB的内容（最多吐槽120字）" maxlength="120" v-model="msg"></textarea>
    <div class="flex-center"><van-button round type="info" @click="postComment">发布评论</van-button></div>
    
    <van-cell-group>
  <van-cell v-for="item in comments"
    :key="item.id"
    :title="item.user_name"
    :value=" item.add_time | dateFormate"
    :label="item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content"/>
</van-cell-group>
<div class="flex-center"><van-button type="info" @click="getMore">加载更多</van-button></div>

  </div>
</template>

<script>
import Vue from 'vue';
import { Cell, CellGroup } from 'vant';

Vue.use(Cell).use(CellGroup);
import { Button } from 'vant';

Vue.use(Button);
import { Toast } from 'vant';
Vue.use(Toast);
export default {
  data () {
    return {
        pageIndex:1,
      comments: [],
      msg:''
    }
  },
  created(){
      this.getComments();
  },
  methods:{
      getComments() {
      // 获取评论
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          if (result.body.status === 0) {
            // this.comments = result.body.message;
            // 每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据，拼接上新数据
            this.comments = this.comments.concat(result.body.message);
            // console.log(this.comments)
          } else {
            Toast("获取评论失败！");
          }
        });
    },
    getMore() {
      // 加载更多
      this.pageIndex++;
      this.getComments();
    },
      postComment() {
      // 校验是否为空内容
      if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空！");
      }

      // 发表评论
      // 参数1： 请求的URL地址
      // 参数2： 提交给服务器的数据对象 { content: this.msg }
      // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
      this.$http
        .post("api/postcomment/" + this.$route.params.id, {
          content: this.msg.trim()
        })
        .then(function(result) {
          if (result.body.status === 0) {
            // 1. 拼接出一个评论对象
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(cmt);
            this.msg = "";
            Toast("评论提交成功！");
          }
        });
    }

    

  },
  props:['id']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comments  h3{width: 100%;text-align: center}
.flex-center{display: flex;justify-content: center;padding: 10px 0;}
  textarea {
    width: 90%;
    font-size: 14px;
    height: 85px;
    margin: 0 4%;
    border: 1px solid #DDD;
    text-indent: 10px;
    padding: 5px 0;
  }
  .van-cell__title{font-size: 16px;color: black;text-align: left;}
.van-cell__title, .van-cell__value{overflow: hidden; }
</style>
