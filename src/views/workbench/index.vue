<script lang="tsx">
  import { defineComponent, reactive, ref } from 'vue';
  import { ElForm, ElFormItem, ElDatePicker, ElButton, ElCard, ElSwitch } from 'element-plus';
  import MapEchart from './components/MapEchart.vue';
  import UserTable from './components/UserTable.vue';
  export default defineComponent({
    setup() {
      const ruleForm = reactive({
        date: [],
      });
      const echartLoop = ref(true);
      return () => (
        <div>
          <div class="flex items-center">
            <ElForm inline size={'default'}>
              <ElFormItem label="日期">
                <ElDatePicker
                  v-model={ruleForm.date}
                  type={'daterange'}
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></ElDatePicker>
              </ElFormItem>
              <ElFormItem>
                <ElButton type={'primary'}>查询</ElButton>
              </ElFormItem>
            </ElForm>
            <ElSwitch
              v-model={echartLoop.value}
              active-text="开启循环"
              inactive-text="关闭循环"
              inline-prompt
            ></ElSwitch>
          </div>
          <div>
            <ElCard class="mb-2 mt-2">
              <MapEchart v-model={echartLoop.value}></MapEchart>
            </ElCard>
            <ElCard class="h-133">
              <UserTable></UserTable>
            </ElCard>
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  :deep(.el-form-item) {
    margin-bottom: 0px;
  }

  .echart {
    height: calc(100vh - 140px);
  }
</style>
