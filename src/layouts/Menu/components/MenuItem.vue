<script lang="tsx">
  import { defineComponent, PropType } from 'vue';
  import { ElMenuItem, ElSubMenu, ElIcon } from 'element-plus';
  import { AppRouteRecordRaw } from '/#/router';
  import Icon from '/@/components/Icon';
  const MenuItem = defineComponent({
    name: 'MenuItem',
    props: {
      item: {
        type: Object as PropType<AppRouteRecordRaw>,
        default: () => {},
      },
    },
    setup(props) {
      /* 菜单是否有子菜单 */
      const menuHasChildren = (): boolean => {
        return (
          !props.item.meta?.hideChildrenInMenu &&
          Reflect.has(props.item, 'children') &&
          !!props.item.children &&
          props.item.children.length > 0
        );
      };
      return () => {
        const { item } = props;
        return (
          <>
            {menuHasChildren() ? (
              <ElSubMenu
                index={item.path}
                key={item.path}
                v-slots={{
                  title: () => (
                    <>
                      <ElIcon>
                        <Icon icon={item.meta?.icon}></Icon>
                      </ElIcon>
                      <span>{item.meta?.title}</span>
                    </>
                  ),
                }}
              >
                {item.children?.map((i) => (
                  <MenuItem item={i}></MenuItem>
                ))}
              </ElSubMenu>
            ) : (
              <ElMenuItem
                index={item.path}
                key={item.path}
                v-slots={{
                  title: () => (
                    <>
                      <span>{item.meta?.title}</span>
                    </>
                  ),
                }}
              >
                <ElIcon>
                  <Icon icon={item.meta?.icon}></Icon>
                </ElIcon>
              </ElMenuItem>
            )}
          </>
        );
      };
    },
  });

  export default MenuItem;
</script>
<style lang="less" scoped></style>
