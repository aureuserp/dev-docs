import { defineConfig } from 'vitepress'
import masterRoute from './routes/master'

export default defineConfig({
  lang: 'en-US',
  title: 'AureusERP',
  description: 'The powerful Open Source ERP platform built on Laravel',

  head: [
    ['link', { rel: 'icon', href: '/assets/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ]
  ],

  srcDir: 'src',

  themeConfig: {
    logo: '/assets/images/logo.png',

    siteTitle: false,

    nav: [
      { text: 'Home', link: '/' },
      { text: 'User Guide', link: 'https://docs.aureuserp.com/' },
      { text: 'Extensions', link: 'https://aureuserp.com/en/extensions/' },
      { text: 'Community Forum', link: 'https://forums.aureuserp.com/' },
      {
        text: 'Contribute To Aureus ERP',
        link: 'https://github.com/aureuserp/aureuserp'
      },
      { text: 'Contact Us', link: 'https://aureuserp.com/en/contacts/' },
      { component: 'VersionSwitcher' }
    ],

    sidebar: {
      '/master/': masterRoute
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aureuserp/aureuserp' }
    ],

    editLink: {
      pattern:
        'https://github.com/aureuserp/dev-docs/blob/master/src/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Webkul'
    },

    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'full'
      }
    },

    search: {
      provider: 'local'
    }
  }
})
