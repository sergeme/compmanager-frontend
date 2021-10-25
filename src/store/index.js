import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { school } from './school.module';
import { schoolClass } from './class.module';
import { course } from './course.module';
import { user } from './user.module';
import { curriculum } from './curriculum.module';
import { competences } from './competence.module';
import { process } from './process.module';
import { tags } from './tag.module';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    school,
    schoolClass,
    course,
    user,
    curriculum,
    competences,
    process,
    tags
  }
});
