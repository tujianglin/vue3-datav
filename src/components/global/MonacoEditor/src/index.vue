<script lang="tsx">
  import { defineComponent, nextTick, onMounted, onUnmounted, PropType, ref, watch } from 'vue';
  import type { editor as MEditor } from 'monaco-editor';
  import type { Monaco } from '@monaco-editor/loader';
  import loader from '@monaco-editor/loader';
  import { generateId, copyText } from '/@/utils';
  import {
    defaultOpts,
    formatDocument,
    handleInputCode,
    languageType,
    registerApiCompletion,
    registerDatavDarkTheme,
  } from '.';
  import { debounce } from 'lodash-es';
  import { Loading } from '/@/components/global';
  import { message, Modal } from 'ant-design-vue';
  import { CopyOutlined, FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons-vue';
  export default defineComponent({
    props: {
      language: {
        type: String as PropType<languageType>,
        default: 'plaintext',
      },
      code: {
        type: [String, Array, Object],
        default: '',
      },
      readOnly: Boolean,
      useMinimap: Boolean,
      lineNumbers: {
        type: String,
        default: 'on',
      },
      wordWrap: {
        type: String,
        default: 'on',
      },
      autoFormat: Boolean,
      options: {
        type: Object as PropType<Partial<MEditor.IStandaloneEditorConstructionOptions>>,
        default() {
          return {};
        },
      },
      completions: Array as PropType<Array<string>>,
      extra: Object,
      height: {
        type: Number,
        default: 240,
      },
      editorClass: String,
      fullScreenTitle: {
        type: String,
        default: '全屏模式',
      },
    },
    emits: ['change', 'blur'],
    setup(props, { emit }) {
      let monaco: Monaco | null = null;
      let editor: MEditor.IStandaloneCodeEditor | null = null;
      let fullEditor: MEditor.IStandaloneCodeEditor | null = null;
      const loading = ref(false);
      const isFullScreen = ref(false);
      const themeName = 'datav-dark-theme';
      const editorId = `datav-editor-${generateId()}`;
      loader.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.33.0/min/vs' } });

      const switchFullScreen = () => {
        isFullScreen.value = !isFullScreen.value;
        if (isFullScreen.value) {
          nextTick(() => {
            openedFullScreenDialog();
          });
        }
      };

      const openedFullScreenDialog = () => {
        const dom = document.querySelector('.datav-fullscreen-editor > section') as HTMLElement;
        if (dom) {
          const opts = Object.assign({}, defaultOpts, props.options, {
            tabSize: 2,
            value: '',
            language: props.language,
            theme: themeName,
            readOnly: props.readOnly,
            minimap: {
              enabled: props.useMinimap,
            },
            lineNumbers: props.lineNumbers,
            wordWrap: props.wordWrap,
          });
          const ce = monaco.editor.create(dom, opts);

          ce.setValue(editor.getValue());
          if (props.autoFormat) {
            setTimeout(() => {
              formatDocument(ce, props.language);
            }, 1200);
          }

          ce.onDidChangeModelContent(() => debounceChangeHandler());
          ce.onDidBlurEditorText(() => blurHandler());

          fullEditor = ce;
        }
      };
      const changeHandler = () => {
        if (editor) {
          const value = editor.getValue();
          emit('change', {
            value,
            extra: props.extra,
          });
        }
      };

      const blurHandler = () => {
        if (editor) {
          const value = editor.getValue();
          emit('blur', {
            value,
            extra: props.extra,
          });
          if (props.autoFormat) {
            formatDocument(editor, props.language);
          }
        }
      };

      const copyData = () => {
        if (editor) {
          copyText(editor.getValue()).then(() => {
            message.success('复制成功');
          });
        }
      };
      const debounceChangeHandler = debounce(changeHandler, 300);

      watch(
        () => props.code,
        (nv: any) => {
          if (editor) {
            const inputCode = handleInputCode(props.language, nv);
            editor.setValue(inputCode);
          }
        },
      );

      onMounted(async () => {
        const timer = setTimeout(() => {
          loading.value = true;
        }, 200);
        monaco = await loader.init();
        clearTimeout(timer);
        loading.value = false;
        registerDatavDarkTheme(monaco);
        registerApiCompletion(monaco, props.language, props.completions);
        await nextTick();
        const dom = document.getElementById(editorId);
        if (dom) {
          const opts = Object.assign({}, defaultOpts, props.options, {
            tabSize: 2,
            value: '',
            language: props.language,
            theme: themeName,
            readOnly: props.readOnly,
            minimap: {
              enabled: props.useMinimap,
            },
            lineNumbers: props.lineNumbers,
            wordWrap: props.wordWrap,
          });

          const ce = monaco.editor.create(dom, opts);
          const inputCode = handleInputCode(props.language, props.code);
          ce.setValue(inputCode);
          if (props.autoFormat) {
            formatDocument(ce, props.language);
          }

          if (props.height > 0) {
            dom.style.height = `${props.height}px`;
          }

          ce.onDidChangeModelContent(() => debounceChangeHandler());
          ce.onDidBlurEditorText(() => blurHandler());

          editor = ce;
        }
      });
      onUnmounted(() => {
        editor?.dispose();
        fullEditor?.dispose();
      });
      return () => (
        <>
          {loading.value && <Loading></Loading>}
          <div
            id={editorId}
            class={[
              'datav-editor',
              {
                '--read-only': props.readOnly,
              },
              props.editorClass,
            ]}
          >
            {!loading.value && (
              <div class="datav-editor-actions">
                <CopyOutlined class="action-btn" title="点击复制" onClick={copyData}></CopyOutlined>
                {isFullScreen.value ? (
                  <FullscreenExitOutlined
                    class="action-btn"
                    title="退出全屏"
                    onClick={switchFullScreen}
                  ></FullscreenExitOutlined>
                ) : (
                  <FullscreenOutlined
                    class="action-btn"
                    title="全屏模式下编辑或查看"
                    onClick={switchFullScreen}
                  ></FullscreenOutlined>
                )}
              </div>
            )}
          </div>
          <Modal
            v-model:visible={isFullScreen.value}
            title={`${props.fullScreenTitle}${props.readOnly ? ' ( 只读 )' : ''}`}
            footer={null}
            width="90%"
          >
            <div class="datav-fullscreen-editor-wp">
              <div
                class={[
                  'datav-editor',
                  'datav-fullscreen-editor',
                  { '--read-only': props.readOnly },
                ]}
              >
                <section class="flex relative w-full h-full"></section>
              </div>
            </div>
          </Modal>
        </>
      );
    },
  });
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
