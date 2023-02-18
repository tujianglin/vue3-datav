<script lang="tsx">
  import { defineComponent, ref, watch } from 'vue';
  import { Popover, Slider } from 'ant-design-vue';
  import Icon from '/@/components/Icon';
  import { useEditorStore } from '/@/store/modules/editor';
  import { useToolbarStore } from '/@/store/modules/toolbar';
  export default defineComponent({
    setup() {
      const editorStore = useEditorStore();
      const toolbarStore = useToolbarStore();
      const scale = ref(20);
      const inputScale = ref(20);
      const scaleList = [
        { label: '200%', value: 200 },
        { label: '150%', value: 150 },
        { label: '100%', value: 100 },
        { label: '50%', value: 50 },
        { label: '自适应', value: -1 },
      ];
      const submitScale = (val: number) => {
        if (val === -1) {
          editorStore.autoCanvasScale(() => toolbarStore.getPanelOffset);
        } else {
          editorStore.setCanvasScale(
            val === 0 ? inputScale.value : val,
            toolbarStore.getPanelOffset.x,
            toolbarStore.getPanelOffset.y,
          );
        }
      };
      watch(
        () => editorStore.canvas.scale,
        (s) => {
          const val = parseInt((s * 100).toFixed(2));
          scale.value = val;
          inputScale.value = val;
        },
      );
      return () => (
        <div class="g-footer bottom-sider">
          <Popover
            placement={'top'}
            trigger={'click'}
            style={[{ '--n-color': 'var(--datav-component-bg)' }]}
            v-slots={{
              content: () => (
                <div class="shortcut-wp">
                  <div class="shortcut-item">
                    <div class="shortcut-title">开关图层面板</div>
                    <div class="shortcut-value">Ctrl/Cmd + ←</div>
                  </div>
                  <div class="shortcut-item">
                    <div class="shortcut-title">切换组件面板</div>
                    <div class="shortcut-value">Ctrl/Cmd + ↑</div>
                  </div>
                  <div class="shortcut-item">
                    <div class="shortcut-title">切换右侧面板</div>
                    <div class="shortcut-value">Ctrl/Cmd + →</div>
                  </div>
                  <div class="shortcut-item">
                    <div class="shortcut-title">画布缩放到最佳位置</div>
                    <div class="shortcut-value">Ctrl/Cmd + a</div>
                  </div>
                </div>
              ),
            }}
          >
            <Icon class="shortcut-btn" icon="material-symbols:keyboard-hide-outline-rounded"></Icon>
          </Popover>
          <div class="scale-input-wp">
            <input
              v-model={inputScale.value}
              type="number"
              class="scale-input"
              onKeydown={(e: KeyboardEvent) => e.code === 'Enter' && submitScale(0)}
            />
            <span class="percent">%</span>
            <Popover
              trigger={'click'}
              placement={'topRight'}
              style={{
                '--n-color': 'var(--datav-component-bg)',
                '--n-space': '12px',
                'margin-right': '-4px',
              }}
              v-slots={{
                content: () => (
                  <div class="scale-value-list">
                    {scaleList.map((i) => (
                      <div class="scale-value-item" onClick={() => submitScale(i.value)}>
                        {i.label}
                      </div>
                    ))}
                  </div>
                ),
              }}
            >
              <Icon class="open-icon" icon="ant-design:down-outlined"></Icon>
            </Popover>
          </div>
          <div class="scale-slider-wp">
            <Slider
              v-model:value={scale.value}
              min={10}
              max={200}
              step={5}
              tooltipVisible={false}
              onChange={submitScale}
            ></Slider>
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
