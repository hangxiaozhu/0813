<template>
  <div class="hello">
  <van-list
  v-model="loading"
  :finished="true"
  finished-text="没有更多了"
><van-cell-group>
  <van-cell
    v-for="item in list"
    :key="item.id"
    :title="item.title"
    :clickable="true"
    :border="true"
    :is-link="true"
    :to="'/home/newsinfo/'+item.id"
  />
  </van-cell-group>
</van-list>
  </div>
</template>

<script>
import Vue from 'vue';
import { List } from 'vant';
import { Cell, CellGroup } from 'vant';

Vue.use(Cell).use(CellGroup);
Vue.use(List);
import { Toast } from 'vant';
Vue.use(Toast);
export default {
   data() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },
 created() {
    this.getNewsList();
  },
  methods: {
       getNewsList() {
      // 获取新闻列表
      this.$http.get("api/getnewslist").then(result => {
        if (result.body.status === 0) {
          // 如果没有失败，应该把数据保存到 data 上
          this.list = result.body.message;
        // console.log(this.list);

        } else {
          Toast("获取新闻列表失败！");
        }
      });
    },
    // onLoad() {
    //   // 异步更新数据
    //   setTimeout(() => {
    //     for (let i = 0; i < 4; i++) {
    //       this.list.push(this.list.length + 1);
    //     }
    //     // 加载状态结束
    //     this.loading = false;

    //     // 数据全部加载完成
    //     if (this.list.length >= 11) {
    //       this.finished = true;
    //     }
    //   }, 500);
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
