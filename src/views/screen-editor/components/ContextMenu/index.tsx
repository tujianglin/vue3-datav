import { reactive, computed } from 'vue';
import { useEditorStore } from '/@/store/modules/editor';
import { Modal } from 'ant-design-vue';
import { useComStore } from '/@/store/modules/com';
import { on, off } from '/@/utils/dom';
import { DatavComponent, ComType } from '/@/components/_models/datav-component';
import { MoveType } from '/@/components/_editor';
import { WarningOutlined } from '@ant-design/icons-vue';
const pos = reactive({ x: 0, y: 0 });

export const useContextMenu = () => {
  const comStore = useComStore();
  const editorStore = useEditorStore();
  const isLocked = computed(() => comStore.selectedComs.every((i) => i.locked));
  const isHided = computed(() => comStore.selectedComs.every((i) => i.hided));
  const isGroup = computed(() => comStore.selectedComs.every((i) => i.type === ComType.layer));
  /* 是否成组 */
  const disableGroup = computed(() => {
    const coms = comStore.selectedComs;
    const pid = coms[0]?.parentId;
    if (pid) {
      // 判断是否是子组
      if (coms.some((i) => i.type === ComType.layer)) {
        return true;
      }
      // 查找一级列表，判断父级是一级还是二级
      return !comStore.coms.find((i) => i.id === pid);
    }
    // 全是一级时，判断是否有子组
    return coms.some((i) => i.children?.some((j) => j.type === ComType.layer));
  });
  /* 确认删除组件 */
  const confirmDeleteCom = () => {
    const coms = comStore.selectedComs;
    if (coms.length === 0) return;
    const names = coms.map((i) => i.alias);
    Modal.confirm({
      centered: true,
      closable: true,
      maskClosable: true,
      icon: () => (
        <div class="flex justify-center">
          <WarningOutlined class="text-6xl text-[#ff4f43]"></WarningOutlined>
        </div>
      ),
      content: `删除后可能无法恢复，是否删除${names.join(',')}，共${names.length}个组件`,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        comStore.deletes(coms);
      },
    });
  };
  /* 成组 */
  const composeComs = () => {
    const coms = comStore.selectedComs;
    if (coms.length === 0) return;
    comStore.createGroup();
  };
  /* 取消成组 */
  const decomposeComs = () => {
    const coms = comStore.selectedComs;
    if (coms.length === 0) return;
    comStore.cancelGroup();
  };
  /* 移动组件 */
  const moveCom = (moveType: MoveType) => {
    const coms = comStore.selectedComs;
    if (coms.length === 0) return;
    const pid = coms[0].parentId;
    const ids = coms.map((m) => m.id);
    if (moveType === MoveType.top || moveType === MoveType.down) {
      ids.reverse();
    }
    ids.forEach((id) => {
      comStore.move(moveType, id, pid as string);
    });
  };
  /* 锁定组件 */
  const lockCom = () => {
    const coms = comStore.selectedComs;
    if (coms.length === 0) return;
    const locked = !isLocked.value;
    coms.forEach((com) => {
      com.locked = locked;
    });
  };
  /* 隐藏组件 */
  const hideCom = () => {
    const coms = comStore.selectedComs;
    if (coms.length === 0) return;
    const hided = !isHided.value;
    coms.forEach((com) => {
      com.hided = hided;
    });
  };
  /* 右击显示操作菜单 */
  const showMenu = (e: MouseEvent, com: DatavComponent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!com.selected) return;
    pos.x = e.clientX;
    pos.y = e.clientY;
    editorStore.contextMenu.show = true;
    on(document, 'click', hideMenu);
  };
  /* 隐藏操作菜单 */
  const hideMenu = () => {
    off(document, 'click', hideMenu);
    editorStore.contextMenu.show = false;
  };
  /* 重命名 */
  const renameCom = () => {
    comStore.selectedComs[0].renameing = true;
  };
  /* 复制组件 */
  const copyCom = () => {
    comStore.selectedComs.forEach((com: DatavComponent) => {
      comStore.copy(com.id);
    });
  };
  return {
    pos,
    isLocked,
    isHided,
    isGroup,
    disableGroup,
    showMenu,
    hideMenu,
    moveCom,
    lockCom,
    hideCom,
    confirmDeleteCom,
    renameCom,
    copyCom,
    composeComs,
    decomposeComs,
  };
};
