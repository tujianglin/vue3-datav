<script lang="tsx">
  import { defineComponent, PropType, toRef } from 'vue';
  import { VBar } from '.';
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
      console.log(config);
      return () => <div>111</div>;
    },
  });
</script>
<style lang="less" scoped></style>
