<script lang="tsx">
  import { defineComponent } from 'vue';
  import { ElAside, ElScrollbar } from 'element-plus';
  import { useAppStore } from '/@/store/modules/app';
  import Icon from '/@/components/Icon';
  import Menu from '../Menu/index.vue';
  export default defineComponent({
    setup() {
      const { getAppConfig, setTheme } = useAppStore();
      const updateCollapse = () => {
        setTheme({ collapsed: !getAppConfig.collapsed });
      };
      return () => (
        <ElAside class="layout-aside">
          <div class="app-logo" style={{ '--width': getAppConfig.collapsed ? '64px' : '260px' }}>
            {getAppConfig.collapsed ? '' : <div class="img"></div>}
            <Icon
              class="cursor-pointer"
              icon={getAppConfig.collapsed ? 'ep:expand' : 'ep:fold'}
              size={24}
              onClick={updateCollapse}
            ></Icon>
          </div>
          <ElScrollbar>
            <Menu></Menu>
          </ElScrollbar>
        </ElAside>
      );
    },
  });
</script>
<style lang="less" scoped>
  .layout-aside {
    width: var(--width);
    background: #545c64;
    .app-logo {
      height: 50px;
      width: 100%;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      .img {
        width: 100%;
        height: 100%;
        background: skyblue;
        margin-right: 10px;
      }
    }
  }
</style>
