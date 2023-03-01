<script lang="tsx">
  import { computed, defineComponent, ref, withModifiers } from 'vue';
  import { PanelType, useToolbarStore } from '/@/store/modules/toolbar';
  import { Tooltip, Tabs } from 'ant-design-vue';
  import Icon from '/@/components/global/Icon';
  import { classifications, ComDataType, ComDataDto } from '/@/data/system-components';
  import { cloneDeep } from 'lodash-es';
  import { createComponent } from '/@/datavComponents/datav';
  import { loadCom } from '/@/components/_utils/component-util';
  import { useEditorStore } from '/@/store/modules/editor';
  export default defineComponent({
    setup() {
      const toolbarStore = useToolbarStore();
      const editorStore = useEditorStore();
      const favoriteComs = ref([]);
      const visiblePanel = computed(() => toolbarStore.components.show);
      const first: ComDataType = {
        type: 'all',
        name: '全部',
        icon: 'v-icon-view-grid',
        data: [],
      };
      const cloneCfs = cloneDeep(classifications);
      cloneCfs.forEach((item) => {
        item.data.unshift({
          ...first,
          data: (item.data as ComDataType[]).flatMap((m) => m.data),
        });
      });
      const categories = computed<ComDataType[]>(() => {
        return [
          ...cloneCfs,
          {
            type: 'favorite',
            name: '收藏',
            icon: 'v-icon-favorite',
            data: [{ ...first, data: favoriteComs.value }],
          },
        ];
      });
      /* 收起组件 */
      const changeVisible = () => {
        toolbarStore.setPanelState(PanelType.components, !visiblePanel.value);
      };
      const toAddCom = async (comName: string, used: boolean) => {
        if (used) {
          toolbarStore.addLoading();
          const com = await createComponent(comName);
          com.attr.x = Math.floor((editorStore.pageConfig.width - com.attr.w) / 2);
          com.attr.y = Math.floor((editorStore.pageConfig.height - com.attr.h) / 2);
          await loadCom(com);
          toolbarStore.removeLoading();
        }
      };
      const dragStart = (ev: any, comName: string) => {
        ev.dataTransfer.setData('text', comName);
      };
      const dragOver = (ev: DragEvent) => {
        ev.preventDefault();
        ev.stopPropagation();
        ev.dataTransfer.dropEffect = 'none';
      };
      return () => (
        <div class={['g-aside component-panel-wp', { '--hide': !visiblePanel.value }]}>
          <div class="components-panel">
            <div class="panel-title">
              <span class="panel-text">{visiblePanel.value ? '全部组件' : '组件'}</span>
              <Tooltip placement={'bottom'} title="收起">
                <Icon
                  class="btn-icon"
                  icon="ant-design:left-outlined"
                  onClick={changeVisible}
                ></Icon>
              </Tooltip>
            </div>
            <div class="components-panel-wrapper" onDragover={dragOver}>
              <Tabs tabPosition={'left'}>
                {categories.value.map((i) => (
                  <Tabs.TabPane tab={i.name} key={i.type}>
                    {i.data.length > 2 ? (
                      <Tabs tabPosition={'left'} class="tabs-l2">
                        {(i.data as ComDataType[]).map((j) => (
                          <Tabs.TabPane tab={j.name} key={j.type}>
                            <div class="components-single-menu-wp">
                              <div class="components-single-menu">
                                <ul class="components-single-menu-list">
                                  {(j.data as ComDataDto[]).map((k) => (
                                    <li
                                      title={k.alias}
                                      class="components-item double"
                                      draggable={k.used}
                                      onDragstart={(e) => dragStart(e, k.name)}
                                      onClick={() => toAddCom(k.name, k.used)}
                                    >
                                      <div class="components-item-text">{k.alias}</div>
                                      <div
                                        class="components-item-img"
                                        style={{ 'background-image': `url(${k.thum})` }}
                                      >
                                        {!k.used && (
                                          <span
                                            class="mask"
                                            onClick={withModifiers(() => {}, ['stop'])}
                                          >
                                            <Tooltip title="正在开发中。。。🚀">
                                              <Icon icon="ant-design:lock-outlined"></Icon>
                                            </Tooltip>
                                          </span>
                                        )}
                                      </div>
                                    </li>
                                  ))}
                                  <li></li>
                                </ul>
                              </div>
                            </div>
                          </Tabs.TabPane>
                        ))}
                      </Tabs>
                    ) : (
                      <div class="components-multi-menu">
                        <div class="components-single-menu --wider">
                          <ul class="components-single-menu-list">
                            {((i.data[0] as ComDataType).data as ComDataDto[]).map((j) => (
                              <li
                                title={j.alias}
                                draggable={j.used}
                                class="components-item double"
                                onDragstart={(e) => dragStart(e, j.name)}
                                onClick={() => toAddCom(j.name, j.used)}
                              >
                                <div class="components-item-text">{j.alias}</div>
                                <div
                                  class="components-item-img"
                                  style={{ 'background-image': `url(${j.thum})` }}
                                >
                                  {!j.used && (
                                    <span class="mask" onClick={withModifiers(() => {}, ['stop'])}>
                                      <Tooltip title="正在开发中。。。🚀">
                                        <Icon icon="ant-design:lock-outlined"></Icon>
                                      </Tooltip>
                                    </span>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </Tabs.TabPane>
                ))}
              </Tabs>
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
