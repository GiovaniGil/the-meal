// import '@/plugins/config-env';
import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import './sass/colors.sass';
import './sass/font.sass';
import './sass/theme.sass';
import './sass/utils.sass';
import './plugins/loading';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
