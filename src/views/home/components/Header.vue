<script lang="tsx">
  import { defineComponent } from 'vue';
  export default defineComponent({
    props: {
      isFixed: Boolean,
    },
    setup() {
      return () => (
        <div class="nav-header">
          <img class="nav-img-text" src="/images/nav-img-text.png" />
          <div class="nav-img"></div>
        </div>
      );
    },
  });
</script>

<style lang="less" scoped>
  .nav-header {
    position: absolute;
    top: 0;
    width: 100%;
    height: 290px;

    .nav-img-text {
      z-index: 1;
      transform-origin: 0 0;
      transform: scale(0.5);
      top: 80px;
      left: 40px;
      position: absolute;
      user-select: none;
      cursor: pointer;
    }

    .nav-img {
      position: absolute;
      width: 100%;
      height: 290px;
      background: url('/images/nav-img.png') center / cover;
    }
  }
</style>
