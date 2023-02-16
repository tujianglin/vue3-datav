<script lang="tsx">
  import { defineComponent, onMounted, ref } from 'vue';
  import { Button, Spin } from 'ant-design-vue';
  import { RouterLink } from 'vue-router';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import Icon from '/@/components/Icon';
  import { getSysTemplates } from '/@/api/project';
  import { ProjectTemplate } from '/@/api/models/project';
  export default defineComponent({
    setup() {
      const loading = ref(false);
      const templates = ref<ProjectTemplate[]>([]);
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
                  <Icon class="mr-2" icon="ant-design:left-outlined"></Icon>
                  取消创建
                </Button>
              </RouterLink>
            </div>
            <div class="template-wp">
              <div class="template-list">
                <div class="template-item --bank">
                  <div class="image">
                    <Button
                      type={'primary'}
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
                  <div class="template-item">
                    <div class="image">
                      <img src={i.thumbnail} class="w-full h-full object-cover" />
                      <div class="mask">
                        <Button class="w-26" type={'primary'}>
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
            </div>
          </div>
        </Spin>
      );
    },
  });
</script>
<style lang="less" scoped>
  .create-screen {
    height: 100%;
    display: flex;
    flex-direction: column;
    user-select: none;
    .template-wp {
      flex: 1;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 30px;
      .template-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        overflow-x: hidden;
        overflow-y: scroll;
        color: #fff;
        font-size: 12px;
        margin: 0 -16px;
        padding-bottom: 100px;
        padding-top: 60px;

        .template-item {
          width: 258px;
          height: 184px;
          box-shadow: var(--datav-shadow);
          border: 1px solid var(--datav-border-color);
          margin: 16px;
          transition: 0.2s;
          outline: 1px solid transparent;
          cursor: default;
          position: relative;

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
              border-top: 1px solid var(--ant-primary-color);
              justify-content: center;
              font-size: 14px;
            }
          }
          .image {
            width: 100%;
            height: 146px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.2s;
            position: relative;

            .mask {
              position: absolute;
              left: 0;
              top: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.5);
              transition: 0.2s;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              opacity: 0;
            }
          }

          .info {
            color: var(--datav-font-color);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            height: 36px;
            background: #1d262e;
            transition: 0.2s;

            .size {
              color: #999;
              text-align: right;
              font-size: 12px;
            }
          }

          &:hover {
            outline: 1px solid var(--ant-primary-color);
          }
        }
      }
    }

    .top-bar {
      height: 50px;
      width: 100%;
      position: relative;

      .right {
        position: absolute;
        left: 150px;
        top: 20px;
        height: 5px;
        width: calc(100% - 154px);
        border-top: 1px solid var(--ant-primary-color);
        border-left: 2px solid var(--ant-primary-color);
        background: rgba(55, 126, 255, 0.04);
        border-top-left-radius: 5px;
        transform: skewX(-45deg);
        box-shadow: 0 5px 28px 0 rgb(55 126 255 / 28%);
      }

      .left {
        position: absolute;
        left: 0;
        top: 24px;
        height: 25px;
        width: 138px;
        border-right: 2px solid var(--ant-primary-color);
        border-bottom: 1px solid var(--ant-primary-color);
        transform: skewX(-45deg);
        border-bottom-right-radius: 5px;
        box-shadow: 0 5px 28px 0 rgb(55 126 255 / 28%);
      }
      .return-btn {
        position: absolute;
        left: -31px;
        top: 0;
        width: 180px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        background: #151b22;
        cursor: pointer;
        transform: skewX(-45deg);
        border-bottom-right-radius: 5px;

        .text-button {
          display: inline-flex;
          font-size: 14px;
          margin-left: 10px;
          transform: skewX(45deg);
          transition: 0.2s;
        }
      }

      &::before {
        content: ' ';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 20px;
        width: 100%;
        background: #151b22;
      }
    }
  }
</style>
