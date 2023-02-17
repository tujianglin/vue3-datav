<script lang="tsx">
  import { defineComponent } from 'vue';
  import { DatavComponent } from '/@/api/models/component';
  import { useComStore } from '/@/store/modules/com';
  export default defineComponent({
    props: {
      rank: {
        type: Number,
        default: 3,
      },
    },
    setup(props, { slots }) {
      const comStore = useComStore();
      const createNode = (com: DatavComponent, idx: number, level: number) => {
        const data = { com, idx, level };
        if (level < props.rank && com.children && !com.fold) {
          return [slots?.default?.(data), ...create(com.children, level + 1)];
        }
        return slots?.default?.(data);
      };
      const create = (coms: DatavComponent[], level: number) => {
        const len = coms.length - 1;
        return coms.map((_, idx) => {
          return createNode(coms[len - idx], idx, level);
        });
      };
      return () => create(comStore.coms, 0);
    },
  });
</script>
