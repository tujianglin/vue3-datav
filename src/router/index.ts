import { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import { AppRouteRecordRaw } from '/#/router';

const navRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/project',
    component: () => import('/@/views/home/index.vue'),
    children: [
      {
        path: 'project',
        name: 'MyProject',
        component: () => import('/@/views/project/index.vue'),
        meta: { title: '大屏管理' },
      },
      {
        path: 'components',
        name: 'MyComponents',
        component: () => import('/@/views/components/index.vue'),
        meta: { title: '组件配置' },
      },
      {
        path: 'live',
        name: 'MyLive',
        component: () => import('/@/views/live/index.vue'),
        meta: { title: '产线实况' },
      },
    ],
  },
];

export const routes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
  ...navRoutes,
  {
    path: '/create',
    name: 'Create',
    component: () => import('/@/views/project/create.vue'),
    meta: {
      title: '创建',
    },
  },
  {
    path: '/screen/:projectId',
    name: 'ScreenEditor',
    props: true,
    component: () => import('/@/views/screen-editor/index.vue'),
    meta: { title: '编辑器' },
  },
  {
    path: '/screen/preview/:screenId',
    name: 'Preview',
    props: true,
    component: () => import('/@/views/screen/index.vue'),
    meta: { title: '编辑器' },
  },
];
export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
