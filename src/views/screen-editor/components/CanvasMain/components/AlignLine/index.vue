<script lang="tsx">
  import { computed, defineComponent } from 'vue';
  import { useEditorStore } from '/@/store/modules/editor';
  export default defineComponent({
    name: 'AlignLine',
    setup() {
      const editorStore = useEditorStore();
      const alignLine = computed(() => editorStore.alignLine);
      const canvas = computed(() => editorStore.canvas);
      return () => (
        <>
          {alignLine.value.enable && alignLine.value.show && (
            <div class="ident-line-wp">
              <div
                class="ident-line x-line"
                style={{ width: `${canvas.value.width}px`, top: `${alignLine.value.top}px` }}
              ></div>
              <div
                class="ident-line x-line"
                style={{ width: `${canvas.value.width}px`, top: `${alignLine.value.horizontal}px` }}
              ></div>
              <div
                class="ident-line x-line"
                style={{ width: `${canvas.value.width}px`, top: `${alignLine.value.bottom}px` }}
              ></div>
              <div
                class="ident-line y-line"
                style={{ height: `${canvas.value.height}px`, left: `${alignLine.value.left}px` }}
              ></div>
              <div
                class="ident-line y-line"
                style={{
                  height: `${canvas.value.height}px`,
                  left: `${alignLine.value.vertical}px`,
                }}
              ></div>
              <div
                class="ident-line y-line"
                style={{ height: `${canvas.value.height}px`, left: `${alignLine.value.right}px` }}
              ></div>
            </div>
          )}
        </>
      );
    },
  });
</script>
<style lang="less" scoped>
  .ident-line {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    box-sizing: border-box;
  }

  .x-line {
    border-top: 1px dashed var(--datav-sort-line-border-color);
  }

  .y-line {
    border-left: 1px dashed var(--datav-sort-line-border-color);
  }
</style>
