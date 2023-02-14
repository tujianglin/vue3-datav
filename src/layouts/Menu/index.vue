<script lang="tsx">
  import { defineComponent } from 'vue';
  import { ElMenu } from 'element-plus';
  import { routes } from '/@/router';
  import { useAppStore } from '/@/store/modules/app';
  import MenuItem from './components/MenuItem.vue';

  export default defineComponent({
    setup() {
      const { getAppConfig } = useAppStore();
      return () => (
        <ElMenu
          router
          active-text-color="#ffd04b"
          background-color="#545c64"
          text-color="#fff"
          class="w-65"
          collapse={getAppConfig.collapsed}
          default-active="/"
        >
          {routes.map((i) => (
            <MenuItem item={i}></MenuItem>
          ))}
        </ElMenu>
      );
    },
  });
</script>
<style lang="less" scoped></style>
