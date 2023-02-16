<script lang="tsx">
  import { computed, defineComponent, ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { Input, Dropdown, Menu, MenuProps, Button } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { useProjectStore } from '/@/store/modules/project';
  import Icon from '/@/components/Icon';
  export default defineComponent({
    setup() {
      const projectStore = useProjectStore();
      const sort = ref('name');
      const sorts = {
        name: '按名称排序',
        createAt: '按创建时间排序',
        updateAt: '按修改时间排序',
      };
      const group = computed(() => {
        if (projectStore.selectedGroupId === -1) {
          return projectStore.group;
        } else {
          return projectStore.selectGroup;
        }
      });
      const onChangeSort: MenuProps['onClick'] = ({ key }) => {
        sort.value = key as string;
      };
      return () => (
        <div class="screen-list">
          <div>选择下面的方式进行创建</div>
          <div class="new-projects">
            <RouterLink to={''} target="_blank" class="new-project">
              <img src="/public/images/new-project.png" />
              <span class="truncate">PC端创建</span>
            </RouterLink>
          </div>
          <div class="project-header">
            <div class="title">{group.value?.name || ''}</div>
            <div class="inline-flex items-center">
              <Input
                placeholder="搜索"
                v-slots={{
                  suffix: () => <Icon icon="ant-design:search-outlined"></Icon>,
                }}
              ></Input>
              <Dropdown
                trigger={'click'}
                v-slots={{
                  overlay: () => (
                    <Menu onClick={onChangeSort}>
                      {Object.keys(sorts).map((key) => (
                        <Menu.Item key={key}>{sorts[key]}</Menu.Item>
                      ))}
                    </Menu>
                  ),
                }}
              >
                <Button type={'link'}>
                  {sorts[sort.value]}
                  <DownOutlined></DownOutlined>
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  .screen-list {
    padding: 0 50px 0 20px;
    color: var(--ant-primary-color);

    .new-project {
      width: 258px;
      height: 78px;
      margin: 16px 32px 16px 0;
      vertical-align: middle;
      border: 1px solid #39414d;
      background: #22272e;
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      cursor: pointer;
      color: #fff;

      img {
        width: 150px;
        height: 100%;
      }

      &:hover {
        border-color: var(--ant-primary-color);

        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: rgb(36 131 255 / 8%);
        }
      }
    }

    .project-header {
      position: sticky;
      top: 70px;
      height: 56px;
      padding: 10px 0 5px 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--datav-border-color);
      justify-content: space-between;

      .title {
        max-width: 200px;
        font-size: 14px;
        color: var(--ant-primary-color);
        padding: 0 10px;
        border-left: 2px solid var(--ant-primary-color);
      }
    }
  }
</style>
