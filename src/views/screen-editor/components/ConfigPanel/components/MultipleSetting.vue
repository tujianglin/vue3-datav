<script lang="tsx">
  import { defineComponent } from 'vue';
  import { Form } from 'ant-design-vue';
  import {
    AlignLeftOutlined,
    AlignRightOutlined,
    AlignCenterOutlined,
    VerticalAlignBottomOutlined,
    VerticalAlignMiddleOutlined,
    VerticalAlignTopOutlined,
  } from '@ant-design/icons-vue';
  import { useComStore } from '/@/store/modules/com';
  import { maxBy, minBy } from 'lodash-es';
  export default defineComponent({
    setup() {
      const comStore = useComStore();

      /* 刷新组件盒子位置 */
      const resizeBox = () => {
        const pid = comStore.selectedComs[0].parentId;
        const ps = comStore.getParents(pid as string);
        comStore.resizeParents(ps);
      };

      /* 左对齐 */
      const alignLeft = () => {
        const minCom = minBy(comStore.selectedComs, (com) => com.attr.x);
        comStore.selectedComs.forEach((com) => {
          com.attr.x = minCom!.attr.x;
        });
        resizeBox();
      };

      const alignCenter = () => {
        const maxCom = maxBy(comStore.selectedComs, (com) => com.attr.w);
        comStore.selectedComs.forEach((com) => {
          const diff = maxCom!.attr.w - com.attr.w;
          com.attr.x = maxCom!.attr.x + Math.round(diff / 2);
        });
        resizeBox();
      };

      const alignRight = () => {
        const maxCom = maxBy(comStore.selectedComs, (com) => com.attr.w);
        comStore.selectedComs.forEach((com) => {
          com.attr.x = maxCom!.attr.x + maxCom!.attr.w - com.attr.w;
        });
        resizeBox();
      };

      const alignTop = () => {
        const minCom = minBy(comStore.selectedComs, (com) => com.attr.y);
        comStore.selectedComs.forEach((com) => {
          com.attr.y = minCom!.attr.y;
        });
        resizeBox();
      };

      const alignMiddle = () => {
        const maxCom = maxBy(comStore.selectedComs, (com) => com.attr.h);
        comStore.selectedComs.forEach((com) => {
          const diff = maxCom!.attr.h - com.attr.h;
          com.attr.y = maxCom!.attr.y + Math.round(diff / 2);
        });
        resizeBox();
      };

      const alignBottom = () => {
        const maxCom = maxBy(comStore.selectedComs, (com) => com.attr.h);
        comStore.selectedComs.forEach((com) => {
          com.attr.y = maxCom!.attr.y + maxCom!.attr.h - com.attr.h;
        });
        resizeBox();
      };

      return () => (
        <div class="config-manager-page">
          <div class="config-manager-head">排列布局</div>
          <div class="config-manager-body">
            <div class="multi-layout-config">
              <Form
                class="config-form"
                colon={false}
                labelCol={{ span: 8 }}
                size={'small'}
                labelAlign={'left'}
              >
                <Form.Item label="对齐">
                  <AlignLeftOutlined
                    class="datav-icon"
                    title="左对齐"
                    onClick={alignLeft}
                  ></AlignLeftOutlined>
                  <AlignCenterOutlined
                    class="datav-icon"
                    title="水平居中对齐"
                    onClick={alignCenter}
                  ></AlignCenterOutlined>
                  <AlignRightOutlined
                    class="datav-icon"
                    title="右对齐"
                    onClick={alignRight}
                  ></AlignRightOutlined>
                  <VerticalAlignTopOutlined
                    class="datav-icon"
                    title="顶对齐"
                    onClick={alignTop}
                  ></VerticalAlignTopOutlined>
                  <VerticalAlignMiddleOutlined
                    class="datav-icon"
                    title="垂直居中对齐"
                    onClick={alignMiddle}
                  ></VerticalAlignMiddleOutlined>
                  <VerticalAlignBottomOutlined
                    class="datav-icon"
                    title="底对齐"
                    onClick={alignBottom}
                  ></VerticalAlignBottomOutlined>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
