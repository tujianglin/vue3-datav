<script lang="tsx">
  import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
  import { RouterView, useRouter } from 'vue-router';
  import Header from './components/Header.vue';
  import Main from './components/Main.vue';
  export default defineComponent({
    setup() {
      const router = useRouter();
      const mainRef = ref();
      const isFixed = ref(false);
      const navs = ref([
        {
          id: 0,
          key: 'MyProject',
          name: '大屏管理',
        },
        {
          id: 1,
          key: 'MyComponents',
          name: '组件配置',
        },
        {
          id: 2,
          key: 'MyLive',
          name: '产线实况',
        },
      ]);

      const scroll = () => {
        isFixed.value = mainRef.value?.$el?.offsetTop > 200;
      };

      const onNavChange = (nav: any) => {
        router.push({ name: nav.key });
      };

      onMounted(() => {
        window.addEventListener('scroll', scroll);
      });

      onUnmounted(() => {
        window.removeEventListener('scroll', scroll);
      });
      return () => (
        <div class="datav">
          <Header isFixed={isFixed.value}></Header>
          <Main
            ref={mainRef}
            navs={navs.value}
            style={{ background: isFixed.value ? '#171b22' : '' }}
            onChange={onNavChange}
          ></Main>
          <div class="nav-shadow"></div>
          <div class="datav-main">
            <RouterView />
          </div>
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  .datav {
    height: calc(100% - 150px);
    .nav-shadow {
      background: linear-gradient(180deg, transparent, #171b22);
      height: 50px;
      position: relative;
      width: 100%;
      z-index: 1;
    }

    .datav-main {
      user-select: none;
      height: 100%;
    }
  }
</style>
