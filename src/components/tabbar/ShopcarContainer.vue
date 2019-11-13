<template>
  <div class="car-cover">
      <div class="car-one" v-for="(item,index) in goodslist" :key="item.id"> 
    <van-switch active-color="#FF0000" v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"/>
    <van-card
  :price="item.sell_price" 
  :title="item.title"
  :thumb="item.thumb_path"
>
  <div slot="footer">
    <van-stepper disable-input v-model="$store.getters.getGoodsCount[item.id]"  @change="countChanged(item.id,$store.getters.getGoodsCount[item.id])"/>
    <van-button size="mini" type="danger" @click="remove(item.id,index)">删除</van-button>
  </div>
</van-card>
</div>

<van-submit-bar
  :price="parseFloat($store.getters.getGoodsCountAndAmount.amount+'00')"
  button-text="提交订单"
>
<van-checkbox v-model="checked" @click="checkAll(checked)">全选</van-checkbox>
<span slot="tip">
    已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count }} {{$store.getters.getAllCheck}}</span> 件
  </span>
  </van-submit-bar>
  </div>
</template>

<script>
import Vue from 'vue';
import { Switch } from 'vant';
Vue.use(Switch);
import { Card } from 'vant';
Vue.use(Card);
import { Stepper } from 'vant';
Vue.use(Stepper);
import { SubmitBar } from 'vant';
Vue.use(SubmitBar);
import { Checkbox, CheckboxGroup } from 'vant';
Vue.use(Checkbox).use(CheckboxGroup);
export default {
  
  data () {
    return {
     goodslist: [],
     checked:this.$store.getters.getAllCheck
    }
  },
  created(){
      this.getGoodsList();
  },
  methods:{
      getGoodsList(){
          var idArr =[];
          this.$store.state.car.forEach(item => {
              idArr.push(item.id)
          });
          if (idArr.length == 0) {
              return;
          };
          // 获取购物车商品列表
      this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });

      },
       countChanged(id,count) {
      // 数量改变了
      // console.log(this.$refs.numbox.value);
      // 每当数量值改变，则立即把最新的数量同步到 购物车的  store 中，覆盖之前的数量值
      this.$store.commit("updateGoodsInfo", {
        id: id,
        count: count
      });
    },
    remove(id,index){
      this.goodslist.splice(index,1);
      this.$store.commit('removeFormCar',id)
    },
    selectedChanged(id,val){
      this.$store.commit('updateGoodsSelected',{id,selected:val});
       this.checked =  this.$store.getters.getAllCheck;
    },
    checkAll(checked){
      this.$store.commit('checkAllCar',{checked:checked});
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.car-one{display: flex;align-items: center;background: #fafafa;}
.van-card{width: 100%;}
.van-card__footer div:nth-child(1){display: flex;align-items: center; justify-content: flex-end;}
.van-card__footer .van-button{margin-left: 5%;}
.car-cover{padding-bottom: 50px;}
.van-switch{margin-left: 2%;}
.van-checkbox{margin-left: 2%;}
</style>
