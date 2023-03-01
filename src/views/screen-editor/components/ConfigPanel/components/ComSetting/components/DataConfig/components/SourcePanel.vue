<script lang="tsx">
  import { computed, defineComponent, inject, PropType, provide } from 'vue';
  import { comInjectionKey, sourcePanelInjectionKey } from '../../../../../config';
  import {
    ApiConfig,
    ApiDataConfig,
    ApiKeyName,
    createDataSources,
    FieldStatus,
  } from '/@/components/_models/data-source';
  import ApiStatus from './ApiStatus.vue';
  import { useDebugStore } from '/@/store/modules/debug';
  import { Input, Checkbox, InputNumber, Button, Tooltip } from 'ant-design-vue';
  import Icon from '/@/components/global/Icon';
  import { forIn } from 'lodash-es';
  export default defineComponent({
    props: {
      apiName: {
        type: String as PropType<ApiKeyName>,
        required: true,
      },
      activeName: String,
      collapse: Boolean,
    },
    setup(props) {
      const com = inject(comInjectionKey);

      const debugStore = useDebugStore();
      const datasources = createDataSources();

      const visible = computed(() => props.apiName === props.activeName);
      const apiConfig = computed<ApiConfig>(() => com.value.apis[props.apiName]);
      const apiDataConfig = computed<ApiDataConfig>(() => com.value.apiData[props.apiName]);
      const fieldsStatus = computed(() => {
        const comFields = debugStore.fieldStatusMap[com.value.id];
        return comFields?.[props.apiName] ?? {};
      });
      const totalStatus = computed(() => {
        const list = Object.values(fieldsStatus.value);
        if (list.includes(FieldStatus.loading)) {
          return ApiStatus.loading;
        }
        if (list.includes(FieldStatus.failed)) {
          return ApiStatus.incomplete;
        }
        return ApiStatus.completed;
      });
      provide(sourcePanelInjectionKey, {
        apiName: props.apiName,
        apiConfig,
        apiDataConfig,
      });
      const tbodyRender = () => {
        const list: any[] = [];
        forIn(apiConfig.value.fields, (fc, fn) => {
          list.push(
            <tr key={fn} class="table-body-row">
              <td class="column-item attr-name">{fc.description}</td>
              <td class="column-item attr-value">
                <Input v-model:value={fc.map} size={'small'} placeholder="可自定义"></Input>
              </td>
              <td class="column-item attr-status">
                <ApiStatus status={fieldsStatus[fn]} optional={fc.optional} />
              </td>
            </tr>,
          );
        });
        return list;
      };
      return () => (
        <div
          class={[
            'api-editor',
            { '--disable-fold': !props.collapse, '--fold': props.collapse && visible.value },
          ]}
        >
          <div class="api-editor-title">
            <div class="api-desc ellipsis2">{apiConfig.value.description || '数据接口'}</div>
            <div class="api-status success">
              <ApiStatus status={totalStatus.value} successText="配置完成"></ApiStatus>
            </div>
          </div>
          <div class="attr-source-wp">
            <div class="data-attr-table-container">
              <table class="data-attr-table">
                <thead class="table-head">
                  <tr class="table-head-row">
                    <th class="th-item column-item attr-name">字段</th>
                    <th class="th-item column-item attr-value">映射</th>
                    <th class="th-item column-item attr-status">状态</th>
                  </tr>
                </thead>
                <tbody class="table-body">
                  {Object.keys(apiConfig.value.fields).length > 0 ? (
                    <>{tbodyRender()}</>
                  ) : (
                    <tr class="table-body-row">
                      <td class="column-item attr-name">
                        <span>任意</span>
                      </td>
                      <td class="column-item attr-value"></td>
                      <td class="column-item attr-status">
                        <ApiStatus status="completed" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div class="data-source">
              <div class="data-result-title">数据响应结果</div>
              <div class="auto-update-config">
                <Checkbox
                  v-model:checked={apiConfig.value.useAutoUpdate}
                  class="auto-update-checkbox"
                >
                  自动更新选项
                </Checkbox>
                <InputNumber
                  class="update-interval-input !w-20"
                  v-model:value={apiConfig.value.autoUpdate}
                  disabled={!apiConfig.value.useAutoUpdate}
                  addon-after="秒一次"
                ></InputNumber>
              </div>
              <div class="data-flow-wp">
                <div class="ds-line">
                  <div class="ds-title">
                    <span class="ds-type-text">{datasources[apiDataConfig.value.type]}</span>
                  </div>
                  <Button size={'small'} type={'primary'} ghost>
                    配置数据源
                  </Button>
                </div>
                <div class="ds-line mt5">
                  <span>数据响应结果 ( 只读 ) </span>
                  <Tooltip title="刷新数据" placement={'left'}>
                    <Icon class="refresh-btn" icon="tabler:refresh"></Icon>
                  </Tooltip>
                </div>
                <div class="ds-dots">
                  <span
                    class={['ds-dot', totalStatus.value === 'completed' ? 'active' : 'error']}
                  ></span>
                  <span class="ds-dot"></span>
                  <span class="ds-dot"></span>
                </div>
              </div>
              <div class="data-response">111</div>
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
