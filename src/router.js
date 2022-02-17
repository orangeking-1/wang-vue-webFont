import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/register.vue')
    },
    {
      path: '/articleList',
      name: 'articleList',
      component: () => import('./views/articleList.vue')
    },
    {
      path: '/addArticle',
      name: 'addArticle',
      component: () => import('./views/addArticle.vue')
    },
    {
      path: '/articleDetail',
      name: 'articleDetail',
      component: () => import('./views/articleDetail.vue')
    },
    {
      path: '/articleModify',
      name: 'articleModify',
      component: () => import('./views/articleModify.vue')
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: () => import('./views/userCenter.vue')
    },
    {
      path: '/projectList',
      name: 'projectList',
      component: () => import('./views/projectList.vue')
    },
    {
      path: '/projectAddOrModify',
      name: 'projectAddOrModify',
      component: () => import('./views/projectAddOrModify.vue')
    },
    {
      path: '/projectDetail',
      name: 'projectDetail',
      component: () => import('./views/projectDetail.vue')
    },
    {
      path: '/personalProfile',
      name: 'personalProfile',
      component: () => import('./views/personalProfile.vue')
    },
    {
      path: '/messageBoard',
      name: 'messageBoard',
      component: () => import('./views/messageBoard.vue')
    }
  ]
})
