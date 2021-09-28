import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import de from 'vee-validate/dist/locale/de';
import VeeValidate, { Validator } from 'vee-validate';
import setupInterceptors from './services/setupInterceptors';
import { domain } from './helpers/validators'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faIdBadge,
  faClipboard,
  faUsers,
  faFileAlt,
  faUserGraduate,
  faChalkboardTeacher
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faIdBadge,
  faClipboard,
  faUsers,
  faFileAlt,
  faUserGraduate,
  faChalkboardTeacher);

Vue.config.productionTip = false;
Vue.use(VeeValidate, { inject: true});
Validator.localize('de', de);

Validator.extend('domain', domain, {});

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

setupInterceptors(store);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
