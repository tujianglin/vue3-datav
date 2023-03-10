<script lang="tsx">
  import { computed, defineComponent } from 'vue';
  import { useContextMenu } from './index';
  import { useEditorStore } from '/@/store/modules/editor';
  import { MoveType } from '/@/components/_editor';
  import {
    LockOutlined,
    UnlockOutlined,
    EyeOutlined,
    EyeInvisibleOutlined,
    EditOutlined,
    CopyOutlined,
    DeleteOutlined,
    VerticalAlignTopOutlined,
    VerticalAlignBottomOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
  } from '@ant-design/icons-vue';
  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      const {
        pos,
        isLocked,
        isHided,
        isGroup,
        disableGroup,
        moveCom,
        lockCom,
        hideCom,
        confirmDeleteCom,
        renameCom,
        copyCom,
        composeComs,
        decomposeComs,
      } = useContextMenu();
      const contextMenuStyle = computed(() => ({
        display: editorStore.contextMenu.show ? 'block' : 'none',
        left: `${pos.x + 10}px`,
        top: `${pos.y + 10}px`,
        transform:
          document.documentElement.clientHeight - pos.y < 250 ? 'translate(0px, -100%)' : '',
      }));
      return () => (
        <div class="context-menu-wrap" style={contextMenuStyle.value}>
          <div class="context-menu-item" onClick={() => moveCom(MoveType.bottom)}>
            <VerticalAlignTopOutlined class="mr-1"></VerticalAlignTopOutlined>
            置顶
          </div>
          <div class="context-menu-item" onClick={() => moveCom(MoveType.top)}>
            <VerticalAlignBottomOutlined class="mr-1"></VerticalAlignBottomOutlined>
            置底
          </div>
          <div class="context-menu-item" onClick={() => moveCom(MoveType.down)}>
            <ArrowUpOutlined class="mr-1"></ArrowUpOutlined>
            上移一层
          </div>
          <div class="context-menu-item" onClick={() => moveCom(MoveType.up)}>
            <ArrowDownOutlined class="mr-1"></ArrowDownOutlined>
            下移一层
          </div>
          <div class="context-menu-divider"></div>
          <div
            class={['context-menu-item', { disable: disableGroup.value }]}
            onClick={() => composeComs()}
          >
            <i class="iconfont icon-folder text-xs mr-1"></i>
            成组
          </div>
          <div
            class={['context-menu-item', { disable: !isGroup.value }]}
            onClick={() => decomposeComs()}
          >
            <i class="iconfont icon-folder_delete text-xs mr-1"></i>
            取消成组
          </div>
          <div class="context-menu-divider"></div>
          <div class="context-menu-item" onClick={() => lockCom()}>
            {isLocked.value ? (
              <>
                <UnlockOutlined class="mr-1"></UnlockOutlined>
                解锁
              </>
            ) : (
              <>
                <LockOutlined class="mr-1"></LockOutlined>
                锁定
              </>
            )}
          </div>
          <div class="context-menu-item" onClick={() => hideCom()}>
            {isHided.value ? (
              <>
                <EyeOutlined class="mr-1"></EyeOutlined>
                显示
              </>
            ) : (
              <>
                <EyeInvisibleOutlined class="mr-1"></EyeInvisibleOutlined>
                隐藏
              </>
            )}
          </div>
          <div class="context-menu-divider"></div>
          <div class="context-menu-item" onClick={() => renameCom()}>
            <EditOutlined class="mr-1"></EditOutlined>
            重命名
          </div>
          <div class="context-menu-item" onClick={() => copyCom()}>
            <CopyOutlined class="mr-1"></CopyOutlined>
            复制
          </div>
          <div class="context-menu-item" onClick={() => confirmDeleteCom()}>
            <DeleteOutlined class="mr-1"></DeleteOutlined>
            删除
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
