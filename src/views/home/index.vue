<script lang="tsx">
  import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
  import { RouterView } from 'vue-router';
  import Header from './components/Header.vue';
  import Main from './components/Main.vue';
  export default defineComponent({
    setup() {
      const mainRef = ref();
      const isFixed = ref(false);
      const navs = ref([{ id: 0, key: 'project', name: '我的可视化' }]);

      const scroll = () => {
        isFixed.value = mainRef.value?.$el?.offsetTop > 200;
      };

      // const onNavChange = (nav: any) => {
      // router.push({ name: nav.key });
      // };

      onMounted(() => {
        window.addEventListener('scroll', scroll);
      });

      onUnmounted(() => {
        window.removeEventListener('scroll', scroll);
      });
      return () => (
        <div class="datav">
          <Header></Header>
          <Main
            ref={mainRef}
            navs={navs.value}
            style={{ background: isFixed.value ? 'var(--datav-body-bg)' : '' }}
          ></Main>
          <div class="nav-shadow"></div>
          <div class="datav-main">
            <div class="datav-content">
              <RouterView />
            </div>
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  .datav {
    .nav-shadow {
      background: linear-gradient(180deg, transparent, var(--datav-body-bg));
      height: 50px;
      position: relative;
      width: 100%;
      z-index: 1;
    }

    .datav-main {
      user-select: none;

      .datav-content {
        position: relative;
        color: var(--datav-body-bg);
      }
    }
  }
</style>
