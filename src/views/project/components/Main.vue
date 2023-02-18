<script lang="tsx">
  import { computed, defineComponent, ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { Input, Dropdown, Menu, MenuProps, Button, Tooltip, Modal } from 'ant-design-vue';
  import { sortBy } from 'lodash-es';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { useProjectStore } from '/@/store/modules/project';
  import Icon from '/@/components/global/Icon';
  import { ScrollContainer } from '/@/components/global/Container';
  import { Project } from '/@/api/models/project';
  import { getAssetsFile } from '/@/utils';
  export default defineComponent({
    setup() {
      // 移动图片
      const image = new Image();
      image.src = getAssetsFile('drag-thumbnail.png');
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

      /* 移动 */
      const onDragstart = (e: DragEvent, i: Project) => {
        projectStore.draging = true;
        const dt = e.dataTransfer;
        if (dt) {
          dt.effectAllowed = 'move';
          dt.setDragImage(image, 30, 30);
          dt.setData('text', `${i.id},${i.groupId}`);
        }
      };
      const onDragend = () => {
        projectStore.draging = false;
      };
      /* 复制 */
      const onProjectCopy = (val) => {
        projectStore.copy(val);
      };
      /* 删除 */
      const onProjectDelete = (val) => {
        Modal.confirm({
          centered: true,
          closable: true,
          maskClosable: true,
          icon: () => (
            <div class="flex justify-center">
              <Icon icon="ant-design:warning-outlined" size={64} color="#ff4f43"></Icon>
            </div>
          ),
          content: `${val.name} 删除后无法恢复，确认删除？`,
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            projectStore.delete(val);
          },
        });
      };
      return () => (
        <div class="screen-list">
          <div>选择下面的方式进行创建</div>
          <div class="new-projects">
            <RouterLink to={{ path: '/create' }} class="new-project">
              <img src="/images/new-project.png" />
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
                <Button class="text-button ml-3">
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
                    <div class="edit">
                      <div>
                        <Button class="w-26" type={'primary'}>
                          编辑
                        </Button>
                        <div class="flex justify-between px-2 mt-4">
                          <Tooltip
                            overlayClassName="tooltip-border"
                            placement={'bottom'}
                            title="移动"
                          >
                            <Button
                              class="text-button"
                              draggable
                              onDragstart={(e) => onDragstart(e, i)}
                              onDragend={onDragend}
                            >
                              <Icon size={20} icon="ant-design:drag-outlined"></Icon>
                            </Button>
                          </Tooltip>
                          <Tooltip
                            overlayClassName="tooltip-border"
                            placement={'bottom'}
                            title="复制"
                          >
                            <Button class="text-button" onClick={() => onProjectCopy(i)}>
                              <Icon size={20} icon="ant-design:copy-outlined"></Icon>
                            </Button>
                          </Tooltip>
                          <Tooltip
                            overlayClassName="tooltip-border"
                            placement={'bottom'}
                            title="删除"
                          >
                            <Button class="text-button" onClick={() => onProjectDelete(i)}>
                              <Icon size={20} icon="ant-design:delete-outlined"></Icon>
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                      <div class="preview">
                        <Tooltip
                          overlayClassName="tooltip-border"
                          placement={'bottom'}
                          title="预览"
                        >
                          <Button class="text-button">
                            <Icon size={20} icon="heroicons:tv"></Icon>
                          </Button>
                        </Tooltip>
                      </div>
                      <div class="share">
                        <Tooltip
                          overlayClassName="tooltip-border"
                          placement={'bottom'}
                          title="分享"
                        >
                          <Button class="text-button">
                            <Icon size={20} icon="system-uicons:paper-plane"></Icon>
                          </Button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center justify-between name  px-2" title={i.name}>
                    <div class="flex items-center ">
                      <Icon icon="ant-design:edit-outlined"></Icon>
                      <Input
                        class="edit-input border-none w-30 truncate"
                        v-model:value={i.name}
                      ></Input>
                    </div>
                    <div class="flex items-center">
                      <span
                        class="dot"
                        style={{ '--color': !!i.share ? 'var(--ant-primary-color)' : '#576369' }}
                      ></span>
                      <span>{!!i.share ? '已发布' : '未发布'}</span>
                    </div>
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

        &:hover {
          .info .edit {
            opacity: 1;
            pointer-events: all;

            .icon {
              &:hover {
                color: var(--ant-primary-color);
              }
            }
          }
        }

        .name {
          height: 36px;
          background: #1d262e;
          display: flex;
          align-items: center;
          color: var(--datav-font-color);

          .dot {
            content: '';
            margin-right: 5px;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 5px;
            background-color: var(--color);
          }

          .edit-input {
            &:focus {
              border-color: none;
              box-shadow: none;
            }
          }
        }

        .info {
          position: relative;
          display: flex;
          width: 100%;

          .preview {
            position: absolute;
            top: 12px;
            right: 40px;
          }

          .share {
            position: absolute;
            top: 12px;
            right: 12px;
          }

          .edit {
            position: absolute;
            opacity: 0;
            display: flex;
            width: 100%;
            height: 100%;
            pointer-events: none;
            align-items: center;
            justify-content: center;
            transition: opacity 0.2s;
            background: rgba(0, 0, 0, 0.8);
          }
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
