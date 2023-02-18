<script lang="tsx">
  import { defineComponent, h, PropType, resolveComponent } from 'vue';
  import { ComType, DatavComponent } from '/@/components/_models/datav-component';
  import TransformLayer from './TransformLayer.vue';

  export default defineComponent({
    name: 'DatavTransform',
    props: {
      com: {
        type: Object as PropType<DatavComponent>,
        required: true,
      },
    },
    setup(props) {
      const create = (com: DatavComponent, parentCom?: DatavComponent, editable?: boolean) => {
        if (com.type === ComType.com) {
          return (
            <TransformLayer com={com} parentCom={parentCom} editable={editable}>
              {h(resolveComponent(com.name), {
                com,
                style: { transform: 'translateZ(0)', opacity: com.attr.opacity },
              })}
            </TransformLayer>
          );
        }
        return (
          <TransformLayer
            com={com}
            parentCom={parentCom}
            editable={editable}
            v-slots={{
              default: ({ data, editable }) => create(data, com, editable),
            }}
          ></TransformLayer>
        );
      };
      return () => create(props.com);
    },
  });
</script>
