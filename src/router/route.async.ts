// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '',
      icon: '',
    },
    redirect: 'personalMsg',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: 'personalMsg',
        component: () => import('@/views/home/personalMsg.vue'),
        name: 'personalMsg',
        meta: { title: 'tab1', icon: 'User' },
      },
      {
        path: 'companyMsg',
        component: () => import('@/views/home/companyMsg.vue'),
        name: 'companyMsg',
        meta: { title: 'tab2', icon: 'OfficeBuilding' },
      },
    ],
  },
  {
    path: '/bindPhoneNumber',
    name: 'bindPhoneNumber',
    meta: {
      title: '',
      icon: '',
    },
    component: () => import('@/views/bindPhoneNumber/bindPhoneNumber.vue'),
  },
];

export default asyncRoutes;
