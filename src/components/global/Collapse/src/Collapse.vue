<script lang="tsx">
  import { defineComponent, ref, toRef, watch } from 'vue';
  import { Collapse, Switch } from 'ant-design-vue';
  export default defineComponent({
    props: {
      label: String,
      toggle: Boolean,
      modelValue: Boolean,
    },
    emits: ['update:modelValue'],
    setup(props, { slots, emit }) {
      const modelValue = toRef(props, 'modelValue');
      const activeKey = ref('');
      const toggleVisible = (val) => {
        emit('update:modelValue', val);
      };
      watch(modelValue, (val) => {
        if (!val) {
          activeKey.value = '';
        }
      });
      return () => (
        <Collapse
          v-model:activeKey={activeKey.value}
          class="config-collapse"
          bordered={false}
          expandIconPosition={'right'}
          collapsible={!props.modelValue && props.toggle ? 'disabled' : 'header'}
        >
          <Collapse.Panel
            key="1"
            v-slots={{
              header: () => (
                <div class={['collapse-text', { 'toggle-collapse': props.toggle }]}>
                  {props.toggle && (
                    <Switch
                      checked={modelValue.value}
                      size={'small'}
                      class="mr-1"
                      onChange={toggleVisible}
                    ></Switch>
                  )}
                  {props.label}
                </div>
              ),
            }}
          >
            {slots?.default?.()}
          </Collapse.Panel>
        </Collapse>
      );
    },
  });
</script>
<style lang="less" scoped></style>
