<script lang="tsx">
  import { debounce } from 'lodash-es';
  import { defineComponent, onMounted, onUnmounted, PropType, ref } from 'vue';
  import { NavCanvas } from './canvas';

  interface NavDataType {
    id: number;
    key: string;
    name: string;
  }
  export default defineComponent({
    props: {
      navs: {
        type: Array as PropType<NavDataType[]>,
        required: true,
      },
    },
    emits: ['change'],
    setup(props, { emit }) {
      const activeNav = ref(0);
      let nc: NavCanvas | null = null;
      const toggleNav = (nav: NavDataType) => {
        if (nc) {
          activeNav.value = nav.id;
          nc.toggle(nav.id);
          emit('change', nav);
        }
      };

      const debNavResize = debounce(() => {
        if (nc) {
          nc.resize();
        }
      }, 500);

      onMounted(() => {
        // const nav = props.navs.find((m) => m.key === route.name);
        // activeNav.value = nav ? nav.id : 0;
        nc = new NavCanvas('nav-canvas', '.nav-main .nav-span', activeNav.value);
        window.addEventListener('resize', debNavResize);
      });

      onUnmounted(() => {
        window.removeEventListener('resize', debNavResize);
      });

      return () => (
        <div class="nav-main">
          <canvas id="nav-canvas" style="position: absolute; z-index: -1; left: 0"></canvas>
          {props.navs.map((i) => (
            <span class="nav-span">
              <a
                class={[{ 'nav-active': activeNav.value === i.id }, 'nav-link']}
                onClick={() => toggleNav(i)}
              >
                {i.name}
              </a>
            </span>
          ))}
        </div>
      );
    },
  });
</script>
<style lang="less" scoped>
  .nav-main {
    z-index: 10;
    display: flex;
    top: 30px;
    position: sticky;
    width: 100%;
    margin-top: 200px;
    min-width: 1024px;
    user-select: none;

    .nav-span {
      .nav-link {
        display: flex;
        align-items: center;
        transition: color 0.2s;
        text-decoration: none !important;
        color: #b9c2cc;
        width: auto;
        min-width: 140px;
        line-height: 40px;
        font-size: 14px;
        text-align: left;
        cursor: pointer;
        padding: 0 40px;

        &.nav-active,
        &:hover {
          color: #fff !important;
        }
      }

      .nav-icon {
        margin-right: 5px;
      }
    }
  }
</style>
