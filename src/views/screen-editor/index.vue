<script lang="tsx">
  import { defineAsyncComponent, defineComponent, onMounted, ref } from 'vue';
  import { Spin } from 'ant-design-vue';
  import { useEditorStore } from '/@/store/modules/editor';
  import { useToolbarStore } from '/@/store/modules/toolbar';
  import { useComStore } from '/@/store/modules/com';
  import { loadAsyncComponent } from '/@/utils';
  import { useDebugStore } from '/@/store/modules/debug';
  // import { useFilterStore } from '/@/store/modules/filter';
  const Header = defineAsyncComponent(() => import('./components/Header/index.vue'));
  const ContextMenu = defineAsyncComponent(() => import('./components/ContextMenu/index.vue'));
  const Footer = defineAsyncComponent(() => import('./components/Footer/index.vue'));
  const ToolboxPanel = defineAsyncComponent(() => import('./components/ToolboxPanel/index.vue'));
  const CanvasMain = loadAsyncComponent(() => import('./components/CanvasMain/index.vue'));
  const LayerPanel = loadAsyncComponent(() => import('./components/LayerPanel/index.vue'));
  const ConfigPanel = loadAsyncComponent(() => import('./components/ConfigPanel/index.vue'));
  const ComponentPanel = loadAsyncComponent(() => import('./components/ComponentPanel/index.vue'));
  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      const toolbarStroe = useToolbarStore();
      // const filterStore = useFilterStore();
      const debugStore = useDebugStore();
      const comStore = useComStore();
      const loading = ref(true);

      debugStore.enable();
      editorStore.setEditMode();

      onMounted(async () => {
        await comStore.request();
        loading.value = false;
        editorStore.autoCanvasScale(() => toolbarStroe.getPanelOffset);
      });
      return () => (
        <div class="g-layout is-vertical edit-container">
          <div class="g-header">
            <Header></Header>
          </div>
          <div id="edit-main-wp" class="g-layout edit-main-wp">
            <LayerPanel></LayerPanel>
            <ComponentPanel></ComponentPanel>
            <div class="g-layout edit-main">
              <ToolboxPanel></ToolboxPanel>
              <Spin spinning={loading.value}>
                <CanvasMain></CanvasMain>
              </Spin>
              <Footer></Footer>
            </div>
            <ConfigPanel></ConfigPanel>
          </div>
          <ContextMenu></ContextMenu>
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
    font-size: 12px;
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
