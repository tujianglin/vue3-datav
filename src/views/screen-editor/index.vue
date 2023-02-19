<script lang="tsx">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Spin } from 'ant-design-vue';
  import { useEditorStore } from '/@/store/modules/editor';
  import { useToolbarStore } from '/@/store/modules/toolbar';
  import { useComStore } from '/@/store/modules/com';
  import CanvasMain from './components/CanvasMain/index.vue';
  import Header from './components/Header/index.vue';
  import LayerPanel from './components/LayerPanel/index.vue';
  import ContextMenu from './components/ContextMenu/index.vue';
  import Footer from './components/Footer/index.vue';
  import ToolboxPanel from './components/ToolboxPanel/index.vue';
  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      const toolbarStroe = useToolbarStore();
      const comStore = useComStore();
      const loading = ref(true);
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
            <div class="g-layout edit-main">
              <ToolboxPanel></ToolboxPanel>
              <Spin spinning={loading.value}>
                <CanvasMain></CanvasMain>
              </Spin>
              <Footer></Footer>
            </div>
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
