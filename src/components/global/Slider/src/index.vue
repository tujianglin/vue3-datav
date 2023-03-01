<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Slider, InputNumber } from 'ant-design-vue';
  export default defineComponent({
    props: {
      modelValue: Number,
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 1,
      },
      step: {
        type: Number,
        default: 0.1,
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const onUpdate = (val) => {
        emit('update:modelValue', val);
      };
      return () => (
        <div class="w-full flex items-center justify-between">
          <Slider
            {...props}
            value={props.modelValue}
            class="w-22.5 my-0 ml-0 mr-2"
            tooltipVisible={false}
            onUpdate:value={onUpdate}
          ></Slider>
          <InputNumber
            {...props}
            value={props.modelValue}
            size={'small'}
            onUpdate:value={onUpdate}
          ></InputNumber>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>
