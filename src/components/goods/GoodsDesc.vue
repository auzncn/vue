<template>
  <div class="goods-desc-div">
    <h3>{{goodsDesc.title}}</h3>
    <hr>
    <div v-html="goodsDesc.content" class="goods-desc-content"></div>
  </div>
</template>

<script>
export default {
  name: "GoodsDesc",
  data() {
    return {
      goodsId: this.$route.params.goodsId,
      goodsDesc: {}
    };
  },
  created() {
      this.getDescByGoodsId();
  },
  methods: {
    getDescByGoodsId() {
      this.$axios({
        url: "/goodsDesc/getByGoodsId",
        method: "post",
        params: {
          goodsId: this.goodsId
        }
      }).then(e => {
          console.log(e.data);
          
        if (e.data.status === "OK") {
          this.goodsDesc = e.data.data;      
        }
      });
    }
  }
};
</script>

<style>
.goods-desc-div {
  padding: 4px;
}
.goods-desc-div h3 {
  font-size: 17px;
  color: #226aff;
  text-align: center;
  margin: 15px 0;
}
.art-content center p img{
    width:100%;
}
.img-container img{
    width:100%;
}
</style>
