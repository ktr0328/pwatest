import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import VueLazyload from 'vue-lazyload';

Vue.config.productionTip = false;
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://dummyimage.com/150x150/000/fff',
  loading: 'https://user-images.githubusercontent.com/25787913/44538726-30e5a480-a73d-11e8-9ab1-c3f8cd26dd65.gif',
  attempt: 1,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
