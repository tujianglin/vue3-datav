import { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { AppRouteRecordRaw } from '/#/router';
export const routes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/project',
    name: 'Project',
    component: () => import('/@/views/project/index.vue'),
    meta: {
      title: '项目',
    },
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes: routes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach((to, form, next) => {
  next();
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
