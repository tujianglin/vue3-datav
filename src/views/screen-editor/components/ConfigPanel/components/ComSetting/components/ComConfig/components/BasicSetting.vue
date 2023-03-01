<script lang="tsx">
  import { defineComponent, inject, ref, watch } from 'vue';
  import { comInjectionKey } from '../../../../../config';
  import { Form, Tooltip, Button } from 'ant-design-vue';
  import { Slider, InputNumber } from '/@/components/global';
  import Icon from '/@/components/global/Icon';
  type filpType = 'v' | 'h';

  export default defineComponent({
    setup() {
      const com = inject(comInjectionKey);
      const filps = ref<filpType[]>([]);
      watch(com.value.scaling, (val) => {
        com.value.attr.w = val.w;
        com.value.attr.h = val.h;
      });
      const onRotateChange = (e: MouseEvent) => {
        const el = e.target as HTMLElement;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = (Math.atan2(centerY - e.clientY, centerX - e.clientX) * 180) / Math.PI - 90;
        const deg = Math.round(angle % 360);
        com.value.attr.deg = deg < 0 ? deg + 360 : deg;
      };
      const onFilpChange = (key: filpType) => {
        if (filps.value.includes(key)) {
          filps.value = filps.value.filter((m) => m !== key);
        } else {
          filps.value.push(key);
        }
        com.value.attr.filpV = filps.value.includes('v');
        com.value.attr.filpH = filps.value.includes('h');
      };
      return () => (
        <div class="basic-setting">
          <Form
            class="config-form"
            colon={false}
            labelCol={{ span: 8 }}
            size={'small'}
            labelAlign={'left'}
          >
            <Form.Item label="图表尺寸">
              <InputNumber v-model={com.value.scaling.w}></InputNumber>
              <InputNumber v-model={com.value.scaling.h}></InputNumber>
            </Form.Item>
            <Form.Item label="图表位置">
              <InputNumber v-model={com.value.attr.x}></InputNumber>
              <InputNumber v-model={com.value.attr.y}></InputNumber>
            </Form.Item>
            <Form.Item label="旋转角度">
              <div class="flex items-center justify-between w-full">
                <InputNumber v-model={com.value.attr.deg}></InputNumber>
                <div class="rotate-wp">
                  <div class="rotate-icon-wp mr-0.5" onClick={onRotateChange}>
                    <span
                      class="rotate-icon"
                      style={{ transform: `rotate(${com.value.attr.deg}deg)` }}
                    ></span>
                  </div>
                  <div class="rotate-flip-wp">
                    <Tooltip mouseEnterDelay={0.5} title="水平翻转">
                      <Button
                        class={['hor', { '--checked': filps.value.includes('h') }]}
                        onClick={() => onFilpChange('h')}
                      >
                        <Icon icon="fluent:flip-horizontal-16-regular"></Icon>
                      </Button>
                    </Tooltip>
                    <Tooltip mouseEnterDelay={0.5} title="垂直翻转">
                      <Button
                        class={['hor', { '--checked': filps.value.includes('v') }]}
                        onClick={() => onFilpChange('v')}
                      >
                        <Icon icon="fluent:flip-vertical-16-regular"></Icon>
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </Form.Item>
            <Form.Item label="透明度">
              <Slider v-model={com.value.attr.opacity} step={0.05}></Slider>
            </Form.Item>
          </Form>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  @import '../../../../index.less';

  .ant-form :deep(.ant-form-item:first-child) {
    padding-top: 8px;
  }

  .rotate-wp {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 88px;
    flex: 0 0 88px;
  }

  .rotate-icon-wp {
    width: 22px;
    height: 20px;
    padding-left: 2px;

    .rotate-icon {
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background: linear-gradient(0deg, #eee 100%, #999 0);
      position: relative;
      pointer-events: none;

      &::before {
        content: '';
        display: block;
        width: 4px;
        height: 4px;
        border-radius: 2px;
        background: var(--datav-bgcolor-1);
        position: absolute;
        top: 1px;
        left: 8px;
      }
    }
  }
  .rotate-flip-wp {
    display: inline-block;

    .hor,
    .ver {
      display: inline-block;
      width: 24px;
      height: 24px;
      border: var(--datav-outline);
      cursor: pointer;
      color: var(--datav-font-color);
      background-color: var(--datav-gui-component-bgcolor);
      padding: 0;

      &.--checked,
      &:hover {
        border-color: var(--datav-main-color);
      }

      &:active {
        background: rgb(0 0 0 / 50%);
      }
    }

    .hor {
      margin-left: 8px;
    }
  }
</style>
