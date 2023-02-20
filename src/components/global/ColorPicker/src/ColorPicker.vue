<script lang="tsx">
  import { defineComponent, ref, watch } from 'vue';
  import { Popover, Button, Input } from 'ant-design-vue';
  import { Chrome } from '@ckpack/vue-color';
  import { DownOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    props: {
      value: {
        type: String,
        default: '',
      },
    },
    emits: ['update:value'],
    setup(props, { emit }) {
      const color = ref(props.value);
      const colorValue = ref(props.value);
      watch(color, (val: any) => {
        try {
          colorValue.value = `rgba(${val.rgba.r},${val.rgba.g},${val.rgba.b},${val.rgba.a})`;
        } catch {}
      });
      watch(colorValue, (val) => {
        color.value = val;
        emit('update:value', val);
      });
      return () => (
        <div class="flex items-center w-47">
          <Input class="mr-1 flex-1" size={'small'} v-model:value={colorValue.value}></Input>
          <Popover
            trigger={'click'}
            placement={'bottomLeft'}
            v-slots={{
              content: () => <Chrome v-model={color.value}></Chrome>,
            }}
          >
            <Button
              size={'small'}
              style={{ background: colorValue.value }}
              v-slots={{
                icon: () => <DownOutlined style={{ fontSize: '12px' }}></DownOutlined>,
              }}
            ></Button>
          </Popover>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped></style>
