import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui'
import axios from 'axios'
import store from './vuex/store'


import './style/Pustyle.css'
import 'mint-ui/lib/style.css'

Vue.prototype.axios = axios;
Vue.config.productionTip = false;
Vue.use(Mint);
let Base64 = require('js-base64').Base64;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  mounted(){
    this.getRem(750,100)
    
    // document.dispatchEvent(new Event('render-event'))
  },
  methods:{
    getRem(pwidth,prem){
      var html = document.getElementsByTagName("html")[0];
      var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
      html.style.fontSize = oWidth/pwidth*prem + "px";
    }
  },
});
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
