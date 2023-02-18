<script lang="tsx">
  import { computed, defineComponent, PropType, ref, toRefs } from 'vue';
  import { Input } from 'ant-design-vue';
  import { ComType, DatavComponent } from '/@/components/_models/datav-component';
  import { getChildState } from '/@/store/modules/com';
  import Icon from '/@/components/global/Icon';
  import { useContextMenu } from '../../ContextMenu';
  export default defineComponent({
    props: {
      com: Object as PropType<DatavComponent>,
      level: {
        type: Number,
        default: 0,
      },
      showText: Boolean,
    },
    emits: ['dragGroup'],
    setup(props, { emit }) {
      const { showMenu } = useContextMenu();
      const { com, showText, level } = toRefs(props);
      const dragGroupHover = ref(false);
      const childState = computed(() => getChildState(com.value as DatavComponent));

      /* 鼠标移入移出 */
      const toggleHover = (flag: boolean) => {
        (com.value as any).hovered = com.value?.selected ? false : flag;
      };

      /* 打开成组组件 */
      const toggleFold = (e: MouseEvent) => {
        e.stopPropagation();
        (com.value as any).fold = !(com.value as any).fold;
      };

      /* 重命名 */
      const toggleRename = (flag: boolean) => {
        (com.value as any).renameing = flag;
      };

      /* 隐藏 */
      const toggleHide = (flag: boolean) => {
        (com.value as any).hided = flag;
      };

      /* 锁定 */
      const toggleLock = (flag: boolean) => {
        (com.value as any).locked = flag;
      };

      const dragEnterGroup = () => {
        if (com.value?.type === ComType.layer) {
          dragGroupHover.value = true;
          emit('dragGroup', { key: 'enter' });
        }
      };

      const dragLeaveGroup = () => {
        if (com.value?.type === ComType.layer) {
          dragGroupHover.value = false;
          emit('dragGroup', { key: 'leave' });
        }
      };

      const dropGroup = () => {
        if (com.value?.type === ComType.layer) {
          dragGroupHover.value = false;
          emit('dragGroup', {
            key: 'drop',
            level: level.value + 1,
            com: com.value?.children?.[0],
          });
        }
      };

      return () => (
        <div
          title={com.value?.alias}
          class={[
            'layer-manager-item',
            { 'layer-manager-com': com.value?.type === ComType.com },
            { 'layer-manager-group': com.value?.type === ComType.layer },
            { 'layer-manager-thumbail-wrap': !showText.value },
            { '--child-selected': childState.value.selected },
            { '--child-hovered': childState.value.hovered || dragGroupHover.value },
            { hided: com.value?.hided },
            { locked: com.value?.locked },
            { hovered: com.value?.hovered },
          ]}
          style={{ 'padding-left': `${6 + level.value * 10}px` }}
          draggable
          onMouseenter={() => toggleHover(true)}
          onMouseleave={() => toggleHover(false)}
          onContextmenu={(e) => showMenu(e, com.value as DatavComponent)}
        >
          {com.value?.type === ComType.layer && (
            <>
              <span class={['fold-toggle-btn', { 'icon-fold': com.value.fold }]}>
                <Icon icon="ant-design:right-outlined"></Icon>
              </span>
              <span class={['layer-item-icon']}>
                <Icon icon="ant-design:folder-filled"></Icon>
              </span>
            </>
          )}
          {showText.value ? (
            <>
              <span class="layer-item-span truncate">
                {com.value?.renameing ? (
                  <Input
                    v-focus
                    v-model:value={com.value.alias}
                    class="layer-item-input"
                    onBlur={() => toggleRename(false)}
                    onKeydown={(e: KeyboardEvent) => e.code === 'Enter' && toggleRename(false)}
                  ></Input>
                ) : (
                  <span class="layer-item-text" onDblclick={() => toggleRename(true)}>
                    {com.value?.alias}
                  </span>
                )}
              </span>
              {com.value?.hided && (
                <span
                  class="show-toggle-btn inline-flex items-center"
                  onClick={() => toggleHide(false)}
                >
                  <Icon icon="ant-design:eye-invisible-outlined"></Icon>
                </span>
              )}
              {com.value?.locked && (
                <span
                  class="show-toggle-btn inline-flex items-center"
                  onClick={() => toggleLock(false)}
                >
                  <Icon icon="ant-design:lock-outlined"></Icon>
                </span>
              )}
            </>
          ) : (
            <>
              <div>
                {com.value?.type === ComType.com && (
                  <div
                    class="layer-item-thumbail"
                    style={{ 'background-image': `url(${com.value.img})` }}
                  ></div>
                )}
              </div>
              <div class="layer-manager-thumbail">
                {com.value?.renameing ? (
                  <Input
                    v-focus
                    v-model:value={com.value.alias}
                    class="layer-item-input"
                    onBlur={() => toggleRename(false)}
                    onKeydown={(e: KeyboardEvent) => e.code === 'Enter' && toggleRename(false)}
                  ></Input>
                ) : (
                  <span
                    class="layer-item-span"
                    onDragenter={dragEnterGroup}
                    onDragleave={dragLeaveGroup}
                    onDrop={dropGroup}
                  >
                    <span class="layer-item-text" onDblclick={() => toggleRename(true)}>
                      {com.value?.alias}
                    </span>
                  </span>
                )}
                <div class="layer-thumbail-item">
                  {com.value?.hided && (
                    <span
                      class="show-toggle-btn inline-flex items-center"
                      onClick={() => toggleHide(false)}
                    >
                      <Icon icon="ant-design:eye-invisible-outlined"></Icon>
                    </span>
                  )}
                  {com.value?.locked && (
                    <span
                      class="show-toggle-btn inline-flex items-center"
                      onClick={() => toggleLock(false)}
                    >
                      <Icon icon="ant-design:lock-outlined"></Icon>
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
          {com.value?.type === ComType.layer && (
            <div
              class="group-fold-controller"
              style={{
                width: `${level.value > 0 ? 50 : 40}px`,
                transform: `translateX(-${6 + level.value * 10}px)`,
              }}
              onMouseup={(e) => toggleFold(e)}
            ></div>
          )}
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
