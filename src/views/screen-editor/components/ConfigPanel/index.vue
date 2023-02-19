<script lang="tsx">
  import { storeToRefs } from 'pinia';
  import { computed, defineComponent, provide } from 'vue';
  import { useToolbarStore } from '/@/store/modules/toolbar';
  import LayerSetting from './components/LayerSetting.vue';
  import { useComStore } from '/@/store/modules/com';
  import { comInjectionKey } from './config';
  import { ComType } from '/@/components/_models/datav-component';
  export default defineComponent({
    setup() {
      const toolbarStore = useToolbarStore();
      const comStore = useComStore();
      const { config } = storeToRefs(toolbarStore);
      const currCom = computed(() => comStore.selectedSubCom || comStore.selectedCom);
      provide(comInjectionKey, currCom);
      return () => (
        <div class={['g-aside', 'config-panel-wp', { '--hide': !config.value.show }]}>
          <div class="config-manager">
            {currCom.value && currCom.value.type === ComType.layer && <LayerSetting></LayerSetting>}
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  @panel_width: 332px;

  .config-panel-wp {
    position: relative;
    z-index: 90;
    width: @panel_width !important;
    height: 100%;
    overflow: hidden;
    background: var(--datav-config-bg);
    box-shadow: -1px 0 #000;
    transition: width 0.25s ease-in-out;
  }

  .config-manager {
    width: @panel_width;
    height: 100%;
    background: var(--datav-left-nav-bg);
    transition: 0.25s ease-in-out;
    user-select: none;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .config-panel-wp.--hide {
    width: 0 !important;

    .config-manager {
      transform: translateX(-100%);
    }
  }
</style>
