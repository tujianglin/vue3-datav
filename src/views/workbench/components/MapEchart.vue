<script lang="tsx">
  import { defineComponent, onMounted, Ref, ref, toRefs, watch } from 'vue';
  import { EChartsOption } from 'echarts';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { getMapData } from '/@/api/workbench';
  import PreviewDialog from './PreviewDialog.vue';
  export default defineComponent({
    props: {
      modelValue: Boolean,
    },
    setup(prop, { emit }) {
      const { modelValue } = toRefs(prop);
      const timer = ref(); // 定时器
      const previewDialogRef = ref();
      const bar = ref<HTMLDivElement | null>(null);
      const { setOptions, echarts, getInstance } = useECharts(bar as Ref<HTMLDivElement>);
      watch(modelValue, (val) => {
        if (!val) {
          clearInterval(timer.value);
        } else {
          renderEchart();
        }
        emit('update:modelValue', val);
      });
      onMounted(() => {
        renderEchart();
      });
      const renderEchart = async () => {
        const china = await getMapData();
        const data: any = [];
        china.features.map((i) => {
          if (i?.properties?.name) {
            data.push({
              name: i.properties.name,
              value: Math.ceil(Math.random() * 100),
            });
          }
        });
        // 隐藏海南诸岛
        data.push({
          name: '南海诸岛',
          value: 0,
          itemStyle: { opacity: 0 },
        });
        data.sort((a, b) => a.value - b.value);
        const myEchart = getInstance();
        echarts.registerMap('china', china as any);

        const mapOption: EChartsOption = {
          visualMap: {
            left: 'right',
            calculable: true,
            min: 0,
            max: 100,
          },
          tooltip: {
            show: true,
            formatter: (val) => {
              return `<div>
                  <div>${val.data?.['name'] || '南海诸岛'}: ${val.data?.['value'] || '0'}</div>
                </div>`;
            },
          },
          geo: {
            show: true,
            map: 'china',
            zoom: 1.3,
            top: 100,
            roam: false,
            regions: [
              {
                name: '南海诸岛',
                itemStyle: {
                  opacity: 0,
                },
                label: {
                  show: false,
                },
              },
            ],
          },
          series: {
            id: 'population',
            type: 'map',
            roam: false,
            map: 'china',
            animationDurationUpdate: 1000,
            universalTransition: true,
            data: data,
            top: 100,
            zoom: 1.3,
            label: {
              show: true,
              formatter: (val: any) => {
                return val?.data?.value || '';
              },
            },
          },
        };
        const barOption: EChartsOption = {
          xAxis: {
            type: 'value',
          },
          yAxis: {
            type: 'category',
            data: data.map((i) => i.name),
            axisLabel: {
              rotate: 30,
            },
          },
          grid: {
            left: 100,
          },
          tooltip: {},
          dataZoom: [
            {
              type: 'slider',
              yAxisIndex: 0,
              show: true,
              start: 100,
              end: 80,
              labelFormatter: () => {
                return '';
              },
            },
          ],
          animationDurationUpdate: 1000,
          series: {
            id: 'population',
            data: data.map((i) => i.value),
            type: 'bar',
            universalTransition: true,
            label: {
              show: true,
            },
          },
        };
        setOptions(mapOption, true);
        let currentOption = barOption;
        timer.value = setInterval(() => {
          currentOption = currentOption === barOption ? mapOption : barOption;
          setOptions(currentOption, true);
        }, 2000);

        myEchart?.on('click', (val) => {
          previewDialogRef.value.show(val?.data);
        });
      };
      return () => (
        <>
          <div ref={bar} class="h-130 w-170"></div>
          <PreviewDialog ref={previewDialogRef}></PreviewDialog>
        </>
      );
    },
  });
</script>
<style lang="less" scoped></style>
