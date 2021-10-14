import Vue from 'vue';
import App from './App.vue';
import { router } from './router';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import de from 'vee-validate/dist/locale/de';
import VeeValidate, { Validator } from 'vee-validate';
import setupInterceptors from 'services/setupInterceptors';
import { domain } from 'helpers/validators';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faUserMinus,
  faSignInAlt,
  faSignOutAlt,
  faIdBadge,
  faClipboard,
  faUsers,
  faFile,
  faFileAlt,
  faUserGraduate,
  faChalkboardTeacher,
  faPlusCircle,
  faMinusCircle,
  faTrashAlt,
  faEdit,
  faMapMarkerAlt,
  faSave
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faHome,
  faUser,
  faUserPlus,
  faUserMinus,
  faSignInAlt,
  faSignOutAlt,
  faIdBadge,
  faClipboard,
  faUsers,
  faFile,
  faFileAlt,
  faUserGraduate,
  faChalkboardTeacher,
  faPlusCircle,
  faMinusCircle,
  faTrashAlt,
  faEdit,
  faMapMarkerAlt,
  faSave);


Vue.config.productionTip = false;
Vue.use(VeeValidate, { inject: true});
Validator.localize('de', de);

Validator.extend('domain', domain, {});

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

setupInterceptors(store);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
