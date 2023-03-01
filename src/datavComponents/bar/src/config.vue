<script lang="tsx">
  import { defineComponent, PropType, toRef } from 'vue';
  import { VBar } from '.';
  import { Form } from 'ant-design-vue';
  import { Collapse, InputNumber } from '/@/components/global';
  export default defineComponent({
    name: 'VBarProp',
    props: {
      com: {
        type: Object as PropType<VBar>,
        required: true,
      },
    },
    setup(props) {
      const config = toRef(props.com, 'config');
      return () => (
        <Form
          class="config-form"
          colon={false}
          labelCol={{ span: 8 }}
          size={'small'}
          labelAlign={'left'}
        >
          <Collapse label="图形">
            <Form.Item label="边距">
              <InputNumber v-model={config.value.echart.margin.top} label="上边距"></InputNumber>
              <InputNumber v-model={config.value.echart.margin.bottom} label="下边距"></InputNumber>
            </Form.Item>
            <Form.Item label=" ">
              <InputNumber v-model={config.value.echart.margin.left} label="左边距"></InputNumber>
              <InputNumber v-model={config.value.echart.margin.right} label="右边距"></InputNumber>
            </Form.Item>
          </Collapse>
        </Form>
      );
    },
  });
</script>
<style lang="less" scoped></style>
