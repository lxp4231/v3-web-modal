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
        meta: { title: '个人信息', icon: 'User' },
      },
      {
        path: 'companyMsg',
        component: () => import('@/views/home/companyMsg.vue'),
        name: 'companyMsg',
        meta: { title: '企业信息', icon: 'OfficeBuilding' },
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
