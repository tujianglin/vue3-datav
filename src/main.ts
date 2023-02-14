import { createApp } from 'vue';
import App from './App.vue';
import 'ant-design-vue/dist/antd.variable.min.css';
import 'virtual:windi.css';
import { setupStore } from '/@/store';
import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';

async function bootstrap() {
  const app = createApp(App);
  setupStore(app);
  // 配置 路由
  await setupRouter(app);
  setupRouterGuard(router);
  app.mount('#app');
}
bootstrap();
