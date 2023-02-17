<script lang="tsx">
  import { computed, defineComponent, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import Icon from '/@/components/Icon';
  import ComList from './components/ComList.vue';
  import ComItem from './components/ComItem.vue';
  import { DatavComponent } from '/@/api/models/component';
  import { macMetaOrCtrl } from '/@/utils';
  import { PanelType, useToolbarStore } from '/@/store/modules/toolbar';
  import { useComStore } from '/@/store/modules/com';
  import { MoveType } from '/@/api/models/editor';
  import { useContextMenu } from '../ContextMenu/index';
  export default defineComponent({
    setup() {
      const toolbarStore = useToolbarStore();
      const comStore = useComStore();
      const {
        moveCom,
        isLocked,
        isHided,
        disableGroup,
        lockCom,
        hideCom,
        confirmDeleteCom,
        composeComs,
      } = useContextMenu();
      const { layer } = storeToRefs(toolbarStore);
      const showText = ref(false);

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
                  default: ({ com, level }) => (
                    <ComItem
                      com={com}
                      level={level}
                      showText={showText.value}
                      class={{ selected: com.selected }}
                      onMouseup={(e) => selectCom(e, com)}
                    ></ComItem>
                  ),
                }}
              ></ComList>
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
