<script lang="tsx">
  import { storeToRefs } from 'pinia';
  import { defineComponent, onMounted } from 'vue';
  import Datav from './components/Datav.vue';
  import { PageConfig, ZoomMode } from '/@/components/_editor';
  import { useComStore } from '/@/store/modules/com';
  import { useEditorStore } from '/@/store/modules/editor';
  import { setStyle, on } from '/@/utils/dom';
  export default defineComponent({
    props: {
      screenId: {
        type: [String, Number],
        required: true,
      },
    },
    setup() {
      const editorStore = useEditorStore();
      const comStore = useComStore();
      const { coms } = storeToRefs(comStore);
      const { pageConfig } = storeToRefs(editorStore);
      const resizeAuto = (width: number, height: number) => {
        const cw = document.documentElement.clientWidth;
        const ch = document.documentElement.clientHeight;
        const ratioX = cw / width;
        const ratioY = ch / height;
        setStyle(document.body, {
          transform: `scale(${ratioX}, ${ratioY})`,
          transformOrigin: 'left top',
          backgroundSize: '100% 100%',
        } as CSSStyleDeclaration);
      };

      const resizeWidth = (width: number) => {
        const ratio = document.documentElement.clientWidth / width;
        setStyle(document.body, {
          transform: `scale(${ratio})`,
          transformOrigin: 'left top',
          backgroundSize: '100%',
        } as CSSStyleDeclaration);
      };

      const resizeHeight = (width: number, height: number) => {
        const cw = document.documentElement.clientWidth;
        const ch = document.documentElement.clientHeight;
        const ratio = ch / height;
        const gap = (cw - width * ratio) / 2;
        setStyle(document.body, {
          transform: `scale(${ratio})`,
          transformOrigin: 'left top',
          backgroundSize: `${(width / cw) * ratio * 100}% 100%`,
          backgroundPosition: `${gap.toFixed(3)}px top`,
          marginLeft: `${gap.toFixed(3)}px`,
        } as CSSStyleDeclaration);
      };

      const resizeFull = (width: number, height: number) => {
        const cw = document.documentElement.clientWidth;
        const ch = document.documentElement.clientHeight;
        const ratio = ch / height;
        const gap = (cw - width * ratio) / 2;
        setStyle(document.body, {
          transform: `scale(${ratio})`,
          transformOrigin: 'left top',
          backgroundSize: `${(width / cw) * ratio * 100}% 100%`,
          backgroundPosition: `${gap.toFixed(3)}px top`,
          // marginLeft: `${gap.toFixed(3)}px`,
        } as CSSStyleDeclaration);

        document.documentElement.style.overflowX = 'scroll';
      };

      const resizeNone = () => {
        setStyle(document.body, {
          overflow: 'hidden',
          position: 'relative',
        } as CSSStyleDeclaration);
      };

      const resize = (config: PageConfig) => {
        switch (config.zoomMode) {
          case ZoomMode.auto:
            resizeAuto(config.width, config.height);
            break;
          case ZoomMode.width:
            resizeWidth(config.width);
            break;
          case ZoomMode.height:
            resizeHeight(config.width, config.height);
            break;
          case ZoomMode.full:
            resizeFull(config.width, config.height);
            break;
          default:
            resizeNone();
            break;
        }
      };

      // const initPageInfo = (config: PageConfig) => {
      //   document.title = editorStore.screen.name as string;
      //   document
      //     .querySelector('meta[name="viewport"]')
      //     ?.setAttribute('content', `width=${config.width}`);

      //   setStyle(document.documentElement, {
      //     overflowX: 'hidden',
      //     overflowY: 'visible',
      //   } as CSSStyleDeclaration);

      //   setStyle(document.body, {
      //     width: `${config.width}px`,
      //     height: `${config.height}px`,
      //     backgroundImage: `url(${pageConfig.value.bgimage})`,
      //     backgroundColor: pageConfig.value.bgcolor,
      //   } as CSSStyleDeclaration);

      //   resize(config);
      // };

      onMounted(() => {
        on(window, 'resize', () => {
          resize(pageConfig.value);
        });
      });
      return () => (
        <div class="datav-layout" style={{ visibility: 'visible' }}>
          <div class="sceen">
            {coms.value.map((i) => (
              <Datav key={i.id} com={i}></Datav>
            ))}
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  .datav-layout {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    visibility: hidden;

    .-datav-com.absolute {
      position: absolute !important;
      margin: 0 !important;
    }
  }
</style>
