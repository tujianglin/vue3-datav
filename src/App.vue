<script lang="tsx">
  import { defineComponent } from 'vue';
  import { RouterView } from 'vue-router';
  import { ConfigProvider } from 'ant-design-vue';
  export default defineComponent({
    setup() {
      return () => (
        <ConfigProvider>
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
