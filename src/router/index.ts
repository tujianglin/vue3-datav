import { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { AppRouteRecordRaw } from '/#/router';
export const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    redirect: '/login',
    meta: {
      hideChildrenInMenu: true,
      icon: 'ep:briefcase',
      title: '登录',
      affix: true,
    },
    children: [
      {
        path: '/login',
        meta: {
          title: '登录',
        },
        component: () => import('/@/views/login/index.vue'),
      },
    ],
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes: routes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
