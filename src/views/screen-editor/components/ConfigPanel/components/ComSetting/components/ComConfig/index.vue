<script lang="tsx">
  import { defineComponent, h, inject, resolveComponent } from 'vue';
  import { comInjectionKey } from '../../../../config';
  import BasicSetting from './components/BasicSetting.vue';
  import { ComType } from '/@/components/_models/datav-component';
  import ConfigTitle from '../ConfigTitle.vue';
  export default defineComponent({
    setup() {
      const com = inject(comInjectionKey);
      return () => (
        <div class="h-full flex flex-col">
          <ConfigTitle></ConfigTitle>
          <div class="scroll-container">
            {com?.value.type === ComType.com && <BasicSetting></BasicSetting>}
            {/* 组件配置 */}
            {h(resolveComponent(`${com.value.name}Prop`), { com: com.value, key: com.value.id })}
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
