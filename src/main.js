// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'

//  导入mintui样式
import 'mint-ui/lib/style.css'

//导入mui样式
import '../static/mui/css/mui.min.css'
import '../static/mui/css/icons-extra.css'
Vue.use(MintUI);

// 导入vue图片查看器
import VuePreview from 'vue2-preview'
Vue.use(VuePreview);


//导入时间插件
import moment from 'moment';
//时间格式化过滤器
Vue.filter("dateformat", function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});

//导入axios
import Axios from 'Axios'
Vue.prototype.$axios = Axios;
//Axios.defaults.baseURL = "http://localhost:8090";
Axios.defaults.baseURL = "http://192.168.0.100:8090";


import Vuex from 'vuex'
Vue.use(Vuex);

//var cartCache = JSON.parse(localStorage.getItem("cartCache")!=null?localStorage.getItem("cartCache"):"[]");

var store = new Vuex.Store({
  state: {
    cart: []
  },
  mutations: {
    addtoCart(state, goodsObj) {
      var boolean = false;
      state.cart.some(e => {
        if (e.goodsId === goodsObj.goodsId) {
          e.number += parseInt(goodsObj.number);
          boolean = true;
          return true;
        }
      });
      if (!boolean) {
        state.cart.push(goodsObj);
      }
    },
    addCartlistToStore(state, cartList) {
      state.cart = cartList;
    },
    updateCartNum(state, cartItem) {
      console.log(state.cart);
      
      state.cart.some(e => {
        if (e.goodsId === cartItem.goodsId) {
          e.number = parseInt(cartItem.number);
          return true;
        }
      });
    },
    deleteFromCartList(state, goodsId) {
      state.cart.some((e, i) => {
        if (e.goodsId == goodsId) {
          state.cart.splice(i, 1);
          return true;
        }
      });
    },
    updateSelected(state,item){
      state.cart.some(e=>{
        if(e.goodsId==item.goodsId){ 
          e.selected=(item.val==true?1:0)
          return true;
        }
      }); 
    }
  },
  getters: {
    getCartTotalNum(state) {
      var totalNum = 0;
      state.cart.forEach(e => {
        totalNum += e.number;
      })
      return totalNum;
    },
    getSelected(state) {
      let o = {}
      state.cart.forEach(e => {
        switch (e.selected) {
          case 0:
            o[e.goodsId] = false;
            break;
          case 1:
            o[e.goodsId] = true;
            break;
          default:
            o[e.goodsId] = true;
            break;
        }
      });
      return o;
    },
    selectedNumbers(state){
      let n=0;
      state.cart.forEach(e => {
        if(e.selected==1){
          n+=e.number;
        }
        
      });
      return n;
    },
    selectedTotalMoney(state){
      let n=0;
      state.cart.forEach(e => {
        if(e.selected==1){
          n+=(e.number*e.unitPrice);
        }
      });
      return n;
    }
  }

});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  components: { App },
  template: '<App/>',
  store: store
})
