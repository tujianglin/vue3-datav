import type { App, Directive } from 'vue';

const focusDirctive: Directive = {
  mounted(el: HTMLInputElement) {
    const defaultValue = el.getAttribute('default-value');
    if (defaultValue) {
      el.value = defaultValue;
    }
    el.focus();
  },
};

export function setupFocusDirective(app: App) {
  app.directive('focus', focusDirctive);
}

export default focusDirctive;
