import Vue from 'vue';
import Vuex from 'vuex';

import App from './views/App/App';

import router from './router';

import { store } from './store/store';

Vue.config.productionTip = false;
Vue.use(Vuex);

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
}).$mount('#app');
