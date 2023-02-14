import { defineStore } from 'pinia';
import { login } from '/@/api/user';
import { StorageEnum } from '/@/enums/storageEnum';
import { Storage } from '/@/utils/storage';
export const useUserStore = defineStore('user', {
  state: () => ({}),
  actions: {
    async login(params) {
      console.log(params);
      const res = await login(params);
      Storage.setLocal(StorageEnum.TOKEN_KEY, res);
    },
    isLogin() {
      const token = Storage.getLocal(StorageEnum.TOKEN_KEY);
      return !!token;
    },
  },
});
