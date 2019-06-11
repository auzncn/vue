<template>
  <div class="cart-continer">
    <div class="mui-content">
      <div class="mui-card" v-for="item in cartList" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getSelected[item.goodsId]" @change="changeSelected(item.id,item.goodsId,$store.getters.getSelected[item.goodsId])"></mt-switch>
            <img :src="item.url">
            <div class="info">
              <h3>{{item.title}}</h3>
              <div class="p">
                <span class="sell-price">￥{{item.unitPrice}}</span>
                <cart-number :cartItem="item"></cart-number>
                <a @click.prevent="deleteByGoodsId(item.goodsId,item.id)">删除</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner settlement">
              <div class="settlement-left">
                  <p>总计（不含运费）</p>
                  <p>已勾选商品&nbsp;&nbsp;<span>{{$store.getters.selectedNumbers}}</span>&nbsp;&nbsp;件，总价&nbsp;<span>￥{{$store.getters.selectedTotalMoney}}</span></p>
              </div>
              <mt-button type="danger">结算</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartNumber from "../components/subcompomets/CartNumber.vue";
export default {
  name: "Cart",
  data(){
    return {
        cartList:[]
    }  
  },
  components: {
    "cart-number": CartNumber
  },
  created() {
    this.getMyCartList();
  },
  methods: {
    getMyCartList() {
      this.$axios({
        url: "/cart/list",
        method: "post"
      }).then(e => {
        if(e.data.status==="OK"){
            this.cartList=e.data.data;
        }
      });
    },
    deleteByGoodsId(goodsId,id){
        this.$axios({
            url:"/cart/deleteById",
            method:"post",
            params:{id:id}
        }).then(e=>{
            if(e.data.status==="OK"){
                this.$store.commit("deleteFromCartList",goodsId);
                this.getMyCartList();
            }
        });
    },
    changeSelected(id,goodsId,val){   
      this.$axios({
        url:"/cart/updateSelected",
        method:"post",
        params:{
          id:id,
          selected:val==true?1:0
        }
      }).then(e=>{
        if(e.data.status==="OK"){
          this.$store.commit("updateSelected",{goodsId:goodsId,val:val});
        }
      });
    }
  }
};
</script>


<style scoped>
.cart-continer {
  background-color: #eee;
  overflow: hidden;
  height: 100%;
}
.mui-card-content-inner img {
  width: 60px;
  height: 60px;
  margin:0 5px;
}
.cart-continer .mui-card-content-inner {
  display: flex;
  align-items: center;
}
.info h3 {
  font-size: 13px;
  margin-bottom: 15px;
}
.sell-price {
  color: red;
  font-weight: bolder;
}
.settlement{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.settlement-left span{
  color: red;
  font-weight: bolder;
}
</style>
