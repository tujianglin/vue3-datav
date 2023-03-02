import { defineStore } from 'pinia';
import { login } from '/@/api/user';
import { StorageEnum } from '/@/enums/storageEnum';
import { Storage } from '/@/utils/storage';
import { router } from '/@/router';
export interface IUserState {
  token?: string;
  refresh_token?: string;
}

export const useUserStore = defineStore('user', {
  state: (): IUserState => ({
    token: Storage.getLocal(StorageEnum.TOKEN_KEY) || undefined,
    refresh_token: Storage.getLocal(StorageEnum.REFRESH_TOKEN) || undefined,
  }),
  getters: {
    isLogin(state) {
      return !!state.token;
    },
  },
  actions: {
    /* 登录 */
    async login(params) {
      const res = await login(params);
      this.token = res.access_token;
      this.refresh_token = res.refresh_token;
      Storage.setLocal(StorageEnum.TOKEN_KEY, res.access_token);
      Storage.setLocal(StorageEnum.REFRESH_TOKEN, res.refresh_token);
      router.push('/project');
    },
  },
});
