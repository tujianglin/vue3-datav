import type { App } from 'vue';

const modules = import.meta.glob('./*/*.ts');

const install = (app: App): void => {
  Object.values(modules).map(async (componet) => {
    const addCom: any = await componet();
    addCom.default.install(app);
  });
};

export default {
  install,
};
