<script lang="tsx">
  import { defineComponent, PropType, toRef } from 'vue';
  import { Form, Input, InputNumber, Select, Tooltip, Switch } from 'ant-design-vue';
  import { Collapse } from '/@/components/global/Collapse';
  import { ColorPicker } from '/@/components/global/ColorPicker';
  import { VTitle } from '.';
  import { fontWeights, hAligns, writingModes, lineStyles } from '/@/data/select-options';
  export default defineComponent({
    name: 'VTitleProp',
    props: {
      com: {
        type: Object as PropType<VTitle>,
        required: true,
      },
    },
    setup(props) {
      const config = toRef(props.com, 'config');
      return () => (
        <div>
          <Form
            class="config-form"
            colon={false}
            labelCol={{ span: 8 }}
            size={'small'}
            labelAlign={'left'}
          >
            <Form.Item label="标题名">
              <Input v-model:value={config.value.title} size={'small'}></Input>
            </Form.Item>
            <Collapse label="文本样式">
              <Form.Item label="字号">
                <InputNumber
                  class="w-full"
                  size={'small'}
                  v-model:value={config.value.textStyle.fontSize}
                  addonAfter="px"
                  step={1}
                  min={12}
                  max={100}
                ></InputNumber>
              </Form.Item>
              <Form.Item label="颜色">
                <ColorPicker v-model:value={config.value.textStyle.color}></ColorPicker>
              </Form.Item>
              <Form.Item label="字体粗细">
                <Select
                  size={'small'}
                  v-model:value={config.value.textStyle.fontWeight}
                  options={fontWeights}
                ></Select>
              </Form.Item>
            </Collapse>
            <Form.Item label="对齐方式">
              <Select
                size={'small'}
                v-model:value={config.value.textAlign}
                options={hAligns}
              ></Select>
            </Form.Item>
            <Form.Item label="文字排列方式">
              <Select
                size={'small'}
                v-model:value={config.value.writingMode}
                options={writingModes}
              ></Select>
            </Form.Item>
            <Form.Item label="文字间隔">
              <InputNumber
                class="w-full"
                size={'small'}
                v-model:value={config.value.letterSpacing}
                step={0.5}
                addonAfter="px"
              ></InputNumber>
            </Form.Item>
            <Collapse label="背景样式" toggle v-model={config.value.backgroundStyle.show}>
              <Form.Item label="背景色">
                <ColorPicker v-model:value={config.value.backgroundStyle.bgColor}></ColorPicker>
              </Form.Item>
              <Form.Item label="圆角">
                <InputNumber
                  class="w-full"
                  size={'small'}
                  v-model:value={config.value.backgroundStyle.borderRadius}
                  addonAfter="px"
                  step={1}
                  min={0}
                  max={88888}
                ></InputNumber>
              </Form.Item>
              <Form.Item label="边框颜色">
                <ColorPicker v-model:value={config.value.backgroundStyle.borderColor}></ColorPicker>
              </Form.Item>
              <Form.Item label="边框线条">
                <Select
                  size={'small'}
                  v-model:value={config.value.backgroundStyle.borderStyle}
                  options={lineStyles}
                ></Select>
              </Form.Item>
              <Form.Item label="边框粗细">
                <InputNumber
                  class="w-full"
                  size={'small'}
                  v-model:value={config.value.backgroundStyle.borderWidth}
                  addonAfter="px"
                  step={1}
                  min={0}
                  max={88888}
                ></InputNumber>
              </Form.Item>
            </Collapse>
            <Form.Item
              v-slots={{
                label: () => (
                  <Tooltip placement={'bottom'} title="溢出文本加省略号">
                    <span class="tip-help">省略号</span>
                  </Tooltip>
                ),
              }}
            >
              <Switch v-model:checked={config.value.ellipsis}></Switch>
            </Form.Item>
          </Form>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>
