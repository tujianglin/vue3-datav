<script lang="tsx">
  import { storeToRefs } from 'pinia';
  import { computed, CSSProperties, defineAsyncComponent, defineComponent } from 'vue';
  import { useEditorStore } from '/@/store/modules/editor';
  const Ruler = defineAsyncComponent(() => import('./components/Ruler/index.vue'));
  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      const { pageConfig, canvas } = storeToRefs(editorStore);
      const canvasPanelStyle = computed(() => {
        return {
          width: `${pageConfig.value.width}px`,
          height: `${pageConfig.value.height}px`,
          transform: `scale(${canvas.value.scale}) translate(0px, 0px)`,
          backgroundImage: `url(${pageConfig.value.bgimage})`,
          backgroundColor: pageConfig.value.bgcolor,
        } as CSSProperties;
      });
      return () => (
        <div class="canvas-main">
          <div id="canvas-wp" class="canvas-panel-wrap">
            <div id="canvas-coms" class="canvas-panel" style={canvasPanelStyle.value}></div>
            <Ruler></Ruler>
          </div>
        </div>
      );
    },
  });
</script>
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
