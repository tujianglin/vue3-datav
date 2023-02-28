import type { App } from 'vue';
import type { SFCWithInstall } from '/@/utils/types';
import VTitle from './src/index.vue';
import VTitleProp from './src/config.vue';

VTitle.install = (app: App) => {
  app.component('VTitle', VTitle);
  app.component('VTitleProp', VTitleProp);
};

export default VTitle as SFCWithInstall<typeof VTitle>;
