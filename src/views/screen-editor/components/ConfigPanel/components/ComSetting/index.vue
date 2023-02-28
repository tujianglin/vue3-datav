<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { Tabs } from 'ant-design-vue';
  import Icon from '/@/components/global/Icon';
  import ComConfig from './components/ComConfig.vue';
  export default defineComponent({
    setup() {
      const activeKey = ref('1');
      return () => (
        <Tabs
          class="h-full"
          style={{ background: 'var(--datav-nav-bg-active)' }}
          v-model:activeKey={activeKey.value}
          type={'card'}
        >
          <Tabs.TabPane
            key="1"
            v-slots={{
              tab: () => <Icon icon="icon-park-outline:setting-config"></Icon>,
            }}
          >
            <ComConfig></ComConfig>
          </Tabs.TabPane>
          <Tabs.TabPane
            key="2"
            v-slots={{
              tab: () => <Icon icon="material-symbols:cloud-outline"></Icon>,
            }}
          ></Tabs.TabPane>
          <Tabs.TabPane
            key="3"
            v-slots={{
              tab: () => <Icon icon="mdi:interaction-double-tap"></Icon>,
            }}
          ></Tabs.TabPane>
        </Tabs>
      );
    },
  });
</script>
<style lang="less" scoped>
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
