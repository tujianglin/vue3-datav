<script lang="tsx">
  import { defineAsyncComponent, defineComponent, onMounted, ref } from 'vue';
  import { Spin } from 'ant-design-vue';
  import { useEditorStore } from '/@/store/modules/editor';
  import { useToolbarStore } from '/@/store/modules/toolbar';
  import { useComStore } from '/@/store/modules/com';

  const CanvasMain = defineAsyncComponent(() => import('./components/CanvasMain/index.vue'));
  const Header = defineAsyncComponent(() => import('./components/Header/index.vue'));
  const LayerPanel = defineAsyncComponent(() => import('./components/LayerPanel/index.vue'));
  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      const toolbarStroe = useToolbarStore();
      const comStore = useComStore();
      const loading = ref(false);
      onMounted(async () => {
        comStore.request(1);
        editorStore.autoCanvasScale(() => toolbarStroe.getPanelOffset);
      });
      return () => (
        <div class="g-layout is-vertical edit-container">
          <div class="g-header">
            <Header></Header>
          </div>
          <div id="edit-main-wp" class="g-layout edit-main-wp">
            <LayerPanel></LayerPanel>
            <div class="g-layout edit-main">
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
  .edit-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .edit-main-wp {
    position: relative;
    z-index: 1;
    height: 100%;
    overflow: hidden;
    background: url('/images/bg-canvas.png');
    flex-wrap: nowrap;
  }

  .edit-main {
    position: relative;
    z-index: 2;
    height: 100%;
    overflow: hidden;
    flex-direction: column;
  }
</style>
