import Vue from 'vue';
import Vant from 'vant';
Vue.use(Vant);
import { Lazyload } from 'vant';





Vue.use(Lazyload, {
  preLoad: 1.3,
  error: '/error.png',
  loading: '/loading.gif',
  attempt: 1,

})


Vue.use(Lazyload);