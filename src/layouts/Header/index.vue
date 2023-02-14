<script lang="tsx">
  import { defineComponent } from 'vue';
  import { ElHeader } from 'element-plus';
  export default defineComponent({
    setup() {
      return () => (
        <ElHeader class="layout-header">
          <div>头部</div>
        </ElHeader>
      );
    },
  });
</script>
<style lang="less" scoped>
  .layout-header {
    display: flex;
    align-items: center;
    height: initial;
    padding: 8px;
  }
</style>
