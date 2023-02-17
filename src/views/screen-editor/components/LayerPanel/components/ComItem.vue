<script lang="tsx">
  import { computed, defineComponent, PropType, toRaw } from 'vue';
  import { ComType, DatavComponent } from '/@/api/models/component';
  import { getChildState } from '/@/store/modules/com';
  export default defineComponent({
    props: {
      com: Object as PropType<DatavComponent>,
      level: {
        type: Number,
        default: 0,
      },
      showText: Boolean,
    },
    setup(props) {
      const { com, showText, level } = toRaw(props);
      const childState = computed(() => getChildState(com as DatavComponent));

      /* 鼠标移入移出 */
      const toggleHover = (flag: boolean) => {
        (com as any).hovered = com?.selected ? false : flag === true;
      };

      return () => (
        <div
          class={[
            'layer-manager-item',
            { 'layer-manager-com': com?.type === ComType.com },
            { 'layer-manager-group': com?.type === ComType.layer },
            { 'layer-manager-thumbail-wrap': !showText },
            { '--child-selected': childState.value.selected },
            { '--child-hovered': childState.value.hovered },
            { hided: com?.hided },
            { locked: com?.locked },
            { hovered: com?.hovered },
          ]}
          onMouseenter={() => toggleHover(true)}
          onMouseleave={() => toggleHover(false)}
          style={{ 'padding-left': `${6 + level * 10}px` }}
        >
          <div>
            {com?.type === ComType.com ? (
              <div
                class="layer-item-thumbail"
                style={{ 'background-image': `url(${com.img})` }}
              ></div>
            ) : (
              ''
            )}
          </div>
          <div class="layer-manager-thumbail">
            <span class="layer-item-span">
              <span class="layer-item-text">{com?.alias}</span>
            </span>
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
