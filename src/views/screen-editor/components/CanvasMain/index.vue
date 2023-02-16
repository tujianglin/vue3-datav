<script lang="tsx">
  import { defineAsyncComponent, defineComponent } from 'vue';
  const Ruler = defineAsyncComponent(() => import('./components/Ruler/index.vue'));
  export default defineComponent({
    setup() {
      return () => (
        <div class="canvas-main">
          <div id="canvas-wp" class="canvas-panel-wrap">
            <Ruler></Ruler>
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  .canvas-panel-wrap {
    position: relative;
    width: 100%;
    height: calc(100% - 32px);
    overflow: auto;

    .canvas-panel {
      position: absolute;
      top: 60px;
      left: 60px;
      background-position: center, right bottom;
      background-repeat: no-repeat, no-repeat;
      background-size: cover, contain;
      box-shadow: rgb(0 0 0 / 50%) 0 0 30px 0;
      transition: 0.2s all ease-in-out;
      transform-origin: 0 0;
    }
  }
</style>
