import { App } from 'vue';
import shortid from 'shortid';
import { isString } from 'lodash-es';

const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (val: object, key: string | symbol) => hasOwnProperty.call(val, key);

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

/* 获取字符串中 :value 形式的参数 */
export const getTextParams = (text: string) => {
  const reg = /:([\d\w\u4e00-\u9fa5_$@*]+)/gi;
  return text.match(reg) ?? [];
};
/*  替换字符串中 :value 形式的参数 */
export const replaceTextParams = (text: string, data: Record<string, string>) => {
  if (Object.keys(data).length === 0) {
    return text;
  }
  const reg = /:([\d\w\u4e00-\u9fa5_$@*]+)/gi;
  return text.replace(reg, (key: string) => {
    return data[key.substring(1)] ?? key;
  });
};
/* 是否是url地址 */
export const isUrl = (val: string) => /^[a-zA-z]+:\/\/[^\s]*$/.test(val);

export function toJson<T>(data: any, defaultValue: T) {
  try {
    if (!data) {
      return defaultValue;
    }
    if (isString(data)) {
      return JSON.parse(data);
    }
    return data;
  } catch {
    return defaultValue;
  }
}

export function warn(location: string, message: string): void {
  console.error(`[datav/${location}]: ${message}`);
}

export function throwError(location: string, message: string): never {
  throw new Error(`[datav/${location}]: ${message}`);
}
