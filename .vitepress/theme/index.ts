import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import VersionSwitcher from '@theme/components/VersionSwitcher.vue'
import '@theme/styles/index.css'
import '@theme/styles/custom.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {})
  },
  enhanceApp({ app }) {
    app.component('VersionSwitcher', VersionSwitcher)
  }
} satisfies Theme
