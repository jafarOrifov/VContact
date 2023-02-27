import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'sign-in',
    path: '/',
    component: () => import('pages/SignIn.vue'),
    // children: [{ path: '/sign-up', component: () => import('pages/SignUp.vue') }],
  },
  {
    name: 'signup',
    path: '/signup',
    component: ()=> import('pages/SignUp.vue'),
    sensitive: true,
  },
  {
    name: 'main-layout',
    path: '/main-layout',
    component: ()=> import('layouts/MainLayout.vue'),
    children:[
      {
        name: 'staffs',
        path: 'staffs',
        component: () => import('../components/Staffs.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
