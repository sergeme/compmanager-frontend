import Vue from 'vue';
import Router from 'vue-router';
import Home from 'views/public/Home.vue';
import Login from 'views/public/Login.vue';
import Register from 'views/public/Register.vue';
import Verify from 'views/public/Verify.vue';
import ForgotPassword from 'views/public/ForgotPassword.vue';
import ResetPassword from 'views/public/ResetPassword.vue';
import NotFound from 'views/public/404.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/verify/:token',
      component: Verify
    },
    {
      path: '/forgot-password',
      component: ForgotPassword
    },
    {
      path: '/reset-password/:token',
      component: ResetPassword
    },
    {
      path: '/profile',
      // lazy-loaded
      component: () => import('views/public/Home.vue')
    },
    {
      path: '/competences',
      name: 'competences',
      // lazy-loaded
      component: () => import('views/protected/student/Competences.vue')
    },
    {
      path: '/competences/profile',
      name: 'competenceprofile',
      // lazy-loaded
      component: () => import('views/protected/student/CompetenceProfile.vue')
    },
    {
      path: '/competences/export',
      name: 'competenceexport',
      // lazy-loaded
      component: () => import('views/protected/student/DataExport.vue')
    },
    {
      path: '/data/school',
      name: 'school',
      // lazy-loaded
      component: () => import('views/protected/admin/School.vue')
    },
    {
      path: '/data/curricula',
      name: 'curricula',
      // lazy-loaded
      component: () => import('views/protected/admin/Curricula.vue')
    },
    {
      path: '/data/classes',
      name: 'classes',
      // lazy-loaded
      component: () => import('views/protected/teacher/Classes.vue')
    },
    {
      path: '/data/classes/new',
      name: 'newclasses',
      // lazy-loaded
      component: () => import('views/protected/admin/NewClasses.vue')
    },
    {
      path: '*',
      component: NotFound
    },
  ]
});
