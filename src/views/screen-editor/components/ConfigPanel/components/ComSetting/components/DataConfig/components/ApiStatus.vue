<script lang="tsx">
  import { computed, defineComponent, PropType } from 'vue';
  import { ApiStatus } from '/@/components/_models/data-source';
  export default defineComponent({
    props: {
      status: {
        type: String as PropType<ApiStatus | string>,
        default: ApiStatus.incomplete,
      },
      loadingText: {
        type: String,
        default: '匹配中',
      },
      successText: {
        type: String,
        default: '匹配成功',
      },
      failedText: {
        type: String,
        default: '未找到字段',
      },
      completedText: {
        type: String,
        default: '配置完成',
      },
      incompleteText: {
        type: String,
        default: '配置未完成',
      },
      optional: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const statusText = computed(() => {
        if (props.status === ApiStatus.loading) {
          return props.loadingText;
        }

        if (props.status === ApiStatus.success) {
          return props.successText;
        }

        if (props.status === ApiStatus.completed) {
          return props.completedText;
        }

        if (props.optional) {
          return '可选';
        }

        if (props.status === ApiStatus.failed) {
          return props.failedText;
        }

        if (props.status === ApiStatus.incomplete) {
          return props.incompleteText;
        }

        return props.status;
      });
      const render = () => {
        let el;
        if (props.status === ApiStatus.loading) {
          el = (
            <>
              <i class="status-icon validating"></i>
              <i class="status-icon validating"></i>
              <i class="status-icon validating"></i>
            </>
          );
        } else if (props.status === ApiStatus.success || props.status === ApiStatus.completed) {
          el = <i class={['status-icon', `--${props.status}`]}></i>;
        } else if (props.optional) {
          el = <i class={['status-icon', '--success']}></i>;
        } else {
          el = <i class={['status-icon', `--${props.status}`]}></i>;
        }
        return el;
      };
      return () => (
        <>
          {render()} <span class="status-text">{statusText.value}</span>{' '}
        </>
      );
    },
  });
</script>
<style lang="less" scoped>
  @import '/@/design/layout.less';
  .status-icon {
    .square-loading-icon();

    &.--failed,
    &.--incomplete {
      background: var(--datav-warn-color);
    }
  }

  .status-text {
    color: var(--datav-font-color);
  }
</style>
