import type { App } from 'vue';
import type { SFCWithInstall } from '/@/utils/types';
import Title from './src/index.vue';

Title.install = (app: App) => {
  app.component('Title', Title);
};

export default Title as SFCWithInstall<typeof Title>;
