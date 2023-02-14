<script lang="tsx">
  import { defineComponent } from 'vue';
  import { ElTable, ElTableColumn } from 'element-plus';
  import type { TableColumnCtx } from 'element-plus';
  export default defineComponent({
    setup() {
      const columns: Partial<TableColumnCtx<any>>[] = [
        {
          prop: 'name',
          label: '姓名',
          fixed: 'left',
        },
        {
          prop: 'date',
          label: '时间',
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
      return () => (
        <>
          <ElTable data={tableData}>
            {columns.map((i) => (
              <ElTableColumn {...i}></ElTableColumn>
            ))}
          </ElTable>
        </>
      );
    },
  });
</script>
<style lang="less" scoped></style>
