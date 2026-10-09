import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import GoogleTranslate from './components/GoogleTranslate.vue'
import '@theme/styles/index.css'
import '@theme/styles/custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(GoogleTranslate),
      'nav-screen-content-after': () => h(GoogleTranslate)
    })
  },
  enhanceApp({ app }) {
  }
} satisfies Theme
