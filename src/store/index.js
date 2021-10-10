import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { school } from './school.module';
import { schoolClass } from './class.module';
import { user } from './user.module';
import { curriculum } from './curriculum.module'
import { process } from './process.module';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    school,
    schoolClass,
    user,
    curriculum,
    process
  }
});
