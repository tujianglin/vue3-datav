import type { App } from 'vue';
import type { SFCWithInstall } from '/@/utils/types';
import VTitle from './src/index.vue';

VTitle.install = (app: App) => {
  app.component('VTitle', VTitle);
};

export default VTitle as SFCWithInstall<typeof VTitle>;
