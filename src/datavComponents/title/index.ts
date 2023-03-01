import type { App } from 'vue';
import type { SFCWithInstall } from '/@/utils/types';
import VTitle from './src/index.vue';
import { loadAsyncComponent } from '/@/utils';

VTitle.install = (app: App) => {
  app.component('VTitle', VTitle);
  app.component(
    'VTitleProp',
    loadAsyncComponent(() => import('./src/config.vue')),
  );
};

export default VTitle as SFCWithInstall<typeof VTitle>;
