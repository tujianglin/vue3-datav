<script lang="tsx">
  import { defineComponent, reactive, ref } from 'vue';
  import { Form, Input, Button } from 'ant-design-vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import { useUserStore } from '/@/store/modules/user';
  import { UserOutlined, KeyOutlined } from '@ant-design/icons-vue';
  interface FormState {
    username: string;
    password: string;
  }
  export default defineComponent({
    setup() {
      const { login } = useUserStore();
      const formRef = ref();
      const loading = ref(false);
      const formState = reactive<FormState>({
        username: 'admin',
        password: '123456',
      });
      const rules: Record<string, Rule[]> = {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      };
      const handleSubmit = () => {
        formRef.value?.validate().then(async (res) => {
          try {
            loading.value = true;
            await login(res);
          } finally {
            loading.value = false;
          }
        });
      };
      return () => (
        <div class="login-form">
          <Form ref={formRef} model={formState} rules={rules}>
            <Form.Item name="username">
              <Input
                v-model:value={formState.username}
                placeholder="请输入账号"
                v-slots={{
                  prefix: () => <UserOutlined></UserOutlined>,
                }}
              ></Input>
            </Form.Item>
            <Form.Item name="password">
              <Input.Password
                v-model:value={formState.password}
                placeholder="请输入密码"
                v-slots={{
                  prefix: () => <KeyOutlined></KeyOutlined>,
                }}
              ></Input.Password>
            </Form.Item>
            <Form.Item>
              <Button type={'primary'} block onClick={handleSubmit} loading={loading.value}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    },
  });
</script>

<style lang="less" scoped>
  .login-form {
    position: relative;
    width: 480px;
    max-width: 100%;
    padding: 0 30px;
    margin: 400px auto;
    overflow: hidden;
  }
</style>
