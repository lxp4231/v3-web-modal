import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import exceptionRoutes from '@/router/route.exception';
import asyncRoutes from '@/router/route.async';
import commonRoutes from '@/router/route.common';
import { isLogin } from '@/utils';

const routes: Array<RouteRecordRaw> = [
  // 无鉴权的业务路由 ex:登录
  ...commonRoutes,
  // 带鉴权的业务路由
  ...asyncRoutes,
  // 异常页必须放在路由匹配规则的最后
  ...exceptionRoutes,
];

const router: Router = createRouter({
  // 新的vue-router4 使用 history路由模式 和 base前缀
  history: createWebHashHistory(import.meta.env.VITE_BASE),
  routes,
});

router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = (to.meta.title as string) || import.meta.env.VITE_APP_TITLE;
  // 是否已经登录
  const isAuthenticated = !isLogin();
  // 不需要鉴权路由name
  const specialPages = ['login', 'weChatReturn', 'bindPhoneNumber'];

  // 判断是否为specialPages页面
  const isSpecialPage = (name: any) => {
    return specialPages.includes(name);
  };
  if (isAuthenticated && !isSpecialPage(to.name)) {
    // 重定向登录页
    next('/login');
  } else {
    if (!NProgress.isStarted()) {
      NProgress.start();
    }
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
