<script lang="tsx">
  import { computed, CSSProperties, defineComponent, PropType, toRefs } from 'vue';
  import { VTitle } from './index';
  export default defineComponent({
    name: 'VTitle',
    props: {
      com: {
        type: Object as PropType<VTitle>,
        required: true,
      },
    },
    setup(props) {
      const { com } = toRefs(props);

      const titleStyle = computed(() => {
        const style = {
          width: `${com.value.attr.w}px`,
          height: `${com.value.attr.h}px`,
          'font-size': `${com.value.config.textStyle.fontSize}px`,
          'font-weight': com.value.config.textStyle.fontWeight,
          'justify-content': com.value.config.textAlign,
          'writing-mode': com.value.config.writingMode,
          'letter-spacing': `${com.value.config.letterSpacing}px`,
          'background-color': 'initial',
          border: 'none',
          'border-radius': '0px',
          transform: 'translateZ(0px)',
          display: 'flex',
          'align-items': 'center',
          'text-overflow': 'ellipsis',
          'white-space': 'nowrap',
          overflow: 'hidden',
        };
        if (com.value.config.backgroundStyle.show) {
          const bgs = com.value.config.backgroundStyle;
          style['background-color'] = bgs.bgColor;
          style.border = `${bgs.borderWidth}px ${bgs.borderStyle} ${bgs.borderColor}`;
          style['border-radius'] = `${bgs.borderRadius}px`;
        }
        return style as CSSProperties;
      });
      const titleText = computed(() => com.value.config.title);
      return () => (
        <div class="datav-wrapper" style={titleStyle.value}>
          {titleText.value}
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>
