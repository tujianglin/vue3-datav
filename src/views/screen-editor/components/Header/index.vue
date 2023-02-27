<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Tooltip, Button } from 'ant-design-vue';
  import Icon from '/@/components/global/Icon';
  import { PanelType, useToolbarStore } from '/@/store/modules/toolbar';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    setup() {
      const router = useRouter();
      const toolbarStore = useToolbarStore();
      /* 保存快照 */
      const onSaveScreen = () => {};
      /* 预览 */
      const onPreview = () => {
        router.push({
          name: 'Preview',
          params: {
            screenId: 1,
          },
        });
      };
      return () => (
        <div class="datav-header">
          <div class="datav-edit-header">
            <div class="editor-header-wp">
              <div class="editor-config">
                <Tooltip overlayClassName="tooltip-main" mouseEnterDelay={0.5} title="图层">
                  <Button
                    class={['head-btn', 'mr-1', { '--selected': toolbarStore.layer.show }]}
                    type={'primary'}
                    onClick={() =>
                      toolbarStore.setPanelState(PanelType.layer, !toolbarStore.layer.show)
                    }
                  >
                    <Icon icon="uil:layer-group"></Icon>
                  </Button>
                </Tooltip>
                <Tooltip overlayClassName="tooltip-main" mouseEnterDelay={0.5} title="组件列表">
                  <Button
                    class={['head-btn', 'mr-1', { '--selected': toolbarStore.components.show }]}
                    type={'primary'}
                    onClick={() =>
                      toolbarStore.setPanelState(
                        PanelType.components,
                        !toolbarStore.components.show,
                      )
                    }
                  >
                    <Icon icon="tabler:box"></Icon>
                  </Button>
                </Tooltip>
                <Tooltip overlayClassName="tooltip-main" mouseEnterDelay={0.5} title="右侧面板">
                  <Button
                    class={['head-btn', 'mr-1', { '--selected': toolbarStore.config.show }]}
                    type={'primary'}
                    onClick={() =>
                      toolbarStore.setPanelState(PanelType.config, !toolbarStore.config.show)
                    }
                  >
                    <Icon icon="carbon:open-panel-filled-right"></Icon>
                  </Button>
                </Tooltip>
                <Tooltip overlayClassName="tooltip-main" mouseEnterDelay={0.5} title="工具箱">
                  <Button
                    class={['head-btn', 'mr-1', { '--selected': toolbarStore.toolbox.show }]}
                    type={'primary'}
                    onClick={() =>
                      toolbarStore.setPanelState(PanelType.toolbox, !toolbarStore.toolbox.show)
                    }
                  >
                    <Icon icon="memory:toolbox"></Icon>
                  </Button>
                </Tooltip>
              </div>
              <div>工作空间</div>
              <div class="global-actions">
                <Tooltip overlayClassName="tooltip-main" mouseEnterDelay={0.5} title="生成快照">
                  <Button class={['head-btn', 'mr-1']} type={'primary'} onClick={onSaveScreen}>
                    <Icon icon="ic:outline-photo-camera"></Icon>
                  </Button>
                </Tooltip>
                <Tooltip overlayClassName="tooltip-main" mouseEnterDelay={0.5} title="发布">
                  <Button class={['head-btn', 'mr-1']} type={'primary'}>
                    <Icon icon="system-uicons:paper-plane"></Icon>
                  </Button>
                </Tooltip>
                <Tooltip overlayClassName="tooltip-main" mouseEnterDelay={0.5} title="预览">
                  <Button class={['head-btn', 'mr-1']} type={'primary'} onClick={onPreview}>
                    <Icon icon="heroicons:tv"></Icon>
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  .datav-header {
    position: relative;
    height: 40px;
    padding-right: 8px;
    display: flex;
    z-index: 100;
    align-items: center;
    user-select: none;
    color: #a1aeb3;
    border-bottom: 1px solid #000;
    background: #1d1e1f;
    padding: 0 12px;

    .datav-edit-header {
      width: 100%;

      .editor-header-wp {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .head-btn {
          width: 40px;
          height: 24px;
          padding: 4px 0;
          text-align: center;
          cursor: pointer;
          background: #303640;
          box-shadow: inset 0 0 0 1px rgb(255 235 235 / 10%), 0 0 0 1px #181818;
          transition: 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;

          &.--selected {
            background: var(--ant-primary-color);
          }
        }
        .global-actions {
          display: flex;
          align-items: center;
          transition: 0.3s ease;
        }
        .editor-config {
          display: flex;
          align-items: center;
          transition: 0.3s ease;
        }
      }
    }
  }
</style>
