<script lang="tsx">
  import { defineComponent } from 'vue';
  import { RouterView } from 'vue-router';
  import { ConfigProvider } from 'ant-design-vue';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  export default defineComponent({
    setup() {
      return () => (
        <ConfigProvider locale={zhCN}>
          <RouterView></RouterView>
        </ConfigProvider>
      );
    },
  });
</script>
<style lang="less">
  #app {
    width: 100%;
    height: 100%;
  }
</style>
