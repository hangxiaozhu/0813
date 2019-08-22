
<template>
  <div class="goods">

    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>


    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="item in list" :key="item.id">
        <img :src="item.src" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goodsinfo.title }}</div>
        <div class="goods-price">市场价：￥{{goodsinfo.market_price}} &nbsp;&nbsp;&nbsp; 销售价：￥{{goodsinfo.sell_price}}</div>
        <hr>
        <div style="padding:10px 0; display:flex;align-items: center;">购买数量：<van-stepper v-model="selectedCount" min="1" :max="goodsinfo.stock_quantity " /></div>
        <hr>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="24">商品货号：{{ goodsinfo.goods_no }}</van-col>
        <van-col span="24">库存情况：{{ goodsinfo.stock_quantity }}件</van-col>
        <van-col span="24">上架时间：{{ goodsinfo.add_time | dateFormate }}</van-col>
      </van-cell>
    </van-cell-group>

    
    <van-cell-group class="goods-cell-group">
      <van-cell title="商品评论" is-link @click="goComment(id) " />
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <!-- <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell> -->
      <van-cell style="text-align:center;" title="图文详情" />
    </van-cell-group>

    <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>

    <hr>

    <div class="content" v-html="info.content"></div>
  </div>
  
    

    <van-goods-action style="z-index: 2;">
      <van-goods-action-icon icon="chat-o" @click="sorry">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon id="badge" icon="cart-o"  :info="$store.getters.getAllCount" ref="badge" @click="goShopcar">
        购物车
      </van-goods-action-icon>
      <van-goods-action-button type="warning" @click="addToShopCar">
        加入购物车
      </van-goods-action-button>
      <!-- <van-goods-action-button type="danger" @click="sorry">
        立即购买
      </van-goods-action-button> -->
    </van-goods-action>
  </div>
</template>

<script>
import Vue from 'vue';
import { Stepper } from 'vant';
Vue.use(Stepper);
import { Sku } from 'vant';

Vue.use(Sku);
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from 'vant';
export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton
  },
  data() {
    return {
        id: this.$route.params.id,
        list:[],
        goodsinfo: {},
        info: {},//评论信息
        ballFlag: false,//控制小球的显示隐藏
        selectedCount:1 //保存用户选中的商品数量，默认为1
    };
  },
  created(){
      this.getgoodsInfo();
      this.getGoodsInfo();
      this.getGoodsDesc();
  },
  methods: {
    onClickCart() {
      this.$router.push('cart');
    },
    sorry() {
      Toast('暂无后续逻辑~');
    },
     getgoodsInfo() {
      this.$http.get("api/getthumimages/"+ this.id).then(result => {
        if (result.body.status === 0) {
          // 如果没有失败，应该把数据保存到 data 上
          this.list = result.body.message ;
        // console.log(this.list);
        } 
      });
    },
    getGoodsInfo() {
      // 获取商品的信息
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        //   console.log(this.goodsinfo)
        }
      });
    },
    getGoodsDesc() {
      this.$http
        .get("api/goods/getdesc/" + this.id)
        .then(result => {
          if (result.body.status === 0) {
            this.info = result.body.message[0];
          }
        });
    },
     goComment(id) {
      // 点击跳转到 评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
     goShopcar() {
      // 点击跳转到 评论页面
      this.$router.push({ name: 'cart' });
    },
    addToShopCar() {
      // 添加到购物车
      this.ballFlag = !this.ballFlag;
      // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
      // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
      var goodsinfo = {
        id: this.id,
        count: this.selectedCount,
        price: this.goodsinfo.sell_price,
        selected: true
      };
      // 调用 store 中的 mutations 来将商品加入购物车
      this.$store.commit("addToCar", goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)";
    },
    enter(el, done) {
      el.offsetWidth;

      // 小球动画优化思路：
      // 1. 先分析导致 动画 不准确的 本质原因： 我们把 小球 最终 位移到的 位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
      // 2. 只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离之后， 问题就出现了；
      // 3. 因此，我们经过分析，得到结论： 不能把 位置的 横纵坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
      // 4. 经过分析，得出解题思路： 先得到 徽标的 横纵 坐标，再得到 小球的 横纵坐标，然后 让 y 值 求差， x 值也求 差，得到 的结果，就是横纵坐标要位移的距离
      // 5. 如何 获取 徽标和小球的 位置？？？   domObject.getBoundingClientRect()

      // 获取小球的 在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      // 获取 徽标 在页面中的位置
      const badgePosition = document.getElementById("badge").getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;

      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },



  }
};
</script>

<style  scoped>
.goods {padding-bottom: 50px;}
.goods-swipe img{ width: 100%; display: block;}
.goods-title {font-size: 16px;}
.goods-price {color: #f44;}
.goods-express {color: #999;font-size: 12px;padding: 5px 15px;}
.goods-cell-group {margin: 15px 0;}
.van-cell__value {color: #999;}
.goods-tag {margin-left: 5px;}
.goodsdesc-container {padding: 4px 0;width: 98%;margin: 0 1%}
.goodsdesc-container  h3 { font-size: 16px; color: #226aff; text-align: center;margin: 15px 0;}

</style>
<style >
.content{width: 100%;overflow: hidden;}
.content .gomeImgLoad{max-width: 100% !important;height: auto;}
 .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 441px;
    left: 126px;
  }

</style>

