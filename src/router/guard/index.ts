import type { Router } from 'vue-router';
import { setRouteChange } from '../logics';
import { useUserStore } from '/@/store/modules/user';

export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createPermissionGuard(router);
}

function createPageGuard(router: Router) {
  router.beforeEach(async (to) => {
    await setRouteChange(to);
    return true;
  });
}

/* 路由权限校验 */
function createPermissionGuard(router: Router) {
  const whiteList = ['/login'];
  const userStore = useUserStore();
  router.beforeEach(async (to, _, next) => {
    // 设置浏览器title
    if (to.meta?.title) {
      document.title = to.meta.title;
    }
    // 是否登录
    if (userStore.isLogin) {
      if (to.path === '/login') {
        next({ path: '/' });
      } else {
        next();
      }
    } else if (whiteList.some((i) => to.path.startsWith(i))) {
      // 避免重定向
      next();
    } else {
      next({ path: '/login' });
    }
  });
}
