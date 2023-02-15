<script lang="tsx">
  import { computed, defineComponent, onMounted, ref } from 'vue';
  import { Input, Layout, Modal } from 'ant-design-vue';
  import Icon from '/@/components/Icon';
  import { ScrollContainer } from '/@/components/Container';
  import { useProjectStore } from '/@/store/modules/project';
  import { ProjectGroup } from '/@/api/models/project';
  export default defineComponent({
    setup() {
      const projectStore = useProjectStore();
      const adding = ref(false);
      const groups = computed(() => projectStore.allGroups);
      const group = computed(() => projectStore.group);

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
      /* 编辑 */
      const onEditGroup = (e: KeyboardEvent, val: ProjectGroup) => {
        if (e.code !== 'Enter') return;
        if (!val.edit) return;
        const nName = ((e.target as HTMLInputElement).value || '').trim();
        val.name = nName;
        val.edit = false;
      };
      /*  */
      const onEditInputBlur = (e: Event, val: ProjectGroup) => {
        if (!val.edit) return;
        const nName = ((e.target as HTMLInputElement).value || '').trim();
        if (!nName || val.name === nName) {
          val.edit = false;
        }
      };
      /* 删除 */
      const onDelGroup = (val: ProjectGroup) => {
        Modal.confirm({
          centered: true,
          closable: true,
          maskClosable: true,
          icon: () => (
            <div class="flex justify-center">
              <Icon icon="ant-design:warning-outlined" size={64} color="#ff4f43"></Icon>
            </div>
          ),
          content: `${val.name} 删除后无法恢复，该分组中的可视化应用将全部移动到未分组，确认删除？`,
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            projectStore.delProjectGroup({ id: val.id });
          },
        });
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
              <div class="all-group">
                <div
                  class={['groups', { check: selectedGroupId.value === group.value.id }]}
                  onClick={() => toggleGroup(group.value.id)}
                >
                  <span>{group.value.name}</span>
                  <span>{group.value.children.length}</span>
                </div>
              </div>
              {(adding.value && (
                <Input v-focus class="edit-input" onBlur={onInputBlur} onKeyup={onAddGroup}></Input>
              )) ||
                ''}
              {groups.value.map((i) => (
                <>
                  {i.edit ? (
                    <Input
                      v-focus
                      defaultValue={i.name}
                      class="edit-input"
                      onBlur={(e) => onEditInputBlur(e, i)}
                      onKeyup={(e) => onEditGroup(e, i)}
                    ></Input>
                  ) : (
                    <div
                      class={['groups', { check: selectedGroupId.value === i.id }]}
                      onClick={() => toggleGroup(i.id)}
                    >
                      <span class="w-25 truncate">{i?.name}</span>
                      <span class="num">{i?.children.length}</span>
                      <span class="edit flex items-center">
                        <Icon
                          icon="ant-design:edit-outlined"
                          onClick={() => (i.edit = true)}
                        ></Icon>
                        <Icon
                          class="ml-1"
                          icon="ant-design:delete-outlined"
                          onClick={() => onDelGroup(i)}
                        ></Icon>
                      </span>
                    </div>
                  )}
                </>
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
      height: 28px;
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

      .edit {
        display: none;
      }

      &:hover {
        color: var(--datav-main-color);
        .num {
          display: none;
        }

        .edit {
          display: flex;
        }
      }

      &.check {
        background: url('/images/nav-menu-img.png') round;

        &:hover {
          color: #fff;

          .edit {
            color: var(--datav-main-color);
          }
        }
      }
    }
  }
</style>
