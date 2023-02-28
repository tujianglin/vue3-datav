<script lang="tsx">
  import { storeToRefs } from 'pinia';
  import { computed, CSSProperties, defineAsyncComponent, defineComponent, ref } from 'vue';
  import { useContextMenu } from '../ContextMenu';
  import { useComStore } from '/@/store/modules/com';
  import { useEditorStore } from '/@/store/modules/editor';
  import { checkRectIntersect } from '/@/utils/editor';
  import { on, off } from '/@/utils/dom';
  import { useToolbarStore } from '/@/store/modules/toolbar';
  import { createComponent } from '/@/datavComponents/datav';
  import { loadCom } from '/@/components/_utils/component-util';
  const Ruler = defineAsyncComponent(() => import('./components/Ruler/index.vue'));
  const Area = defineAsyncComponent(() => import('./components/Area/index.vue'));
  const AlignLine = defineAsyncComponent(() => import('./components/AlignLine/index.vue'));
  const DatavTransform = defineAsyncComponent(
    () => import('./components/DatavTransform/index.vue'),
  );
  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      const comStore = useComStore();
      const toolbarStore = useToolbarStore();
      const { coms } = storeToRefs(comStore);
      const { hideMenu } = useContextMenu();
      const { pageConfig, canvas } = storeToRefs(editorStore);
      const cancelable = ref(false);
      const selectionW = ref(0);
      const selectionH = ref(0);
      const areaStartX = ref(0);
      const areaStartY = ref(0);
      const areaWidth = ref(0);
      const areaHeight = ref(0);
      const offsetX = 60;
      const offsetY = 60;

      const screenShotStyle = computed(
        () =>
          ({
            width: `${canvas.value.width}px`,
            height: `${canvas.value.height}px`,
          } as CSSProperties),
      );
      /* 看板尺寸 */
      const canvasPanelStyle = computed(
        () =>
          ({
            width: `${pageConfig.value.width}px`,
            height: `${pageConfig.value.height}px`,
            transform: `scale(${canvas.value.scale}) translate(0px, 0px)`,
            backgroundImage: `url(${pageConfig.value.bgimage})`,
            backgroundColor: pageConfig.value.bgcolor,
          } as CSSProperties),
      );

      /* 清除框选中的组件 */
      const cancelSelected = () => {
        if (cancelable.value) {
          cancelable.value = false;
          comStore.select('');
        }
      };
      /* 去人清除 */
      const confirmCancel = (ev: MouseEvent) => {
        const dom = ev.target as HTMLElement;
        const cls = ['canvas-panel', 'screen-shot', 'canvas-panel-wrap'];
        if (cls.includes(dom.className)) {
          cancelable.value = true;
        } else {
          cancelable.value = false;
        }
      };

      /* 获取到框选中的组件 */
      const getSelectComs = () => {
        return coms.value.filter((com) => {
          if (com.locked || com.hided || !com.hovered) {
            com.selected = false;
            return false;
          }
          com.selected = true;
          return true;
        });
      };
      /* 框选区域 */
      const handleSelectArea = () => {
        const { scale } = canvas.value;
        // 区域起点坐标
        const sx = (areaStartX.value - offsetX) / scale; // left
        const sy = (areaStartY.value - offsetY) / scale; // top
        const sw = areaWidth.value / scale; // width
        const sh = areaHeight.value / scale; // height
        // 计算所有的组件数据，判断是否和选中区域相交
        coms.value.forEach((com) => {
          if (com.locked || com.hided) return;
          const { x, y, w, h } = com.attr;
          const rect1 = { x: sx, y: sy, w: sw, h: sh };
          const rect2 = { x, y, w, h };
          com.hovered = checkRectIntersect(rect1, rect2);
        });
      };
      /* 隐藏框选区域 */
      const hideArea = () => {
        areaWidth.value = 0;
        areaHeight.value = 0;
      };

      /* 鼠标按下的操作 */
      const handleMouseDown = (ev: MouseEvent) => {
        cancelable.value = true;
        if (editorStore.contextMenu.show) {
          cancelable.value = false;
          hideMenu();
          return false;
        }
        const screenWp = document.getElementById('screen-wp') as HTMLElement;
        selectionW.value = screenWp.clientWidth;
        selectionH.value = screenWp.clientHeight;
        // 获取编辑器的位移信息，每次点击时都需要获取一次。
        const rectInfo = screenWp.getBoundingClientRect();
        const currX = rectInfo.x;
        const currY = rectInfo.y;
        const sx = ev.clientX;
        const sy = ev.clientY;
        areaStartX.value = sx - currX;
        areaStartY.value = sy - currY;
        const move = (e: MouseEvent) => {
          if (e.clientX < sx) {
            areaStartX.value = e.clientX - currX;
          }
          if (e.clientY < sy) {
            areaStartY.value = e.clientY - currY;
          }
          areaWidth.value = Math.abs(e.clientX - sx);
          areaHeight.value = Math.abs(e.clientY - sy);
          handleSelectArea();
          cancelable.value = false;
        };
        const up = () => {
          off(document, 'mousemove', move);
          off(document, 'mouseup', up);

          hideArea();
          getSelectComs();

          if (cancelable.value) {
            confirmCancel(ev);
          }
        };
        on(document, 'mousemove', move);
        on(document, 'mouseup', up);
      };
      const dropToAddCom = async (ev: DragEvent) => {
        ev.preventDefault();
        try {
          const name = ev.dataTransfer.getData('text');
          if (name) {
            toolbarStore.addLoading();
            let com = await createComponent(name);
            const { scale } = canvas.value;
            const { left, top } = toolbarStore.getPanelOffset;
            const canvasWp = document.getElementById('canvas-wp');
            const scrollLeft = canvasWp?.scrollLeft || 0;
            const scrollTop = canvasWp?.scrollTop || 0;
            const offsetLeft = (scrollLeft + ev.clientX - left) / scale;
            const offsetTop = (scrollTop + ev.clientY - top) / scale;
            com.attr.x = Math.round(offsetLeft - com.attr.w / 2);
            com.attr.y = Math.round(offsetTop - com.attr.h / 2);
            await loadCom(com);
            toolbarStore.removeLoading();
          }
        } catch (error) {}
      };

      const dragOver = (ev: DragEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
        ev.dataTransfer.dropEffect = 'copy';
      };
      return () => (
        <div class="canvas-main">
          <div id="canvas-wp" class="canvas-panel-wrap" onClick={cancelSelected}>
            <div
              id="screen-wp"
              class="screen-shot"
              style={screenShotStyle.value}
              onMousedown={handleMouseDown}
            >
              <div
                id="canvas-coms"
                class="canvas-panel"
                style={canvasPanelStyle.value}
                onDragover={dragOver}
                onDrop={dropToAddCom}
              >
                {/* 组件回显 */}
                {coms.value.map((i) => (
                  <DatavTransform com={i}></DatavTransform>
                ))}
              </div>
              {/* 对齐线 */}
              <AlignLine></AlignLine>
              {/* 刻度尺 */}
              <Ruler></Ruler>
            </div>
            {/* 框选区域 */}
            {(areaWidth.value > 0 || areaHeight.value > 0) && (
              <Area
                startX={areaStartX.value}
                startY={areaStartY.value}
                width={areaWidth.value}
                height={areaHeight.value}
                style={{ width: `${selectionW.value}px`, height: `${selectionH.value}px` }}
              ></Area>
            )}
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less">
  .datav-com .datav-wraper,
  .datav-layer .datav-wraper {
    pointer-events: none !important;
  }

  .datav-wraper {
    box-sizing: border-box;
  }
</style>
<style lang="less" scoped>
  .canvas-main {
    height: 100%;

    .canvas-panel-wrap {
      position: relative;
      width: 100%;
      height: calc(100% - 32px);
      overflow: auto;

      .canvas-panel {
        position: absolute;
        top: 60px;
        left: 60px;
        background-position: center, right bottom;
        background-repeat: no-repeat, no-repeat;
        background-size: cover, contain;
        box-shadow: rgb(0 0 0 / 50%) 0 0 30px 0;
        transition: 0.2s all ease-in-out;
        transform-origin: 0 0;
      }
    }
  }
</style>
