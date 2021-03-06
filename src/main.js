import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'



Vue.config.productionTip = false;
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://localhost:3000'


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
