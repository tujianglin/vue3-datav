<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { PanelType, useToolbarStore } from '/@/store/modules/toolbar';
  import Icon from '/@/components/Icon';
  export default defineComponent({
    setup() {
      const toolbarStore = useToolbarStore();
      const { layer } = storeToRefs(toolbarStore);
      const showText = ref(false);

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
              <span title="上移一层" class="toolbar-icon standard">
                <Icon icon="material-symbols:text-select-move-up"></Icon>
              </span>
              <span title="下移一层" class="toolbar-icon standard">
                <Icon icon="material-symbols:text-select-move-down"></Icon>
              </span>
              <span title="置顶" class="toolbar-icon standard">
                <Icon icon="mdi:arrow-collapse-up"></Icon>
              </span>
              <span title="置底" class="toolbar-icon standard">
                <Icon icon="mdi:arrow-collapse-down"></Icon>
              </span>
            </div>
            <div class="layer-manager-wrap"></div>
            <div class="layer-toolbar layer-toolbar-bottom">
              <span title="成组" class="toolbar-icon standard">
                <Icon icon="ant-design:folder-filled"></Icon>
              </span>
              <span title="删除" class="toolbar-icon standard">
                <Icon icon="ant-design:delete-outlined"></Icon>
              </span>
              <span title="锁定" class="toolbar-icon standard">
                <Icon icon="ant-design:lock-outlined"></Icon>
              </span>
              <span title="隐藏" class="toolbar-icon standard">
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
