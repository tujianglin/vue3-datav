<script lang="tsx">
  import { defineComponent, PropType, toRef } from 'vue';
  import { VContainer } from '.';
  import { Form } from 'ant-design-vue';
  import { InputNumber, Collapse, Switch } from '/@/components/global';
  export default defineComponent({
    name: 'VContainerProp',
    props: {
      com: {
        type: Object as PropType<VContainer>,
        required: true,
      },
    },
    setup(props) {
      const config = toRef(props.com, 'config');
      const com = toRef(props, 'com');
      return () => (
        <Form
          class="config-form"
          colon={false}
          labelCol={{ span: 8 }}
          size={'small'}
          labelAlign={'left'}
        >
          <Form.Item label="编辑">
            <Switch v-model={com.value.draged}></Switch>
          </Form.Item>
          <Collapse label="标题">
            <Form.Item label="宽度">
              <Switch v-model={config.value.title.wDisabled} label="是否固定"></Switch>
              <InputNumber
                disabled={!config.value.title.wDisabled}
                v-model={config.value.title.w}
                label="宽度"
              ></InputNumber>
            </Form.Item>
            <Form.Item label="高度">
              <Switch v-model={config.value.title.hDisabled} label="是否固定"></Switch>
              <InputNumber
                disabled={!config.value.title.hDisabled}
                v-model={config.value.title.h}
                label="宽度"
              ></InputNumber>
            </Form.Item>
            <Form.Item label="内边距">
              <InputNumber v-model={config.value.title.padding.top} label="上边距"></InputNumber>
              <InputNumber v-model={config.value.title.padding.bottom} label="下边距"></InputNumber>
            </Form.Item>
            <Form.Item label=" ">
              <InputNumber v-model={config.value.title.padding.left} label="左边距"></InputNumber>
              <InputNumber v-model={config.value.title.padding.right} label="右边距"></InputNumber>
            </Form.Item>
            <Form.Item label="外边距">
              <InputNumber v-model={config.value.title.margin.top} label="上边距"></InputNumber>
              <InputNumber v-model={config.value.title.margin.bottom} label="下边距"></InputNumber>
            </Form.Item>
            <Form.Item label=" ">
              <InputNumber v-model={config.value.title.margin.left} label="左边距"></InputNumber>
              <InputNumber v-model={config.value.title.margin.right} label="右边距"></InputNumber>
            </Form.Item>
          </Collapse>
          <Collapse label="主体">
            <Form.Item label="宽度">
              <Switch v-model={config.value.main.wDisabled} label="是否固定"></Switch>
              <InputNumber
                disabled={!config.value.main.wDisabled}
                v-model={config.value.main.w}
                label="宽度"
              ></InputNumber>
            </Form.Item>
            <Form.Item label="高度">
              <Switch v-model={config.value.main.hDisabled} label="是否固定"></Switch>
              <InputNumber
                disabled={!config.value.main.hDisabled}
                v-model={config.value.main.h}
                label="宽度"
              ></InputNumber>
            </Form.Item>
            <Form.Item label="内边距">
              <InputNumber v-model={config.value.main.padding.top} label="上边距"></InputNumber>
              <InputNumber v-model={config.value.main.padding.bottom} label="下边距"></InputNumber>
            </Form.Item>
            <Form.Item label=" ">
              <InputNumber v-model={config.value.main.padding.left} label="左边距"></InputNumber>
              <InputNumber v-model={config.value.main.padding.right} label="右边距"></InputNumber>
            </Form.Item>
            <Form.Item label="外边距">
              <InputNumber v-model={config.value.main.margin.top} label="上边距"></InputNumber>
              <InputNumber v-model={config.value.main.margin.bottom} label="下边距"></InputNumber>
            </Form.Item>
            <Form.Item label=" ">
              <InputNumber v-model={config.value.main.margin.left} label="左边距"></InputNumber>
              <InputNumber v-model={config.value.main.margin.right} label="右边距"></InputNumber>
            </Form.Item>
          </Collapse>
        </Form>
      );
    },
  });
</script>
<style lang="less" scoped></style>
