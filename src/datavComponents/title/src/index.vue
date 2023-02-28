<script lang="tsx">
  import { computed, CSSProperties, defineComponent, PropType, toRef } from 'vue';
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
      const config = toRef(props.com, 'config');
      const attr = toRef(props.com, 'attr');

      const titleStyle = computed(() => {
        const style = {
          width: `${attr.value.w}px`,
          height: `${attr.value.h}px`,
          'font-size': `${config.value.textStyle.fontSize}px`,
          'font-weight': config.value.textStyle.fontWeight,
          'justify-content': config.value.textAlign,
          'writing-mode': config.value.writingMode,
          'letter-spacing': `${config.value.letterSpacing}px`,
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
        if (config.value.backgroundStyle.show) {
          const bgs = config.value.backgroundStyle;
          style['background-color'] = bgs.bgColor;
          style.border = `${bgs.borderWidth}px ${bgs.borderStyle} ${bgs.borderColor}`;
          style['border-radius'] = `${bgs.borderRadius}px`;
        }
        return style as CSSProperties;
      });
      const titleText = computed(() => config.value.title);
      const wordStyle = computed(() => {
        const style = {
          color: config.value.textStyle.color,
          overflow: 'unset',
          'text-overflow': 'unset',
          'white-space': 'unset',
          'background-image': 'none',
          'background-clip': 'unset',
          '-webkit-text-fill-color': 'initial',
        };

        if (config.value.ellipsis) {
          style.overflow = 'hidden';
          style['text-overflow'] = 'ellipsis';
          style['white-space'] = 'nowrap';
        }

        return style as CSSProperties;
      });
      return () => (
        <div class="datav-wrapper" style={titleStyle.value}>
          <span style={wordStyle.value}>{titleText.value}</span>
        </div>
      );
    },
  });
</script>
