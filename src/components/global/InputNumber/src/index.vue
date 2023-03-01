<script lang="tsx">
  import { defineComponent } from 'vue';
  import { InputNumber } from 'ant-design-vue';
  export default defineComponent({
    props: {
      modelValue: Number,
      label: String,
      step: {
        type: Number,
        default: 1,
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit, attrs }) {
      const onChange = (val) => {
        emit('update:modelValue', val);
      };
      return () => (
        <>
          <div>
            <InputNumber
              {...attrs}
              value={props.modelValue}
              size={'small'}
              step={props.step}
              onChange={onChange}
            ></InputNumber>
            {props.label && <div class="text-[#5c6366] text-xs">{props.label}</div>}
          </div>
        </>
      );
    },
  });
</script>
<style lang="less" scoped></style>
