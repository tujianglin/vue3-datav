<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Tooltip, Button } from 'ant-design-vue';
  import { PanelType, useToolbarStore } from '/@/store/modules/toolbar';
  import { useRouter } from 'vue-router';
  import Loading from './components/Loading.vue';
  import { DesktopOutlined, SendOutlined } from '@ant-design/icons-vue';
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
        <>
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
                      <i class="iconfont icon-layer-group"></i>
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
                      <i class="iconfont icon-box"></i>
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
                      <i class="iconfont icon-layout-left-panel-1"></i>
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
                      <i class="iconfont icon-toolbox-solid"></i>
                    </Button>
                  </Tooltip>
                </div>
                <div>工作空间</div>
                <div class="global-actions">
                  <Tooltip overlayClassName="tooltip-main" mouseEnterDelay={0.5} title="生成快照">
                    <Button class={['head-btn', 'mr-1']} type={'primary'} onClick={onSaveScreen}>
                      <i class="iconfont icon-camera"></i>
                    </Button>
                  </Tooltip>
                  <Tooltip overlayClassName="tooltip-main" mouseEnterDelay={0.5} title="发布">
                    <Button class={['head-btn', 'mr-1']} type={'primary'}>
                      <SendOutlined></SendOutlined>
                    </Button>
                  </Tooltip>
                  <Tooltip overlayClassName="tooltip-main" mouseEnterDelay={0.5} title="预览">
                    <Button class={['head-btn', 'mr-1']} type={'primary'} onClick={onPreview}>
                      <DesktopOutlined></DesktopOutlined>
                    </Button>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <Loading></Loading>
        </>
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
