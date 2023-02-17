import { assign } from 'lodash-es';
import { defineStore } from 'pinia';
import { StorageEnum } from '/@/enums/storageEnum';
import { Storage } from '/@/utils/storage';

export enum PanelType {
  layer = 'layer',
  components = 'components',
  config = 'config',
  toolbox = 'toolbox',
}

/* 获取面板数据 */
function getPanelState(key: PanelType) {
  const val = Storage.getLocal(StorageEnum.PANEL_STATE);
  return val?.[key] || false;
}

/* 设置面板数据 */
function setPanelState(key: PanelType, value: boolean) {
  const val = Storage.getLocal(StorageEnum.PANEL_STATE);
  Storage.setLocal(
    StorageEnum.PANEL_STATE,
    assign(val, {
      [key]: value,
    }),
  );
}

export const useToolbarStore = defineStore('toolbar', {
  state: () => ({
    layer: {
      show: getPanelState(PanelType.layer),
    },
    components: {
      show: getPanelState(PanelType.components),
    },
    config: {
      show: getPanelState(PanelType.config),
    },
    toolbox: {
      show: getPanelState(PanelType.toolbox),
    },
  }),
  getters: {
    /* 刻度尺偏移 */
    getPanelOffset(state) {
      let x = 0;
      let y = 41;
      let left = 60;
      let top = 100;
      if (state.layer.show) {
        x += 200;
        left += 200;
      }
      if (state.components.show) {
        x += 324;
        left += 324;
      } else {
        x += 45;
        left += 45;
      }
      if (state.config.show) {
        x += 332;
      }
      if (state.toolbox.show) {
        y += 40;
        top += 40;
      }
      return {
        x,
        y,
        left,
        top,
      };
    },
  },
  actions: {
    setPanelState(type: PanelType, value: boolean) {
      switch (type) {
        case PanelType.layer:
          this.layer.show = value;
          break;
        case PanelType.components:
          this.components.show = value;
          break;
        case PanelType.config:
          this.config.show = value;
          break;
        case PanelType.toolbox:
          this.toolbox.show = value;
          break;
        default:
          break;
      }
      setPanelState(type, value);
    },
  },
});
