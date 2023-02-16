<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Layout } from 'ant-design-vue';
  import Group from './components/Group.vue';
  import Main from './components/Main.vue';
  export default defineComponent({
    setup() {
      return () => (
        <Layout class="project-container">
          <Layout.Sider width={240} class="sider">
            <Group></Group>
          </Layout.Sider>
          <Layout.Content>
            <Main></Main>
          </Layout.Content>
        </Layout>
      );
    },
  });
</script>
<style lang="less" scoped>
  .project-container {
    background: var(--datav-body-bg);
    color: #fff;
    height: 100%;

    .sider {
      height: calc(100% - 150px);
    }
  }
</style>
