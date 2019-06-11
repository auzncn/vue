<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in list" :key="item.id">
        <img :src="item.url" alt :class="isfull?'isfull':''">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  name: "SwipePic",
  props: ["list", "isfull"],
  data() {
    return {};
  }
};
</script>

<style scoped>
.mint-swipe {
  height: 200px;
}
.mint-swipe .mint-swipe-item {
  text-align: center;
}
.mint-swipe .mint-swipe-item img {
  height: 100%;
}
.isfull {
  width: 100%;
}
</style>
