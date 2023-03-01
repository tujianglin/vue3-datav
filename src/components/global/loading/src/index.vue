<script lang="tsx">
  import { defineComponent } from 'vue';
  import Loading from './loading.vue';

  export default defineComponent({
    setup() {
      return () => <Loading type="square" spinning={true} class="g-async-loading"></Loading>;
    },
  });
</script>
