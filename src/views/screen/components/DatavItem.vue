<script lang="tsx">
  import { computed, defineComponent, h, PropType, resolveComponent } from 'vue';
  import { DatavComponent } from '/@/components/_models/datav-component';
  import { useEditorStore } from '/@/store/modules/editor';
  export default defineComponent({
    props: {
      com: {
        type: Object as PropType<DatavComponent>,
        required: true,
      },
    },
    setup(props) {
      const editorStore = useEditorStore();
      const styleFilter = computed(() => {
        const sf = editorStore.pageConfig.styleFilterParams;
        let filter = '';
        if (sf.enable) {
          filter = `hue-rotate(${sf.hue}deg) contrast(${sf.contrast}%) opacity(${sf.opacity}%) saturate(${sf.saturate}%) brightness(${sf.brightness}%)`;
        }
        return filter;
      });
      return () => (
        <div
          style={{
            'pointer-events': 'none',
            'z-index': 0,
            left: props.com.attr.x + 'px',
            top: props.com.attr.y + 'px',
            width: props.com.attr.w + 'px',
            height: props.com.attr.h + 'px',
            opacity: props.com.attr.opacity,
            transform: `rotate(${props.com.attr.deg}deg) ${
              props.com.attr.filpH ? 'scaleX(-1)' : ''
            } ${props.com.attr.filpV ? 'scaleY(-1)' : ''}`,
            filter: styleFilter.value,
          }}
          class="-datav-com absolute"
        >
          {h(resolveComponent(props.com.name), {
            com: props.com,
            style: { 'pointer-events': 'auto' },
          })}
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>
