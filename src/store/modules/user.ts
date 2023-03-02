import { defineStore } from 'pinia';
import { login } from '/@/api/user';
import { StorageEnum } from '/@/enums/storageEnum';
import { Storage } from '/@/utils/storage';
import { router } from '/@/router';
export interface IUserState {
  token?: string;
}

export const useUserStore = defineStore('user', {
  state: (): IUserState => ({
    token: undefined,
  }),
  actions: {
    /* 登录 */
    async login(params) {
      const res = await login(params);
      Storage.setLocal(StorageEnum.TOKEN_KEY, res.access_token);
      Storage.setLocal(StorageEnum.REFRESH_TOKEN, res.refresh_token);
      router.push('/project');
    },
    isLogin() {
      const token = Storage.getLocal(StorageEnum.TOKEN_KEY);
      return !!token;
    },
  },
});
