import { App } from 'vue';

/* 注册组件 */
export const withInstall = (comp) => {
  const c = comp as any;
  c.install = (app: App) => {
    app.component(c.displayName || c.name, comp);
  };
  return comp;
};

/* 获取静态资源 */
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
};
