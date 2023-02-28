<script lang="tsx">
  import { defineComponent, ref, watch, withModifiers } from 'vue';
  import { Input, UploadDragger, message } from 'ant-design-vue';
  import { LinkOutlined } from '@ant-design/icons-vue';
  import Icon from '../../Icon';
  export default defineComponent({
    props: {
      modelValue: String,
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const image = ref(props.modelValue);
      const iserr = ref(false);
      const zoomImage = () => {
        const img: any = new Image();
        img.src = image.value;
        img.onload = () => {
          iserr.value = false;
        };

        img.onerror = () => {
          iserr.value = true;
          if (image.value) {
            // 错误提示
            message.error('图片加载失败');
          }
        };
      };

      const removeImage = () => {
        image.value = '';
      };
      watch(
        () => image.value,
        (val) => {
          zoomImage;
          emit('update:modelValue', val);
        },
      );
      return () => (
        <div class="w-47">
          <Input
            value={image.value}
            size={'small'}
            placeholder="请输入图片地址"
            v-slots={{
              prefix: () => <LinkOutlined></LinkOutlined>,
            }}
          ></Input>
          <UploadDragger showUploadList={false} class="!h-30 upload mt-2">
            <div class="upload-content">
              {image.value && (
                <div class="image-hover" onClick={withModifiers(() => removeImage(), ['stop'])}>
                  <Icon title="删除" icon="ant-design:delete-outlined"></Icon>
                </div>
              )}
              {image.value && !iserr.value ? (
                <img src={image.value} alt="" />
              ) : (
                <>
                  <div class="mt-2">
                    <Icon icon="ph:image" size={60}></Icon>
                  </div>
                  <div class="text-xs">点击或拖拽文件到这里更换</div>
                </>
              )}
            </div>
          </UploadDragger>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  :deep(.ant-upload) {
    padding: 0;

    .ant-upload {
      padding: 0;
    }
  }
  .upload-content {
    position: relative;
    color: var(--datav-gui-font-color-base);
    padding: 10px;
    height: 118px;
    width: 100%;
    background: rgb(0 0 0 / 75%);
    font-size: 12px;
    color: var(--datav-gui-font-color-base);

    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
      margin: 0 auto;
    }

    .image-hover {
      position: absolute;
      top: 4px;
      right: 4px;
    }
  }
</style>
