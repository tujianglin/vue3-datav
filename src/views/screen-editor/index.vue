<script lang="tsx">
  import { defineAsyncComponent, defineComponent, onMounted, ref } from 'vue';
  import { Spin } from 'ant-design-vue';
  import { useEditorStore } from '/@/store/modules/editor';
  const CanvasMain = defineAsyncComponent(() => import('./components/CanvasMain/index.vue'));
  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      const loading = ref(false);
      onMounted(() => {
        editorStore.autoCanvasScale(() => {
          return {
            x: 0,
            y: 41,
            left: 60,
            top: 100,
          };
        });
      });
      return () => (
        <div class="editor-layout">
          <div class="editor-layout_header"></div>
          <div class="editor-layout_main">
            <div>
              <Spin spinning={loading.value}>
                <CanvasMain></CanvasMain>
              </Spin>
            </div>
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  .editor-layout {
    position: relative;
    width: 100%;
    height: 100%;
    &_main {
      position: relative;
      z-index: 1;
      height: 100%;
      overflow: hidden;
      background: url('/images/bg-canvas.png');
      flex-wrap: nowrap;
    }
  }
</style>
