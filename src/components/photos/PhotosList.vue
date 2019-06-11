<template>
  <div>
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item',item.id==0?'mui-active':'']" v-for="item in cateList" :key="item.id" @tap="getPhotos(item.id)">
            {{item.cateName}}
          </a>
        </div>
      </div>
    </div>

    <ul class="photosul"> 
      <router-link :to="'/main/photoinfo/'+item.id" v-for="item in photos" :key="item.id" class="photoli" tag="li" > 
        <img v-lazy="item.url" class="photoimg">
        <div class="photoinfo">
          <h3>{{item.title}}</h3>
          {{item.body}}
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import mui from "../../../static/mui/js/mui.min.js";
export default {
  name: "PhotosList",
  data() {
    return {
      cateList: [],
      photos: []
    };
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getCateList();
    this.getPhotos(0);
  },
  methods: {
    getCateList() {
      this.$axios({
        url: "/category/list",
        method: "post"
      }).then(e => {
        if (e.data.status === "OK") {
          this.cateList = e.data.data;
          this.cateList.unshift({ id: 0, cateName: "全部" });
        }
      });
    },
    getPhotos(cateId) {
      this.$axios({
        url: "/photo/list",
        method: "post",
        params: { cateId: cateId }
      }).then(e => {
        if (e.data.status === "OK") {
          this.photos = e.data.data;
        }
      });
    }
  }
};
</script>

<style scoped>
* {
  touch-action: pan-y;
}

img[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
.photosul{
  list-style: none;
  margin:0;
  padding:10px;
}
.photosul .photoli{
  background-color: gary;
   margin: 10px 0;
   box-shadow: 0 0 10px #999;
    position: relative;
} 
.photosul .photoli .photoimg{
  width:100%;
  display: block;
} 
.photoinfo{
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: 12px;
  color: #fff;
  max-height: 85px;
  bottom: 0;
}

.photoinfo h3{
 font-size: 13px;
}
</style>
