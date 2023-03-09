<script lang="tsx">
  import { ComputedRef, defineComponent, inject } from 'vue';
  import { Form } from 'ant-design-vue';
  import { comInjectionKey } from '../config';
  import DatavGroup from '/@/components/_group';
  import { InputNumber, Slider } from '/@/components/global';
  export default defineComponent({
    setup() {
      const com = inject(comInjectionKey) as ComputedRef<DatavGroup>;
      const updateWidth = (val: number) => {
        com.value.attr.w = val;
      };
      const updateHeight = (val: number) => {
        com.value.attr.h = val;
      };
      return () => (
        <div class="config-manager-page">
          <div class="config-manager-head">组内配置</div>
          <div class="config-manager-body">
            <div class="layer-setting-panel">
              <Form
                class="config-form"
                colon={false}
                labelCol={{ span: 8 }}
                size={'small'}
                labelAlign={'left'}
              >
                <Form.Item label="图表尺寸">
                  <InputNumber
                    v-model={com.value.scaling.w}
                    onUpdate:modelValue={updateWidth}
                  ></InputNumber>
                  <InputNumber
                    v-model={com.value.scaling.h}
                    onUpdate:modelValue={updateHeight}
                  ></InputNumber>
                </Form.Item>
                <Form.Item label="图表位置">
                  <InputNumber v-model={com.value.attr.x}></InputNumber>
                  <InputNumber v-model={com.value.attr.y}></InputNumber>
                </Form.Item>
                <Form.Item label="透明度">
                  <Slider v-model={com.value.attr.opacity} step={0.05}></Slider>
                </Form.Item>
              </Form>
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
