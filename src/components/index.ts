import type { App } from 'vue';
import DatavWrapper from './_internal/datav-wrapper.vue';

const install = (app: App): void => {
  app.component('DatavWrapper', DatavWrapper);
};

export default {
  install,
};
