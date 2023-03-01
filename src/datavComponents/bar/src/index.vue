<script lang="tsx">
  import { EChartsOption } from 'echarts';
  import { computed, defineComponent, PropType, toRef } from 'vue';
  import { use } from 'echarts/core';
  import { CanvasRenderer } from 'echarts/renderers';
  import { BarChart } from 'echarts/charts';
  import { GridComponent, TooltipComponent, LegendComponent } from 'echarts/components';
  import VChart from 'vue-echarts';
  import VBar from '.';
  import { getFieldMap, useDataCenter } from '/@/components/_mixins/use-data-center';
  import { useApiStore } from '/@/store/modules/api';
  import { groupBy } from 'lodash-es';
  use([CanvasRenderer, BarChart, GridComponent, TooltipComponent, LegendComponent]);
  export default defineComponent({
    name: 'VBar',
    props: {
      com: {
        type: Object as PropType<VBar>,
        required: true,
      },
    },
    setup(props) {
      const apiStore = useApiStore();
      const config = toRef(props.com, 'config');
      const attr = toRef(props.com, 'attr');
      useDataCenter(props.com);
      const dv_data = computed(() => {
        return apiStore.dataMap[props.com.id]?.source ?? [];
      });
      const dv_field = computed(() => {
        return getFieldMap(props.com.apis.source.fields);
      });
      const chartData = computed(() => {
        const groups = groupBy(dv_data.value, (item) => item[dv_field.value.x]);
        return {
          keys: Object.keys(groups),
          values: Object.values(groups),
        };
      });
      const getSeries = () => {
        const { series } = config.value;
        const { values } = chartData.value;
        return series.map((item, index) => {
          return {
            type: item.type,
            name: item.name,
            data: values.map((i) => {
              const obj = i[index];
              return {
                value: obj ? obj[dv_field.value.y] : null,
                dataRef: obj ?? {},
              };
            }),
          };
        });
      };
      const option = computed(() => {
        const { echart, xAxis, yAxis } = config.value;
        const opts: EChartsOption | any = {
          grid: {
            ...echart.margin,
          },
          xAxis: {
            show: xAxis.show,
            type: xAxis.type as any,
            data: xAxis.data,
          },
          yAxis: {
            show: true,
            type: yAxis.type as any,
          },
          series: getSeries(),
        };
        return opts;
      });
      const wrapperStyle = computed(() => {
        return {
          width: `${attr.value.w}px`,
          height: `${attr.value.h}px`,
        };
      });

      return () => (
        <div style={wrapperStyle.value}>
          <VChart option={option.value} autoresize></VChart>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>
