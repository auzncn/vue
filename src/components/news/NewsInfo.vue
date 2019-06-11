<template>
  <div class="newsinfo">
    <h3 class="title">{{newsinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{newsinfo.createTime|dateformat()}}</span>
      <span>点击 {{newsinfo.click}} 次</span>
    </p>
    <hr>
    <div class="content" v-html="newsinfo.content"></div>
    <comment-box :newsId="this.id"></comment-box>
  </div>
</template>

<script>
import Commnet from "../subcompomets/Comment.vue";

export default {
  name: "NewsInfo",
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      this.$axios({
        url: "/news/getById",
        method: "post",
        params: { id: this.id }
      }).then(e => {
        if (e.data.status === "OK") {
          this.newsinfo = e.data.data;
          console.log(e.data.data);
          
        }
      });
    }
  },
  components: {
    "comment-box": Commnet
  }
};
</script>

<style scoped>
.newsinfo {
  padding: 0 4px;
}
.newsinfo .title {
  font-size: 16px;
  text-align: center;
  color: red;
}
.newsinfo .subtitle {
  font-size: 13px;
  color: #226aff;
  display: flex;
  justify-content: space-between;
}
</style>

