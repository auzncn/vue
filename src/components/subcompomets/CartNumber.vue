<template>
  <div class="mui-numbox" data-numbox-min="1" data-numbox-max>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="cartItem.number"
      @change="updateCartNum"
      ref="numbox"
    >
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../../static/mui/js/mui.min.js";
export default {
  name: "CartNumber",
  props: ["cartItem"],
  mounted() {
    mui(".mui-numbox").numbox();
  },
  created() {},
  methods: {
    updateCartNum() {
      let changeNums = this.$refs.numbox.value;
      this.cartItem.number = changeNums;
      this.$axios({
        url: "/cart/update",
        method: "post",
        params: this.cartItem
      }).then(e => {
        if (e.data.status === "OK") {
          this.$store.commit("updateCartNum", this.cartItem);
        }
      });
    }
  }
};
</script>

<style scoped>
.mui-numbox {
  height: 30px;
}
</style>
