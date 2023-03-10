import type { App } from 'vue';
import type { SFCWithInstall } from '/@/utils/types';
import VContainer from './src/index.vue';
import { loadAsyncComponent } from '/@/utils';

VContainer.install = (app: App) => {
  app.component('VContainer', VContainer);
  app.component(
    'VContainerProp',
    loadAsyncComponent(() => import('./src/config.vue')),
  );
};

export default VContainer as SFCWithInstall<typeof VContainer>;
