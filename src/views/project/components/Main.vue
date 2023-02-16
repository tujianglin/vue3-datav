<script lang="tsx">
  import { computed, defineComponent, ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { Input, Dropdown, Menu, MenuProps, Button } from 'ant-design-vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { useProjectStore } from '/@/store/modules/project';
  import Icon from '/@/components/Icon';
  import { ScrollContainer } from '/@/components/Container';
  import { sortBy } from 'lodash-es';
  export default defineComponent({
    setup() {
      const projectStore = useProjectStore();
      const sort = ref('name');
      const searchValue = ref<string>();
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
      /* 排序 */
      const onChangeSort: MenuProps['onClick'] = ({ key }) => {
        sort.value = key as string;
      };
      /* 搜索 */
      const screens = computed(() => {
        let list = group.value?.children || [];
        if (searchValue.value) {
          const text = searchValue.value.toLowerCase();
          list = list.filter((i) => i.name.toLowerCase().includes(text));
        }
        return sortBy(list, sort.value);
      });
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
                v-model:value={searchValue.value}
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
          <ScrollContainer class="!h-[calc(100%-190px)]">
            <div class="screen-main">
              {screens.value.map((i) => (
                <div class="screen">
                  <div class="info">
                    <div class="img" style={[{ background: `url(${i.thumbnail})` }]}></div>
                  </div>
                  <div class="name">
                    <div class="px-2">{i.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollContainer>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  .screen-list {
    padding: 0 50px 0 20px;
    color: var(--ant-primary-color);
    height: 100%;

    .screen-main {
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      padding-top: 8px;
      user-select: none;
      padding-bottom: 50px;
      margin-right: -32px;
      .screen {
        display: flex;
        flex-direction: column;
        width: 258px;
        height: 184px;
        border: 1px solid var(--datav-border-color);
        transition: 0.2s;
        margin: 16px 32px 16px 0;

        .name {
          height: 36px;
          background: #1d262e;
          display: flex;
          align-items: center;
          color: var(--datav-font-color);
        }

        .info {
          .img {
            height: 146px;
            width: inherit;
            background-size: 100% 100%;
            opacity: 0.6;
          }
        }

        &:hover {
          box-shadow: var(--datav-shadow);
          border: 1px solid var(--ant-primary-color);
        }
      }
    }

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
      color: var(--datav-font-color);

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
