<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Form, InputNumber } from 'ant-design-vue';
  import { useEditorStore } from '/@/store/modules/editor';
  import { storeToRefs } from 'pinia';
  import { ColorPicker } from '/@/components/global/ColorPicker';
  import { UploadImage } from '/@/components/global/UploadImage';
  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      const { pageConfig } = storeToRefs(editorStore);
      return () => (
        <div class="config-manager-page">
          <div class="config-manager-head">页面配置</div>
          <div class="config-manager-body">
            <div class="page-config">
              <div class="page-config-wp">
                <Form
                  class="config-form"
                  colon={false}
                  labelCol={{ span: 8 }}
                  size={'small'}
                  labelAlign={'left'}
                >
                  <Form.Item label="屏幕大小">
                    <InputNumber
                      v-model:value={pageConfig.value.width}
                      class="mr-2"
                      size={'small'}
                    ></InputNumber>
                    <InputNumber
                      v-model:value={pageConfig.value.height}
                      size={'small'}
                    ></InputNumber>
                  </Form.Item>
                  <Form.Item label="背景颜色">
                    <ColorPicker v-model:value={pageConfig.value.bgcolor}></ColorPicker>
                  </Form.Item>
                  <Form.Item label="背景图">
                    <UploadImage v-model={pageConfig.value.bgimage}></UploadImage>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
