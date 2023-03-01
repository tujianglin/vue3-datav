import { createApp } from 'vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.variable.min.css';
import 'ant-design-vue/dist/antd.dark.less';
import '/@/design/index.less';
import 'virtual:windi.css';
import 'echarts';
import { setupStore } from '/@/store';
import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupGlobDirectives } from '/@/directives';
import Components from '/@/components';
import DatavComponents from '/@/datavComponents';

async function bootstrap() {
  const app = createApp(App);
  setupStore(app);
  // 配置 路由
  await setupRouter(app);
  setupRouterGuard(router);
  setupGlobDirectives(app);
  app.use(Components);
  app.use(DatavComponents);
  app.mount('#app');
}
bootstrap();
