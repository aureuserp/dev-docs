import { defineConfig } from 'vitepress'
import masterRoute from './routes/master'

export default defineConfig({
  lang: 'en-US',
  srcDir: 'src',
  title: 'Aureus ERP',
  description: 'The powerful Open Source ERP platform built on Laravel',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    [
      'meta',
      {
        name: 'description',
        content:
          'An Open-Source Laravel Enterprise Resource Planning (ERP) platform designed for Small and Medium Enterprises (SMEs) as well as large-scale enterprises.'
      }
    ],
    ['link', { rel: 'canonical', href: 'https://aureuserp.com/' }],

    ['meta', { property: 'og:locale', content: 'en-US' }],
    ['meta', { property: 'og:type', content: 'website' }],
    [
      'meta',
      {
        property: 'og:title',
        content: 'Aureus ERP - Open Source ERP Platform'
      }
    ],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'An Open-Source Laravel Enterprise Resource Planning (ERP) platform designed for Small and Medium Enterprises (SMEs) as well as large-scale enterprises.'
      }
    ],
    [
      'meta',
      { property: 'og:url', content: 'https://devdocs.aureuserp.com/' }
    ],
    [
      'meta',
      {
        property: 'og:site_name',
        content: 'Aureus ERP - Open Source ERP Platform'
      }
    ]
  ],

  themeConfig: {
    logo: {
      light: '/images/logo-light.svg',
      dark: '/images/logo-dark.svg'
    },

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
      message:
        'Released under the <a href="https://opensource.org/licenses/mit" target="_blank" class="mit-license">MIT License</a>.',
      copyright: `Copyright © ${new Date().getFullYear()} Webkul`
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
