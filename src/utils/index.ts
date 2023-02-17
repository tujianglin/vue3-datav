import { App } from 'vue';
export const isMac = () => /macintosh|mac os x/i.test(navigator.userAgent);

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

/* 判断苹果或window的 ctrl */
export const macMetaOrCtrl = (ev: MouseEvent | KeyboardEvent) => {
  const ismac = isMac();
  return (!ismac && ev.ctrlKey) || (ismac && ev.metaKey);
};
