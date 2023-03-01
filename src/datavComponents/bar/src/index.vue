<script lang="tsx">
  import { computed, defineComponent, PropType, toRef } from 'vue';
  import VChart from 'vue-echarts';
  import VBar from '.';
  export default defineComponent({
    name: 'VBar',
    props: {
      com: {
        type: Object as PropType<VBar>,
        required: true,
      },
    },
    setup(props) {
      const config = toRef(props.com, 'config');
      const attr = toRef(props.com, 'attr');
      const option = computed(() => {
        return config.value;
      });
      const wrapperStyle = computed(() => {
        return {
          width: `${attr.value.w}px`,
          height: `${attr.value.h}px`,
        };
      });

      return () => (
        <div style={wrapperStyle.value}>
          <VChart option={option.value} autoresize></VChart>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>
