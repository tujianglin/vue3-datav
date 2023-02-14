import { defineStore } from 'pinia';
import { Storage } from '/@/utils/storage';
import { StorageEnum } from '/@/enums/storageEnum';
import { defAppConfig } from '/@/settings/designSetting';
import { LocalAppConfig } from '/#/storage';
import { store } from '/@/store';

interface AppState {
  appConfig: LocalAppConfig;
}

/* 缓存主题配置 */
const localAppConfig = Storage.getLocal<LocalAppConfig>(StorageEnum.APP_CONFIG) || {};

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    appConfig: {
      ...defAppConfig,
      ...localAppConfig,
    },
  }),
  getters: {
    getAppConfig(): LocalAppConfig {
      return this.appConfig;
    },
  },
  actions: {
    /* APP 配置 */
    setTheme(theme: Partial<LocalAppConfig>) {
      Object.keys(theme).map((key) => {
        this.appConfig[key] = theme[key];
      });
      Storage.setLocal(StorageEnum.APP_CONFIG, this.appConfig);
    },
  },
});

export function useAppStoreWithOut() {
  return useAppStore(store);
}
