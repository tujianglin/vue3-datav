import type { App } from 'vue';
import DatavWrapper from './_internal/datav-wrapper.vue';

import Title from './title';

const components = [Title];

const install = (app: App): void => {
  app.component('DatavWrapper', DatavWrapper);

  components.forEach((component) => {
    app.use(component);
  });
};

export default {
  install,
};
