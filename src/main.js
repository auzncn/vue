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

Vue.use(MintUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
