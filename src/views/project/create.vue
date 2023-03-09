<script lang="tsx">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Button, Spin } from 'ant-design-vue';
  import { RouterLink } from 'vue-router';
  import { PlusOutlined, LeftOutlined } from '@ant-design/icons-vue';
  import { getSysTemplates } from '/@/api/templates';
  import { ProjectTemplate } from '/@/components/_editor/project';
  import { ScrollContainer } from '/@/components/global/Container';
  import CreateModal from './components/CreateModal.vue';
  export default defineComponent({
    setup() {
      const loading = ref(false);
      const templates = ref<ProjectTemplate[]>([]);
      const createModal = ref();
      const onCreateProject = () => {
        createModal.value?.show();
      };
      onMounted(async () => {
        const res = await getSysTemplates();
        templates.value = res;
      });
      return () => (
        <Spin spinning={loading.value}>
          <div class="create-screen">
            <div class="top-bar">
              <div class="right"></div>
              <div class="left"></div>
              <RouterLink to="/" class="return-btn">
                <Button class="text-button">
                  <LeftOutlined class="mr-2"></LeftOutlined>
                  取消创建
                </Button>
              </RouterLink>
            </div>
            <div class="template-wp">
              <ScrollContainer>
                <div class="template-list">
                  <div class="template-item --bank">
                    <div class="image">
                      <Button
                        class="flex items-center"
                        type={'primary'}
                        onClick={onCreateProject}
                        v-slots={{
                          icon: () => <PlusOutlined></PlusOutlined>,
                        }}
                      >
                        创建项目
                      </Button>
                    </div>
                    <div class="info">空白画板</div>
                  </div>
                  {templates.value.map((i) => (
                    <div key={i.id} class="template-item">
                      <div class="image">
                        <img src={i.thumbnail} class="w-full h-full object-cover" />
                        <div class="mask">
                          <Button class="w-26" type={'primary'} onClick={onCreateProject}>
                            创建项目
                          </Button>
                          <Button class="w-26 mt-2">预览</Button>
                        </div>
                      </div>
                      <div class="info">
                        <div>{i.name}</div>
                        <div class="size">
                          {i.size.map((j) => (
                            <p>{j}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div class="template-item !h-0 !border-none"></div>
                  <div class="template-item !h-0 !border-none"></div>
                  <div class="template-item !h-0 !border-none"></div>
                  <div class="template-item !h-0 !border-none"></div>
                </div>
              </ScrollContainer>
            </div>
          </div>
          <CreateModal ref={createModal}></CreateModal>
        </Spin>
      );
    },
  });
</script>
<style lang="less" scoped>
  .create-screen {
    display: flex;
    height: 100%;
    user-select: none;
    flex-direction: column;

    .template-wp {
      display: flex;
      height: calc(100vh - 100px);
      padding: 0 30px;
      margin-top: 12px;
      overflow: hidden;
      flex-direction: column;
      align-items: center;

      .template-list {
        display: flex;
        padding: 30px 0;
        margin: 0 -16px;
        font-size: 12px;
        color: #fff;
        flex-wrap: wrap;
        justify-content: center;

        .template-item {
          position: relative;
          width: 258px;
          height: 184px;
          margin: 16px;
          cursor: default;
          border: 1px solid var(--datav-border-color);
          outline: 1px solid transparent;
          box-shadow: var(--datav-shadow);
          transition: 0.2s;

          &:hover {
            .image {
              .mask {
                opacity: 1;
              }
            }
          }

          &.--bank {
            position: relative;
            outline: 1px solid var(--ant-primary-color);

            .image {
              box-shadow: inset 0 0 46px 0 rgb(136 215 255 / 29%);
            }

            .info {
              font-size: 14px;
              border-top: 1px solid var(--ant-primary-color);
              justify-content: center;
            }
          }

          .image {
            position: relative;
            display: flex;
            width: 100%;
            height: 146px;
            transition: 0.2s;
            align-items: center;
            justify-content: center;

            .mask {
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              display: flex;
              background: rgb(0 0 0 / 50%);
              opacity: 0;
              transition: 0.2s;
              justify-content: center;
              align-items: center;
              flex-direction: column;
            }
          }

          .info {
            display: flex;
            height: 36px;
            padding: 10px;
            color: var(--datav-font-color);
            background: #1d262e;
            transition: 0.2s;
            align-items: center;
            justify-content: space-between;

            .size {
              font-size: 12px;
              color: #999;
              text-align: right;
            }
          }

          &:hover {
            outline: 1px solid var(--ant-primary-color);
          }
        }
      }
    }

    .top-bar {
      position: relative;
      width: 100%;
      height: 50px;

      .right {
        position: absolute;
        top: 20px;
        left: 150px;
        width: calc(100% - 154px);
        height: 5px;
        background: rgb(55 126 255 / 4%);
        border-top: 1px solid var(--ant-primary-color);
        border-left: 2px solid var(--ant-primary-color);
        border-top-left-radius: 5px;
        transform: skewX(-45deg);
        box-shadow: 0 5px 28px 0 rgb(55 126 255 / 28%);
      }

      .left {
        position: absolute;
        top: 24px;
        left: 0;
        width: 138px;
        height: 25px;
        border-right: 2px solid var(--ant-primary-color);
        border-bottom: 1px solid var(--ant-primary-color);
        border-bottom-right-radius: 5px;
        transform: skewX(-45deg);
        box-shadow: 0 5px 28px 0 rgb(55 126 255 / 28%);
      }

      .return-btn {
        position: absolute;
        top: 0;
        left: -31px;
        width: 180px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        cursor: pointer;
        background: #151b22;
        border-bottom-right-radius: 5px;
        transform: skewX(-45deg);

        .text-button {
          display: inline-flex;
          margin-left: 10px;
          font-size: 14px;
          transform: skewX(45deg);
          transition: 0.2s;
        }
      }

      &::before {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 20px;
        background: #151b22;
        content: ' ';
      }
    }
  }
</style>
