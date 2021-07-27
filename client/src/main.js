import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(ElementUi, {locale});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

router.replace('/inbox'); // Initial route, inbox can as well be our home page.
