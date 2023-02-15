<script lang="tsx">
  import { defineComponent } from 'vue';
  import Icon from '/@/components/Icon';
  export default defineComponent({
    setup() {
      return () => (
        <div class="project-container">
          <div class="group">
            <span>我的分组</span>
            <Icon icon="ant-design:plus-outlined"></Icon>
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  .project-container {
    background: #171b22;
    .group {
    }
  }
</style>
