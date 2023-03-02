<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { Tabs } from 'ant-design-vue';
  import ComConfig from './components/ComConfig/index.vue';
  import DataConfig from './components/DataConfig/index.vue';
  export default defineComponent({
    setup() {
      const activeKey = ref('2');
      return () => (
        <Tabs
          class="h-full"
          style={{ background: 'var(--datav-nav-bg-active)' }}
          v-model:activeKey={activeKey.value}
          type={'card'}
        >
          <Tabs.TabPane class="h-full relative" key="1" tab="配置">
            <ComConfig></ComConfig>
          </Tabs.TabPane>
          <Tabs.TabPane class="h-full relative" key="2" tab="数据">
            <DataConfig></DataConfig>
          </Tabs.TabPane>
          <Tabs.TabPane key="3" tab="事件"></Tabs.TabPane>
        </Tabs>
      );
    },
  });
</script>
<style lang="less" scoped>
  :deep(.ant-tabs-content) {
    height: 100%;
  }
  :deep(.ant-tabs-nav) {
    margin: 0;

    .ant-tabs-nav-wrap {
      width: 100%;
      .ant-tabs-nav-list {
        width: 100%;
        .ant-tabs-tab {
          flex: 1;
          margin-left: 0px !important;
          border: 1px solid transparent;
          display: flex;
          justify-content: center;
          color: var(--datav-font-color);
          background: var(--datav-nav-bg);
          border-top: 2px solid transparent;

          .anticon {
            margin-right: 0;
          }
        }
        .ant-tabs-tab-active {
          background: var(--datav-nav-bg-active);
          border-top: 2px solid var(--ant-primary-color);
        }
      }
    }
  }
</style>
