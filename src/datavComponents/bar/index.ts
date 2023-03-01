import type { App } from 'vue';
import type { SFCWithInstall } from '/@/utils/types';
import VBar from './src/index.vue';
import VBarProp from './src/config.vue';

VBar.install = (app: App) => {
  app.component('VBar', VBar);
  app.component('VBarProp', VBarProp);
};

export default VBar as SFCWithInstall<typeof VBar>;
