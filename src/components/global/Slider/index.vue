<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Slider, InputNumber } from 'ant-design-vue';
  export default defineComponent({
    props: {
      min: Number,
      max: Number,
      step: Number,
      value: Number,
    },
    emits: ['update:value'],
    setup(props, { emit }) {
      return () => (
        <div class="flex items-center">
          <Slider
            {...props}
            class="w-22.5 my-0 ml-0 mr-2"
            tooltipVisible={false}
            onUpdate:value={(val) => emit('update:value', val)}
          ></Slider>
          <InputNumber
            {...props}
            size={'small'}
            onUpdate:value={(val) => emit('update:value', val)}
          ></InputNumber>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>
