<template>
  <div class="goods-list">
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="getInfo(item.id)">
      <img :src="item.imgUrl">
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sellPrice}}</span>
          <span class="old">￥{{item.marketPrice}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩余{{item.stockQuantity}}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="loadMore()">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  name: "GoodList",
  data() {
    return {
      page: 1,
      goodsList: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      this.$axios({
        url: "/goods/list",
        method: "post",
        params: {
          page: this.page,
          rows: 6
        }
      }).then(e => {
        if (e.data.status === "OK") {
          this.goodsList = this.goodsList.concat(e.data.data);
        }
      });
    },
    loadMore() {
      this.page++;
      this.getGoodsList();
    },
    getInfo(goodsId){
      this.$router.push({
        name:"goodsinfo",
        params:{goodsId:goodsId}
      })
    }
  }
};
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
}
.goods-list .goods-item {
  width: 49%;
  border: 1px solid #ccc;
  box-shadow: 0 0 8px #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 4px 0;
  padding: 2px;
  min-height: 279px;
}
.goods-list .goods-item img {
  width: 100%;
}
.goods-list .goods-item .title {
  font-size: 14px;
}
.info {
  background-color: #eee;
}
.info .sell {
  display: flex;
  justify-content: space-between;
  margin: 0;
  padding: 5px;
}
.info .sell span {
  font-size: 13px;
}
.price .now {
  font-size: 16px;
  color: red;
  font-weight: bolder;
}
.price .old {
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 10px;
}
</style>
