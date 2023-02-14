<script lang="tsx">
  import { defineComponent } from 'vue';
  import { RouterView } from 'vue-router';
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
  import { ElConfigProvider } from 'element-plus';
  export default defineComponent({
    setup() {
      const locale = zhCn;
      return () => (
        <ElConfigProvider locale={locale} size={'default'}>
          <RouterView></RouterView>
        </ElConfigProvider>
      );
    },
  });
</script>
