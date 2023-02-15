<script lang="tsx">
  import { computed, defineComponent, onMounted, ref } from 'vue';
  import { Input, Layout } from 'ant-design-vue';
  import Icon from '/@/components/Icon';
  import { ScrollContainer } from '/@/components/Container';
  import { useProjectStore } from '/@/store/modules/project';
  export default defineComponent({
    setup() {
      const projectStore = useProjectStore();
      const adding = ref(false);
      const groups = computed(() => projectStore.groups);

      const selectedGroupId = ref(-1);

      /* 切换分组 */
      const toggleGroup = (id) => {
        selectedGroupId.value = id;
      };

      /* 输入框失焦 */
      const onInputBlur = (e: Event) => {
        if (!adding.value) return;
        const name = ((e.target as HTMLInputElement).value || '').trim();
        if (!name) {
          adding.value = false;
        }
      };

      /* 输入框回车确认 */
      const onAddGroup = (e: KeyboardEvent) => {
        if (e.code !== 'Enter') return;
        if (!adding.value) return;
        const name = ((e.target as HTMLInputElement).value || '').trim();
        if (name) {
          try {
            projectStore.addProjectGroup({ name });
            adding.value = false;
          } catch (error) {}
        } else {
          adding.value = false;
        }
      };

      onMounted(() => {
        projectStore.getProjectGroup();
      });
      return () => (
        <Layout class="project-container">
          <Layout.Sider width={240}>
            <ScrollContainer>
              <div class="group">
                <span>我的分组</span>
                <Icon
                  icon="ant-design:plus-outlined"
                  class="add-icon"
                  onClick={() => (adding.value = true)}
                ></Icon>
              </div>
              {adding.value ? (
                <Input v-focus class="edit-input" onBlur={onInputBlur} onKeyup={onAddGroup}></Input>
              ) : (
                ''
              )}
              {groups.value.map((i) => (
                <div
                  class={['groups', { check: selectedGroupId.value === i.id }]}
                  onClick={() => toggleGroup(i.id)}
                >
                  <div>{i?.name}</div>
                  <div>{i?.children.length}</div>
                </div>
              ))}
            </ScrollContainer>
          </Layout.Sider>
          <Layout.Content>11</Layout.Content>
        </Layout>
      );
    },
  });
</script>
<style lang="less" scoped>
  .project-container {
    background: var(--datav-body-bg);
    color: #fff;

    .edit-input {
      width: 160px;
      margin: 4px 0 4px 50px;
      background: transparent;
      color: #fff;
    }

    .group {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      height: 56px;
      border-bottom: 1px solid #27343e;
      .add-icon {
        cursor: pointer;

        &:hover {
          color: var(--datav-main-color);
        }
      }
    }
    .groups {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 36px;
      padding: 0 30px 0 50px;
      font-size: 12px;
      cursor: pointer;
      transition: color 0.2s;

      &.check {
        background: url('/images/nav-menu-img.png') round;
      }
    }
  }
</style>
