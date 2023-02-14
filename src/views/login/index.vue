<script lang="tsx">
  import { defineComponent } from 'vue';
  import LoginForm from './components/LoginForm.vue';
  import Background from './components/Background.vue';
  export default defineComponent({
    setup() {
      return () => (
        <div class="login-container">
          <Background></Background>
          <LoginForm></LoginForm>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  .login-container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: #111222;
  }
</style>
