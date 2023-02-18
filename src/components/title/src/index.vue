<script lang="tsx">
  import { defineComponent, PropType } from 'vue';
  import { Title } from './index';
  export default defineComponent({
    name: 'Title',
    props: {
      com: {
        type: Object as PropType<Title>,
        required: true,
      },
    },
    setup() {
      return () => <div>1111111111</div>;
    },
  });
</script>
<style lang="less" scoped></style>
