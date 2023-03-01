<script lang="tsx">
  import { computed, defineComponent, inject, provide, ref } from 'vue';
  import { changePanelInjectionKey, comInjectionKey } from '../../../../config';
  import ConfigTitle from '../ConfigTitle.vue';
  import SourcePanel from './components/SourcePanel.vue';
  export default defineComponent({
    setup() {
      const com = inject(comInjectionKey);

      const dataKeys = computed(() => {
        return Object.keys(com.value.apis);
      });
      const activeName = ref(dataKeys.value[0]);
      provide(changePanelInjectionKey, (panelName: string) => {
        activeName.value = activeName.value === panelName ? '' : panelName;
      });
      return () => (
        <div class="h-full flex flex-col">
          <ConfigTitle></ConfigTitle>
          <div class="scroll-container">
            {dataKeys.value.length > 0 ? (
              <>
                {dataKeys.value.map((i) => (
                  <SourcePanel
                    key={i}
                    apiName={i}
                    activeName={activeName.value}
                    collapse={dataKeys.value.length > 1}
                  ></SourcePanel>
                ))}
              </>
            ) : (
              ''
            )}
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  .scroll-container {
    flex: 1;
    overflow-y: auto;
  }
</style>
