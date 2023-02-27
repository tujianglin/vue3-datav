<script lang="tsx">
  import { defineComponent, h, PropType, resolveComponent } from 'vue';
  import { ComType, DatavComponent } from '/@/components/_models/datav-component';
  import { DatavGroup } from '/@/components/_group';
  import DatavItem from './DatavItem.vue';
  import DatavLayer from './DatavLayer.vue';

  export default defineComponent({
    name: 'DatavTransform',
    props: {
      com: {
        type: Object as PropType<DatavComponent>,
        required: true,
      },
    },
    setup() {
      const create = (com: DatavComponent) => {
        if (com.type === ComType.com) {
          return <DatavItem com={com}>{h(resolveComponent(com.name), { com })}</DatavItem>;
        }
        return (
          <DatavLayer
            com={com as DatavGroup}
            v-slots={{
              default: ({ data }) => create(data),
            }}
          ></DatavLayer>
        );
      };
      return {
        create,
      };
    },
    render() {
      return this.create(this.$props.com);
    },
  });
</script>
