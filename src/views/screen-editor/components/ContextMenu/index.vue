<script lang="tsx">
  import { computed, defineComponent } from 'vue';
  import { useContextMenu } from './index';
  import { useEditorStore } from '/@/store/modules/editor';
  import Icon from '/@/components/global/Icon';
  import { MoveType } from '/@/components/_editor';
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
            <Icon class="mr-1" size={12} icon="mdi:arrow-collapse-up"></Icon>
            置顶
          </div>
          <div class="context-menu-item" onClick={() => moveCom(MoveType.top)}>
            <Icon class="mr-1" size={12} icon="mdi:arrow-collapse-down"></Icon>
            置底
          </div>
          <div class="context-menu-item" onClick={() => moveCom(MoveType.down)}>
            <Icon class="mr-1" size={12} icon="material-symbols:text-select-move-up"></Icon>
            上移一层
          </div>
          <div class="context-menu-item" onClick={() => moveCom(MoveType.up)}>
            <Icon class="mr-1" size={12} icon="material-symbols:text-select-move-down"></Icon>
            下移一层
          </div>
          <div class="context-menu-divider"></div>
          <div
            class={['context-menu-item', { disable: disableGroup.value }]}
            onClick={() => composeComs()}
          >
            <Icon class="mr-1" size={12} icon="mdi:folder"></Icon>
            成组
          </div>
          <div
            class={['context-menu-item', { disable: !isGroup.value }]}
            onClick={() => decomposeComs()}
          >
            <Icon class="mr-1" size={12} icon="mdi:folder-remove-outline"></Icon>
            取消成组
          </div>
          <div class="context-menu-divider"></div>
          <div class="context-menu-item" onClick={() => lockCom()}>
            {isLocked.value ? (
              <>
                <Icon class="mr-1" size={12} icon="ant-design:unlock-outlined"></Icon>
                解锁
              </>
            ) : (
              <>
                <Icon class="mr-1" size={12} icon="ant-design:lock-outlined"></Icon>
                锁定
              </>
            )}
          </div>
          <div class="context-menu-item" onClick={() => hideCom()}>
            {isHided.value ? (
              <>
                <Icon class="mr-1" size={12} icon="ant-design:eye-outlined"></Icon>
                显示
              </>
            ) : (
              <>
                <Icon class="mr-1" size={12} icon="ant-design:eye-invisible-outlined"></Icon>
                隐藏
              </>
            )}
          </div>
          <div class="context-menu-divider"></div>
          <div class="context-menu-item" onClick={() => renameCom()}>
            <Icon class="mr-1" size={12} icon="ant-design:edit-outlined"></Icon>
            重命名
          </div>
          <div class="context-menu-item" onClick={() => copyCom()}>
            <Icon class="mr-1" size={12} icon="ant-design:copy-outlined"></Icon>
            复制
          </div>
          <div class="context-menu-item" onClick={() => confirmDeleteCom()}>
            <Icon class="mr-1" size={12} icon="ant-design:delete-outlined"></Icon>
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
