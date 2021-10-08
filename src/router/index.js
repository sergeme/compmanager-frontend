import Vue from 'vue';
import Router from 'vue-router';
import Home from 'views/Home.vue';
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
      component: () => import('views/BoardUser.vue')
    },
    {
      path: '/data/school',
      name: 'school',
      // lazy-loaded
      component: () => import('views/protected/admin/School.vue')
    },
    {
      path: '*',
      component: NotFound
    },
  ]
});
