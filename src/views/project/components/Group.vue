<script lang="tsx">
  import { computed, defineComponent, onMounted, ref } from 'vue';
  import { Input, Modal } from 'ant-design-vue';
  import { ScrollContainer } from '/@/components/global/Container';
  import { useProjectStore } from '/@/store/modules/project';
  import { ProjectGroup } from '/@/components/_editor/project';
  import { addClass, removeClass } from '/@/utils/dom';
  import {
    WarningOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
  } from '@ant-design/icons-vue';
  export default defineComponent({
    setup() {
      const projectStore = useProjectStore();
      const adding = ref(false);
      const draging = computed(() => projectStore.draging);
      const groups = computed(() => projectStore.allGroups);
      const group = computed(() => projectStore.group);

      /* 切换分组 */
      const toggleGroup = (id) => {
        projectStore.selectedGroupId = id;
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
              <WarningOutlined class="text-6xl text-[#ff4f43]"></WarningOutlined>
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
      /* 拖拽移入 */
      const onDragenter = (e: DragEvent) => {
        addClass((e as any).target, 'drag-enter');
      };
      const onDragleave = (e: DragEvent) => {
        removeClass((e as any).target, 'drag-enter');
      };
      const onDrop = (e: DragEvent, group: ProjectGroup) => {
        e.preventDefault();
        removeClass((e as any).target, 'drag-enter');
        const str = e.dataTransfer?.getData('text');
        if (str) {
          const [pid, fromId] = str.split(',').map((i) => parseInt(i));
          if (fromId !== group.id) {
            projectStore.move(pid, fromId, group.id);
          }
        }
      };
      onMounted(() => {
        projectStore.getProjectGroup();
      });
      return () => (
        <>
          <div class="group">
            <span>我的分组</span>
            <PlusOutlined class="add-icon" onClick={() => (adding.value = true)}></PlusOutlined>
          </div>
          <ScrollContainer class="!h-full">
            <div class="all-group">
              <div
                class={['groups', { check: projectStore.selectedGroupId === group.value.id }]}
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
            <div class={{ draging: draging.value }}>
              {groups.value.map((i) => (
                <div key={i.id}>
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
                      class={['groups', { check: projectStore.selectedGroupId === i.id }]}
                      onClick={() => toggleGroup(i.id)}
                      onDragover={(e) => e.preventDefault()}
                      onDragenter={onDragenter}
                      onDragleave={onDragleave}
                      onDrop={(e) => onDrop(e, i)}
                    >
                      <span class="w-25 truncate pointer-events-none">{i?.name}</span>
                      <span class="num">{i?.children.length}</span>
                      <span class="edit flex items-center">
                        <EditOutlined onClick={() => (i.edit = true)}></EditOutlined>
                        <DeleteOutlined
                          class="ml-1"
                          icon="ant-design:delete-outlined"
                          onClick={() => onDelGroup(i)}
                        ></DeleteOutlined>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollContainer>
        </>
      );
    },
  });
</script>
<style lang="less" scoped>
  .drag-enter {
    background: var(--datav-body-bg);
  }

  .draging {
    background: rgb(36 127 255 / 30%);
  }

  .edit-input {
    width: 160px;
    height: 28px;
    margin: 4px 0 4px 50px;
    color: #fff;
    background: transparent;
  }

  .group {
    display: flex;
    height: 56px;
    padding: 0 24px;
    color: var(--datav-font-color);
    border-bottom: 1px solid #27343e;
    align-items: center;
    justify-content: space-between;

    .add-icon {
      cursor: pointer;

      &:hover {
        color: var(--ant-primary-color);
      }
    }
  }

  .groups {
    display: flex;
    height: 36px;
    padding: 0 30px 0 50px;
    font-size: 12px;
    color: var(--datav-font-color);
    cursor: pointer;
    transition: color 0.2s;
    align-items: center;
    justify-content: space-between;

    .edit {
      display: none;
    }

    &:hover {
      color: var(--ant-primary-color);

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
          color: var(--ant-primary-color);
        }
      }
    }
  }
</style>
