<script lang="tsx">
  import { defineComponent } from 'vue';
  import { ElContainer } from 'element-plus';
  import Aside from './Aside/index.vue';
  import Header from './Header/index.vue';
  import Main from './Main/index.vue';
  export default defineComponent({
    setup() {
      return () => (
        <ElContainer class="w-full h-full">
          <Aside></Aside>
          <ElContainer class="!flex-col">
            <Header></Header>
            <Main></Main>
          </ElContainer>
        </ElContainer>
      );
    },
  });
</script>
