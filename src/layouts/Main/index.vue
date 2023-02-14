<script lang="tsx">
  import { defineComponent, Transition, KeepAlive } from 'vue';
  import { ElMain } from 'element-plus';
  import { RouterView } from 'vue-router';
  export default defineComponent({
    setup() {
      return () => (
        <ElMain class="layout-main">
          <RouterView>
            {({ Component, route }) =>
              Component && (
                <Transition name={'fade'} mode={'out-in'} appear>
                  {route.meta.keepAlive ? (
                    <KeepAlive>
                      <Component></Component>
                    </KeepAlive>
                  ) : (
                    <Component></Component>
                  )}
                </Transition>
              )
            }
          </RouterView>
        </ElMain>
      );
    },
  });
</script>
<style lang="less" scoped>
  .layout-main {
    padding: 8px;
    background: #f5f5f5;
  }
</style>
