<template>
  <div class="goods-div">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="flag" ref="ball"></div>
    </transition>
    <div class="mui-content">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <swipe-pic :list="goodsSwipePicList" :isfull="false"></swipe-pic>
          </div>
        </div>
      </div>

      <div class="mui-card">
        <div class="mui-card-header">{{goods.title}}</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            市场价：
            <del>￥{{goods.marketPrice}}</del> &nbsp;&nbsp;&nbsp;&nbsp;
            销售价：
            <span class="now">￥{{goods.sellPrice}}</span>
            <div class="buy-number">
              购买数量：
              <div class="mui-numbox" data-numbox-min="1" >
                <button class="mui-btn mui-btn-numbox-minus" type="button" disabled>-</button>
                <input id="test" class="mui-input-numbox" type="number" @change="getNumber" ref="numbox">
                <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
              </div>
            </div>
            <p>
              <mt-button type="primary" size="small">立即购买</mt-button>
              <mt-button type="danger" size="small" @click="addToCart()">加入购物车</mt-button>
            </p>
          </div>
        </div>
      </div>

      <div class="mui-card">
        <div class="mui-card-header">商品参数</div>
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <p>商品货号：{{ goods.goodsNo }}</p>
            <p>库存情况：{{ goods.stockQuantity }}件</p>
            <p>上架时间：{{ goods.addTime | dateformat() }}</p>
          </div>
        </div>
        <div class="mui-card-footer">
          <mt-button type="primary" size="large" plain @click="goodsDesc()">图文介绍</mt-button>
          <mt-button type="danger" size="large" plain @click="goodsComment()">商品评论</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SwipePic from "../subcompomets/SwipePic.vue";
import mui from "../../../static/mui/js/mui.min.js";
export default {
  components: {
    "swipe-pic": SwipePic
  },
  name: "GoodsInfo",
  data() {
    return {
      goodsId: this.$route.params.goodsId,
      goodsSwipePicList: [],
      goods: {},
      flag: false,
      number:1
    };
  },
  mounted() {
    mui(".mui-numbox").numbox();
  },
  created() {
    this.getGoodsSwipePic();
    this.getGoodsInfo();
  },
  methods: {
    getGoodsSwipePic() {
      this.$axios({
        url: "/goodsSwipePic/list",
        method: "post",
        params: {
          goodsId: this.goodsId
        }
      }).then(e => {
        if (e.data.status === "OK") {
          this.goodsSwipePicList = e.data.data;
        }
      });
    },
    getGoodsInfo() {
      this.$axios({
        url: "/goods/getById",
        method: "post",
        params: {
          goodsId: this.goodsId
        }
      }).then(e => {
        if (e.data.status === "OK") {
          this.goods = e.data.data;
          mui(".mui-numbox")
        .numbox()
        .setOption("max", this.goods.stockQuantity);
        }
      });
    },
    goodsComment() {
      this.$router.push({
        name: "goodscommnet",
        params: { goodsId: this.goodsId }
      });
    },
    goodsDesc() {
      this.$router.push({
        name: "goodsdesc",
        params: { goodsId: this.goodsId }
      });
    },
    beforeEnter(el) {
      //将dom元素进行2d转换，让他能够实现动画效果，0,0代表但前位置
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      //这步不加没有动画效果小球直接到目的地
      el.offsetWidth;
      //拿到小球的dom对象
      const ballClient = this.$refs.ball.getBoundingClientRect();
      //拿到badge的dom对象
      const badgeClient = document.getElementById("badge").getBoundingClientRect();
      //他们之间的xy偏移量就是我们要唯一的距离
      const x = badgeClient.left - ballClient.left;
      const y = badgeClient.top - ballClient.top;
      //小球做运动
      el.style.transform = "translate("+x+"px,"+y+"px)";
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      //半场动画直接结束
      done();
    },
    afterEnter(el) {
      this.flag = !this.flag;
    },
    addToCart() {
      this.flag = !this.flag;
      var obj={goodsId:this.goodsId,number:parseInt(this.number),unitPrice:this.goods.sellPrice,url:this.goods.imgUrl,title:this.goods.title};
      this.$axios({
        url:"cart/add",
        method:"post",
        params:obj
      }).then(e=>{
        if(e.data.status==="OK"){
            this.$store.commit("addtoCart",obj);
        }
      });
      //this.$store.commit("addtoCart",obj);
    },
    getNumber(){
      this.number = this.$refs.numbox.value>this.goods.stockQuantity?this.goods.stockQuantity:this.$refs.numbox.value;
    }
  }
};
</script>

<style scoped>
.now {
  font-size: 16px;
  color: red;
  font-weight: bolder;
}
.buy-number {
  padding-bottom: 10px;
}
.mui-card-footer {
  display: block;
}
.mui-card-footer button {
  margin: 10px 0;
}
.goods-div {
  background-color: #eee;
  overflow: hidden;
  height: 100%;
}
.ball {
  background-color: red;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  z-index: 99;
  position: absolute;
  top: 385px;
  left: 155px;
}
</style>
