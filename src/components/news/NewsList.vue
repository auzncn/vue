<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="temp in newsList" :key="temp.id">
       <router-link :to="'/main/newinfo/'+temp.id">
          <img class="mui-media-object mui-pull-left" :src="temp.picAddress">
          <div class="mui-media-body">
            <h1>{{temp.title}}</h1>
            <p class="mui-ellipsis"><span>{{temp.createTime}}</span><span>点击：{{temp.click}}次</span></p>
         
          </div>
       </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NewsList",
  data() {
    return {
      newsList: []
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$axios({
        method: "post",
        url: "/news/list"
      }).then(e => {
        if (e.data.status === "OK") {
            this.newsList=e.data.data;
        }
      });
    }
  }
};
</script>

<style scoped>
.mui-media-body h1 {
  font-size: 14px;
}
.mui-media-body p {
  font-size: 12px;
  color: blue;
  display: flex;
  justify-content: space-between;

}
</style>


