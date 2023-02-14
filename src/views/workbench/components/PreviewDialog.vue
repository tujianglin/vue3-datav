<script lang="tsx">
  import { defineComponent, ref } from 'vue';
  import { ElDialog, ElTable, ElTableColumn } from 'element-plus';
  export default defineComponent({
    setup(_, { expose }) {
      const dialogVisible = ref<boolean>(false);
      const dialogModel = ref();
      const columns = [
        {
          prop: 'date',
          label: '时间',
        },
        {
          prop: 'name',
          label: '姓名',
        },
        {
          prop: 'address',
          label: '地址',
        },
      ];
      const tableData = [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ];
      const show = (val) => {
        dialogModel.value = val;
        dialogVisible.value = true;
      };
      expose({
        show,
      });
      return () => (
        <ElDialog v-model={dialogVisible.value} title={dialogModel.value?.name}>
          <ElTable data={tableData}>
            {columns.map((i) => (
              <ElTableColumn {...i}></ElTableColumn>
            ))}
          </ElTable>
        </ElDialog>
      );
    },
  });
</script>
<style lang="less" scoped></style>
