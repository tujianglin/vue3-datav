<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Switch } from 'ant-design-vue';
  export default defineComponent({
    props: {
      modelValue: Boolean,
      label: String,
    },
    emits: ['update:modelValue'],
    setup(props, { emit, attrs }) {
      const onChange = (val) => {
        emit('update:modelValue', val);
      };
      return () => (
        <>
          <div>
            <Switch {...attrs} checked={props.modelValue} onChange={onChange}></Switch>
            {props.label && <div class="text-[#5c6366] text-xs">{props.label}</div>}
          </div>
        </>
      );
    },
  });
</script>
<style lang="less" scoped></style>
