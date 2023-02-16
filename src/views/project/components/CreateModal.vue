<script lang="tsx">
  import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
  import { Modal, Form, Input, Select } from 'ant-design-vue';
  import { useProjectStore } from '/@/store/modules/project';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    setup(_, { expose }) {
      const router = useRouter();
      const projectStore = useProjectStore();
      const groupOpts = computed(() => {
        return projectStore.allGroups.map((i) => ({ value: i.id, label: i.name }));
      });
      const visible = ref(false);

      const useForm = Form.useForm;
      const rules = reactive({
        projectName: [{ required: true, message: '请输入大屏名称' }],
        groupId: [{ required: true, message: '请选择分组' }],
      });
      const formState = reactive({
        projectName: '',
        groupId: null,
      });
      const { validate, validateInfos, resetFields } = useForm(formState, rules);

      /* 创建保存 */
      const onOk = () => {
        validate().then(() => {
          router.push({
            name: 'ScreenEditor',
            params: {
              projectId: Math.ceil(Math.random() * 100),
            },
          });
        });
      };
      const show = () => {
        visible.value = true;
      };

      onMounted(() => {
        projectStore.getProjectGroup();
      });

      expose({
        show,
      });
      return () => (
        <Modal
          v-model:visible={visible.value}
          title="创建数据大屏"
          okText="创建"
          centered
          onOk={onOk}
          onCancel={resetFields}
        >
          <Form layout={'vertical'}>
            <Form.Item label="数据大屏名称" {...validateInfos.projectName}>
              <Input placeholder="请输入大屏名称" v-model:value={formState.projectName}></Input>
            </Form.Item>
            <Form.Item label="大屏分组" {...validateInfos.groupId}>
              <Select
                placeholder="请选择分组"
                v-model:value={formState.groupId}
                options={groupOpts.value}
              ></Select>
            </Form.Item>
          </Form>
        </Modal>
      );
    },
  });
</script>
<style lang="less" scoped></style>
