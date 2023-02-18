import { App } from 'vue';
import shortid from 'shortid';
export const isMac = () => /macintosh|mac os x/i.test(navigator.userAgent);

/* 注册组件 */
export const withInstall = (comp) => {
  const c = comp as any;
  c.install = (app: App) => {
    app.component(c.displayName || c.name, comp);
  };
  return comp;
};
/* 生成id */
export const generateId = (prefix?: string) => {
  const id = shortid.generate();
  return prefix ? `${prefix}_${id}` : id;
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

export function warn(location: string, message: string): void {
  console.error(`[datav/${location}]: ${message}`);
}

export function throwError(location: string, message: string): never {
  throw new Error(`[datav/${location}]: ${message}`);
}
