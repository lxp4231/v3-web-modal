// 不需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';
import { isLogin } from '@/utils';

const commonRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
    beforeEnter: (to, from, next) => {
      // 检查是否已登录
      if (isLogin()) {
        // 如果已经登录，则重定向到其他页面
        next('/');
      } else {
        // 如果未登录，则允许继续访问登录页
        next();
      }
    },
  },
  {
    path: '/weChat/login',
    name: 'weChatReturn',
    component: () => import('@/views/login/weChatLogin.vue'),
  },
];

export default commonRoutes;
