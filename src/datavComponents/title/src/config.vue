<script lang="tsx">
  import { defineComponent, PropType, toRef } from 'vue';
  import { Form, Input } from 'ant-design-vue';
  import { VTitle } from '.';
  export default defineComponent({
    name: 'VTitleProp',
    props: {
      com: {
        type: Object as PropType<VTitle>,
        required: true,
      },
    },
    setup(props) {
      const config = toRef(props.com, 'config');
      console.log(config);
      return () => (
        <div>
          <Form
            class="config-form"
            colon={false}
            labelCol={{ span: 8 }}
            size={'small'}
            labelAlign={'left'}
          >
            <Form.Item label="标题名">
              <Input v-model:value={config.value.title} size={'small'}></Input>
            </Form.Item>
          </Form>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>
