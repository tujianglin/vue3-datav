import { debounce } from 'lodash-es';
import { defineStore } from 'pinia';
import { PageConfig } from '/@/api/models/editor';

export interface IEditorState {
  pageConfig: PageConfig;
  canvas: {
    scale: number;
    width: number;
    height: number;
  };
  guideLine: {
    h: number[];
    v: number[];
  };
  contextMenu: {
    show: boolean;
  };
}
export const useEditorStore = defineStore('editor', {
  state: (): IEditorState => ({
    pageConfig: {
      width: 1920,
      height: 1080,
      bgimage: '//files.pengxiaotian.com/datav/bj.png',
      bgcolor: 'rgba(13,42,67,0)',
      grid: 8,
      screenshot: '',
      zoomMode: 1,
      useWatermark: true,
      styleFilterParams: {
        enable: false,
        hue: 0,
        saturate: 100,
        brightness: 100,
        contrast: 100,
        opacity: 100,
      },
    },
    canvas: {
      scale: 0.2,
      width: 1920,
      height: 1080,
    },
    guideLine: {
      h: [],
      v: [],
    },
    contextMenu: {
      show: false,
    },
  }),
  actions: {
    async autoCanvasScale(offset: () => { x: number; y: number }) {
      const resize = debounce(() => {
        const { x, y } = offset();
        const width = document.documentElement.clientWidth - x;
        const height = document.documentElement.clientHeight - y;
        const a = (width - 180) / this.pageConfig.width;
        const b = (height - 200) / this.pageConfig.height;
        const scale = parseFloat((a > b ? b : a).toFixed(6)) * 100;
        this.setCanvasScale(scale, x, y);
      }, 200);

      window.onresize = resize;

      resize();
    },
    async setCanvasScale(scale: number, offsetX: number, offsetY: number) {
      // 减去滚动条 4px
      let width = document.documentElement.clientWidth - offsetX - 4;
      let height = document.documentElement.clientHeight - offsetY - 4;
      const deltaS = Math.min(Math.max(scale, 10), 200) / 100;
      // 方便计算滚动条 和 标尺
      const deltaW = this.pageConfig.width * deltaS;
      const deltaH = this.pageConfig.height * deltaS;
      if (width < deltaW) {
        width = deltaW + 400;
      }
      if (height < deltaH) {
        height = deltaH + 390;
      }
      this.canvas = { scale: deltaS, width, height };
    },
  },
});
