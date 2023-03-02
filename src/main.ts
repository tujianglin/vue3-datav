import { createApp } from 'vue';
import App from './App.vue';
// antv 暗黑主题
import 'ant-design-vue/dist/antd.variable.min.css';
import 'ant-design-vue/dist/antd.dark.less';
// 阿里icon
import '/@/assets/iconfont/iconfont.css';
import '/@/design/index.less';
// windiCss
import 'virtual:windi.css';
import 'echarts';
import { setupStore } from '/@/store';
import { router, setupRouter } from '/@/router';
import { setupRouterGuard } from '/@/router/guard';
import { setupGlobDirectives } from '/@/directives';
// 全局组件
import Components from '/@/components';
// datav 组件
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
