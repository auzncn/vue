<template>
  <div>
    <swipe-pic :list="swipePicList" :isfull="true"></swipe-pic>
    <div >
		        <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/main/newslist">
		                    <img src="../../static/images/menu1.png" alt="">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/main/photoslist">
		                    <img src="../../static/images/menu2.png" alt="">
		                    <div class="mui-media-body">图片分享</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/main/goodslist">
		                    <img src="../../static/images/menu3.png" alt="">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../static/images/menu4.png" alt="">
		                    <div class="mui-media-body">留言反馈</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <img src="../../static/images/menu5.png" alt="">
		                    <div class="mui-media-body">视频专区</div></a></li>
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" @click="contactUs()" >
		                   <img src="../../static/images/menu6.png" alt="">
		                    <div class="mui-media-body">联系我们</div></li>
		        </ul> 
		</div>
  </div>
</template>

<script>
import SwipePic from "./subcompomets/SwipePic.vue"
export default {
  components:{
    "swipe-pic":SwipePic
  },
  name: "Main",
  data() {
    return {
      swipePicList: []
    };
  },
  created() {
    this.getSwaipePic();
  },
  methods: {
    getSwaipePic() {
      this.$axios({
        method: "post",
        url: "/swipe_pic/list"
      }).then(res => {
       if(res.data.status==="OK"){
        res.data.data.forEach(element => {
          element.url=element.diskAddress;
        });
         this.swipePicList=res.data.data;
       }
      });
    },
    contactUs(){
      this.$router.push({name:"aboutme"});
    }
  }
};
</script>

<style scoped>

.mui-grid-view.mui-grid-9{
  background-color: white;
  border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
  border: none;
}
.mui-grid-view.mui-grid-9 img{
  width: 60px;
  height: 60px;
}
.mui-grid-view.mui-grid-9 .mui-media-body{
  font-size: 14px;
}
</style>
