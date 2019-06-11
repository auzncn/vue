<template>
  <div class="comment-div">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容（最多BB 120 字）" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="doComment()">发表你的BB</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in commentList" :key="item.id">
        <div
          class="cmt-title"
        >第{{index+1}}楼 &nbsp;&nbsp; {{item.username}} &nbsp;&nbsp; 发表于: {{item.createTime | dateformat()}}</div>
        <div class="cmt-body">{{item.content}}</div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="loadMore()">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: ["newsId", "photoId","goodsId"],
  data() {
    return {
      page: 1,
      rows: 10,
      commentList: [],
      msg: ""
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      if (this.newsId != undefined) {
        this.$axios({
          url: "/newsComment/list",
          method: "post",
          params: {
            newsId: this.newsId,
            page: this.page,
            rows: this.rows
          }
        }).then(e => {
          if (e.data.status === "OK") {
            this.commentList = this.commentList.concat(e.data.data);
          }
        });
      } else if (this.photoId != undefined) {
        this.$axios({
          url: "/photoComment/list",
          method: "post",
          params: {
            photoId: this.photoId,
            page: this.page,
            rows: this.rows
          }
        }).then(e => {
          if (e.data.status === "OK") {
            this.commentList = this.commentList.concat(e.data.data);
          }
        });
      }else if (this.goodsId != undefined) {
        this.$axios({
          url: "/goodsComment/list",
          method: "post",
          params: {
            goodsId: this.goodsId,
            page: this.page,
            rows: this.rows
          }
        }).then(e => {
          if (e.data.status === "OK") {
            this.commentList = this.commentList.concat(e.data.data);
          }
        });
      }
    },
    doComment() {
      if (this.newsId != undefined) {
        this.$axios({
          url: "/newsComment/add",
          method: "post",
          params: {
            newsId: this.newsId,
            username: "匿名",
            content: this.msg
          }
        }).then(e => {
          if (e.data.status === "OK") {
            this.msg = "";
            this.page = 1;
            this.$axios({
              url: "/newsComment/list",
              method: "post",
              params: {
                newsId: this.newsId,
                page: this.page,
                rows: this.rows
              }
            }).then(e => {
              this.commentList = e.data.data;
            });
          }
        });
      } else if (this.photoId != undefined) {
        this.$axios({
          url: "/photoComment/add",
          method: "post",
          params: {
            photoId: this.photoId,
            username: "匿名",
            content: this.msg
          }
        }).then(e => {
          if (e.data.status === "OK") {
            this.msg = "";
            this.page = 1;
            this.$axios({
              url: "/photoComment/list",
              method: "post",
              params: {
                photoId: this.photoId,
                page: this.page,
                rows: this.rows
              }
            }).then(e => {
              this.commentList = e.data.data;
            });
          }
        });
      }else if (this.goodsId != undefined) {
        this.$axios({
          url: "/goodsComment/add",
          method: "post",
          params: {
            goodsId: this.goodsId,
            username: "匿名",
            content: this.msg
          }
        }).then(e => {
          if (e.data.status === "OK") {
            this.msg = "";
            this.page = 1;
            this.$axios({
              url: "/goodsComment/list",
              method: "post",
              params: {
                goodsId: this.goodsId,
                page: this.page,
                rows: this.rows
              }
            }).then(e => {
              this.commentList = e.data.data;
            });
          }
        });
      }
    },
    loadMore() {
      this.page++;
      this.getComments();
    }
  }
};
</script>

<style scoped>
.comment-div h3 {
  font-size: 16px;
}

.comment-div textarea {
  font-size: 14px;
  margin: 0px;
  height: 80px;
}
.cmt-list .cmt-item {
  font-size: 13px;
}
.cmt-list .cmt-item .cmt-title {
  background: #ccc;
  line-height: 30px;
}
.cmt-list .cmt-item .cmt-body {
  line-height: 35px;
  text-indent: 2em;
}
</style>
