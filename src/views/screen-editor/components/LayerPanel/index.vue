<script lang="tsx">
  import { computed, defineComponent, ref, withModifiers } from 'vue';
  import { storeToRefs } from 'pinia';
  import Icon from '/@/components/Icon';
  import ComList from './components/ComList.vue';
  import ComItem from './components/ComItem.vue';
  import { DatavComponent } from '/@/api/models/component';
  import { macMetaOrCtrl } from '/@/utils';
  import { PanelType, useToolbarStore } from '/@/store/modules/toolbar';
  import { useComStore } from '/@/store/modules/com';
  import { useEditorStore } from '/@/store/modules/editor';
  import { MoveType } from '/@/api/models/editor';
  import { useContextMenu } from '../ContextMenu/index';
  export default defineComponent({
    setup() {
      const toolbarStore = useToolbarStore();
      const comStore = useComStore();
      const editorStore = useEditorStore();
      const {
        isLocked,
        isHided,
        disableGroup,
        moveCom,
        lockCom,
        hideCom,
        confirmDeleteCom,
        composeComs,
      } = useContextMenu();
      const { layer } = storeToRefs(toolbarStore);
      const showText = ref(false);
      const isDraging = ref(false);
      const dragInfo = ref({
        visible: false,
        x: 0,
        y: 0,
        toLevel: 0,
        toIndex: 0,
        toCom: null,
        drop: false,
      });
      /* 选中组件之后操作按钮交互 */
      const enableBtn = computed(() => comStore.selectedComs.length > 0);
      const enableBtnClass = computed(() => ({
        enable: enableBtn.value,
      }));
      const enableLockBtnClass = computed(() => ({
        enable: enableBtn.value,
        checked: isLocked.value,
      }));
      const enableHideBtnClass = computed(() => ({
        enable: enableBtn.value,
        checked: isHided.value,
      }));
      const enableGroupBtnClass = computed(() => ({
        enable: enableBtn.value && !disableGroup.value,
      }));

      /* 选中组件 */
      const selectCom = (e: MouseEvent, com: DatavComponent) => {
        const isMult = macMetaOrCtrl(e);
        if (e.shiftKey && !isMult) {
          comStore.selects(com);
        } else if (
          !com.selected ||
          (e.button === 0 && (isMult || comStore.selectedComs.length > 1))
        ) {
          comStore.select(com.id, com.parentId, isMult);
        }
      };
      /* 开始拖拽 */
      const onDragstart = (e: DragEvent, com: DatavComponent) => {
        if (editorStore.contextMenu.show || com.renameing) {
          e.preventDefault();
          return false;
        }
        isDraging.value = true;
        if (com.selected) {
          const nodewp = document.querySelector('.draging-wrap') as HTMLElement;
          nodewp.innerHTML = '';
          const nodes = document.querySelectorAll('.layer-manager-wrap .selected');
          nodes.forEach((i) => {
            nodewp.appendChild(i.cloneNode(true));
          });
          e.dataTransfer?.setDragImage(nodewp, 0, 1);
        } else {
          comStore.select(com.id, com.parentId);
        }
      };
      /* 拖拽结束 */
      const onDragend = () => {
        isDraging.value = false;
        dragInfo.value.visible = false;
        dragInfo.value.drop = false;
        const info = dragInfo.value;
        comStore.moveTo(info.toLevel, info.toIndex, info.toCom as unknown as DatavComponent);
        const nodewp = document.querySelector('.draging-wrap');
        (nodewp as HTMLElement).innerHTML = '';
      };
      /* 拖拽放下 */
      const onDragenter = (e: DragEvent, idx: number, level: number, com: DatavComponent) => {
        if (dragInfo.value.drop) return;
        const h = 48;
        const top = e.clientY - 104;
        const isHalf = top % h > 24;
        const i = isHalf ? Math.ceil(top / h) : Math.floor(top / h);
        dragInfo.value.visible = true;
        dragInfo.value.y = (i < 0 ? 0 : i) * h;
        dragInfo.value.x = level * 10;
        dragInfo.value.toLevel = level;
        dragInfo.value.toIndex = isHalf ? idx + 1 : idx;
        dragInfo.value.toCom = com as DatavComponent | any;
      };
      const onDragover = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        (e.dataTransfer as any).dropEffect = 'copy';
      };
      const onDragGroup = (data: any) => {
        if (data.key === 'enter') {
          dragInfo.value.visible = false;
          dragInfo.value.drop = true;
        } else if (data.key === 'leave') {
          dragInfo.value.visible = true;
          dragInfo.value.drop = false;
        } else {
          dragInfo.value.toLevel = data.level;
          dragInfo.value.toIndex = 0;
          dragInfo.value.toCom = data.com;
        }
      };
      return () => (
        <div class={['g-aside', 'layer-panel-wp', { '--hide': !layer.value.show }]}>
          <div class="layer-manager">
            <div class="layer-manager-top">
              <div class="layer-num">图层</div>
              <div class="layer-layout">
                <span
                  title="缩略版图"
                  class={['btn-icon', { selected: !showText.value }]}
                  onClick={() => (showText.value = false)}
                >
                  <Icon icon="ic:baseline-grid-view"></Icon>
                </span>
                <span
                  title="文字版"
                  class={['btn-icon', { selected: showText.value }]}
                  onClick={() => (showText.value = true)}
                >
                  <Icon icon="ph:list-bold"></Icon>
                </span>
                <span
                  title="收起"
                  class={['btn-icon']}
                  onClick={() => toolbarStore.setPanelState(PanelType.layer, false)}
                >
                  <Icon icon="ant-design:left-outlined"></Icon>
                </span>
              </div>
            </div>
            <div class="layer-toolbar layer-toolbar-top">
              <span
                title="上移一层"
                class={['toolbar-icon', 'standard', enableBtnClass.value]}
                onClick={() => moveCom(MoveType.down)}
              >
                <Icon icon="material-symbols:text-select-move-up"></Icon>
              </span>
              <span
                title="下移一层"
                class={['toolbar-icon', 'standard', enableBtnClass.value]}
                onClick={() => moveCom(MoveType.up)}
              >
                <Icon icon="material-symbols:text-select-move-down"></Icon>
              </span>
              <span
                title="置顶"
                class={['toolbar-icon', 'standard', enableBtnClass.value]}
                onClick={() => moveCom(MoveType.bottom)}
              >
                <Icon icon="mdi:arrow-collapse-up"></Icon>
              </span>
              <span
                title="置底"
                class={['toolbar-icon', 'standard', enableBtnClass.value]}
                onClick={() => moveCom(MoveType.top)}
              >
                <Icon icon="mdi:arrow-collapse-down"></Icon>
              </span>
            </div>
            <div class="layer-manager-wrap">
              <ComList
                v-slots={{
                  default: ({ com, idx, level }) => (
                    <ComItem
                      com={com}
                      level={level}
                      showText={showText.value}
                      class={{ selected: com.selected && !isDraging.value }}
                      onMouseup={(e) => selectCom(e, com)}
                      onDragstart={(e) => onDragstart(e, com)}
                      onDragend={onDragend}
                      onDragenter={withModifiers((e) => onDragenter(e, idx, level, com), ['self'])}
                      onDragover={onDragover}
                      onDragGroup={onDragGroup}
                    ></ComItem>
                  ),
                }}
              ></ComList>
              <div class="last-flex-item" onClick={() => comStore.select('')}></div>
              {dragInfo.value.visible && (
                <div
                  class={['layer-move-to-line']}
                  style={{
                    width: `calc(100% - ${dragInfo.value.x}px)`,
                    transform: `translate(${dragInfo.value.x}px, ${dragInfo.value.y}px)`,
                  }}
                ></div>
              )}
              <div class="draging-wrap"></div>
            </div>
            <div class="layer-toolbar layer-toolbar-bottom">
              <span
                title="成组"
                class={['toolbar-icon', 'standard', enableGroupBtnClass.value]}
                onClick={composeComs}
              >
                <Icon icon="ant-design:folder-filled"></Icon>
              </span>
              <span
                title="删除"
                class={['toolbar-icon', 'standard', enableBtnClass.value]}
                onClick={confirmDeleteCom}
              >
                <Icon icon="ant-design:delete-outlined"></Icon>
              </span>
              <span
                title="锁定"
                class={['toolbar-icon', 'standard', enableLockBtnClass.value]}
                onClick={lockCom}
              >
                <Icon icon="ant-design:lock-outlined"></Icon>
              </span>
              <span
                title="隐藏"
                class={['toolbar-icon', 'standard', enableHideBtnClass.value]}
                onClick={hideCom}
              >
                <Icon icon="ant-design:eye-invisible-outlined"></Icon>
              </span>
            </div>
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
