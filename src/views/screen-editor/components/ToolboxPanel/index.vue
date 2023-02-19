<script lang="tsx">
  import { storeToRefs } from 'pinia';
  import { defineComponent, ref, watch } from 'vue';
  import { Tooltip, Switch, message } from 'ant-design-vue';
  import { useEditorStore } from '/@/store/modules/editor';
  import { useToolbarStore } from '/@/store/modules/toolbar';
  export default defineComponent({
    setup() {
      const toolbarStore = useToolbarStore();
      const editorStore = useEditorStore();
      const { toolbox } = storeToRefs(toolbarStore);
      const { pageConfig, referLine, alignLine } = storeToRefs(editorStore);
      const visible = ref(false);

      watch(
        () => pageConfig.value.styleFilterParams.enable,
        (val) => {
          console.log(val);
          visible.value = val;
          message.success({
            content: val ? '滤镜已开启应用' : '滤镜已关闭',
            duration: 0,
          });
        },
      );

      return () => (
        <div class={['toolbox-panel-wp', { '--hide': !toolbox.value.show }]}>
          <div class="toolbox-panel">
            <div class="btn-box">
              <span class="btn-text">参考线</span>
              <Switch v-model:checked={referLine.value.enable}></Switch>
            </div>
            <div class="btn-box">
              <Tooltip placement={'bottom'} title="组件数量多时，容易卡顿，建议关闭">
                <span class="btn-text --help">对齐线</span>
              </Tooltip>
              <Switch v-model:checked={alignLine.value.enable}></Switch>
            </div>
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  @import url('./index.less');
</style>
