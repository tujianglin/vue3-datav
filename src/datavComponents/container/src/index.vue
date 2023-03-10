<script lang="tsx">
  import {
    defineComponent,
    h,
    PropType,
    toRef,
    resolveComponent,
    ref,
    watch,
    computed,
    CSSProperties,
  } from 'vue';
  import VContainer from '.';
  import { createComponent } from '../../datav';
  import { DatavComponent } from '/@/components/_models/datav-component';
  import { loadCom } from '/@/components/_utils/component-util';
  export default defineComponent({
    name: 'VContainer',
    props: {
      com: {
        type: Object as PropType<VContainer>,
        required: true,
      },
    },
    setup(props) {
      const config = toRef(props.com, 'config');
      const attr = toRef(props.com, 'attr');
      /* 获取到容器内部的组件 */
      const comMap = ref<Map<any, any>>(
        config.value.children ? new Map(config.value.children) : new Map(),
      );
      const editTitle = computed(
        () => config.value.titleName && config.value.children.get(config.value.titleName),
      );
      const editEchart = computed(
        () => config.value.mainName && config.value.children.get(config.value.mainName),
      );
      /* 标题边距 */
      const mpT = computed(() => {
        const { title } = config.value;
        const w = title.margin.left + title.margin.right + title.padding.left + title.padding.right;
        const h = title.margin.top + title.margin.bottom + title.padding.top + title.padding.bottom;
        return {
          w,
          h,
        };
      });
      /* 主体边距 */
      const mpM = computed(() => {
        const { main } = config.value;
        const w = main.margin.left + main.margin.right + main.padding.left + main.padding.right;
        const h = main.margin.top + main.margin.bottom + main.padding.top + main.padding.bottom;
        return {
          w,
          h,
        };
      });
      /* 容器样式 */
      const containerStyle = computed(() => {
        return {
          width: `${attr.value.w}px`,
          height: `${attr.value.h}px`,
        } as CSSProperties;
      });
      /* 标题样式 */
      const titleStyle = computed(() => {
        const { title } = config.value;
        const style: CSSProperties = {
          width: `calc(100% - ${mpT.value.w}px)`,
          height: `${title.h}px`,
          margin: `${title.margin.top}px ${title.margin.right}px ${title.margin.bottom}px ${title.margin.left}px`,
          padding: `${title.padding.top}px ${title.padding.right}px ${title.padding.bottom}px ${title.padding.left}px`,
        };
        // 是否固定宽高
        if (title.hDisabled) {
          style.height = `calc(${title.h}px - ${mpT.value.h}px)`;
        }
        if (title.wDisabled) {
          style.width = `calc(${title.w}px - ${mpT.value.w}px)`;
        }
        return style;
      });
      /* 主体样式 */
      const mainStyle = computed(() => {
        const { main } = config.value;
        const style: CSSProperties = {
          flex: 1,
          width: `calc(100% - ${mpM.value.w}px)`,
          margin: `${main.margin.top}px ${main.margin.right}px ${main.margin.bottom}px ${main.margin.left}px`,
          padding: `${main.padding.top}px ${main.padding.right}px ${main.padding.bottom}px ${main.padding.left}px`,
        };
        // 是否固定宽高
        if (main.hDisabled) {
          style.height = `calc(${main.h}px - ${mpM.value.h}px)`;
        }
        if (main.wDisabled) {
          style.width = `calc(${main.w}px - ${mpM.value.w}px)`;
        }
        return style;
      });
      /* 标题拖拽进入 */
      const onTitleDrop = async (e: DragEvent) => {
        e.preventDefault();
        try {
          const name = e.dataTransfer.getData('text');
          let com = await createComponent(name);
          com.hided = true;
          com.locked = true;
          com.containerCom = true;
          com.attr.h = config.value.title.h;
          com.attr.w = config.value.title.w;
          config.value.titleName = name;
          comMap.value.set(name, com);
          config.value.children = comMap.value;
          await loadCom(com);
        } catch (error) {}
      };
      /* 主体拖拽进入 */
      const onMainDrop = async (e: DragEvent) => {
        e.preventDefault();
        try {
          const name = e.dataTransfer.getData('text');
          let com: DatavComponent = await createComponent(name);
          com.hided = true;
          com.locked = true;
          com.containerCom = true;
          com.attr.h = config.value.main.h;
          com.attr.w = config.value.main.w;
          config.value.mainName = name;
          comMap.value.set(name, com);
          config.value.children = comMap.value;
          await loadCom(com);
        } catch (error) {}
      };

      watch(
        props.com,
        (val) => {
          const { config, attr } = val;
          const { title, main } = config;
          if (config.titleName) {
            const com: DatavComponent = config.children.get(config.titleName);
            com.attr.w = title.wDisabled ? title.w : attr.w;
            com.attr.h = title.h;
          }
          if (config.mainName) {
            const com: DatavComponent = config.children.get(config.mainName);
            const mp =
              main.margin.left + main.margin.right + main.padding.left + main.padding.right;
            com.attr.w = main.wDisabled ? main.w - mp : attr.w - mp;
            com.attr.h = main.hDisabled ? main.h - mp : attr.h - title.h - mp;
          }
        },
        {
          deep: true,
          immediate: true,
        },
      );

      return () => (
        <div class="v-container" style={containerStyle.value}>
          <div class="title" style={titleStyle.value} onDrop={onTitleDrop}>
            <div class="w-full h-full">
              {editTitle.value &&
                h(resolveComponent(config.value.titleName), {
                  com: editTitle.value,
                })}
            </div>
          </div>
          <div class="echart" style={mainStyle.value} onDrop={onMainDrop}>
            <div class="w-full h-full">
              {editEchart.value &&
                h(resolveComponent(config.value.mainName), {
                  com: editEchart.value,
                })}
            </div>
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  .v-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    pointer-events: all;
  }
</style>
