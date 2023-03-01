<script lang="tsx">
  import { defineComponent, inject } from 'vue';
  import { comInjectionKey } from '../../../config';
  export default defineComponent({
    setup() {
      const com = inject(comInjectionKey);
      return () => (
        <div class="com-config">
          <div class="max-w-40 truncate">{com?.value.alias}</div>
          <div class="text-[#647279] text-xs">{com?.value.name}</div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  .com-config {
    padding: 8px;
    padding-bottom: 0px;
  }
</style>
