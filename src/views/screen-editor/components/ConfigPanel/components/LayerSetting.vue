<script lang="tsx">
  import { ComputedRef, defineComponent, inject, watch } from 'vue';
  import { Form, InputNumber } from 'ant-design-vue';
  import { comInjectionKey } from '../config';
  import DatavGroup from '/@/components/_group';
  import Slider from '/@/components/global/Slider/index.vue';
  export default defineComponent({
    setup() {
      const com = inject(comInjectionKey) as ComputedRef<DatavGroup>;
      watch(com.value.scaling, (val) => {
        com.value.attr.w = val.w;
        com.value.attr.h = val.h;
      });
      return () => (
        <div class="config-manager-page">
          <div class="config-manager-head">组内配置</div>
          <div class="config-manager-body">
            <div class="layer-setting-panel">
              <Form colon={false} labelCol={{ span: 8 }} size={'small'} labelAlign={'left'}>
                <Form.Item label="图表尺寸">
                  <InputNumber
                    class="mr-2"
                    size={'small'}
                    v-model:value={com.value.scaling.w}
                    min={10}
                    max={888888}
                  ></InputNumber>
                  <InputNumber
                    size={'small'}
                    v-model:value={com.value.scaling.h}
                    min={10}
                    max={888888}
                  ></InputNumber>
                </Form.Item>
                <Form.Item label="图表位置">
                  <InputNumber
                    class="mr-2"
                    size={'small'}
                    v-model:value={com.value.attr.x}
                  ></InputNumber>
                  <InputNumber size={'small'} v-model:value={com.value.attr.y}></InputNumber>
                </Form.Item>
                <Form.Item label="透明度">
                  <Slider
                    v-model:value={com.value.attr.opacity}
                    min={0}
                    max={1}
                    step={0.05}
                  ></Slider>
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
  @import url('../index.less');
</style>
