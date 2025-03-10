import { defineConfig } from 'vitepress'

let version = 'master'

function setVersionPrefix(children: { text: string; link: string }[]) {
  return children.map((child) => ({
    text: child.text,
    link: `/${version}/${child.link}`
  }))
}

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
      '/master/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: setVersionPrefix([
            { text: 'Prologue', link: 'prologue/introduction' },
            {
              text: 'Upgrade Guide',
              link: 'prologue/upgrade-guide'
            },
            {
              text: 'Contribution Guide',
              link: 'prologue/contribution-guide'
            }
          ])
        },
        {
          text: 'Installation',
          collapsed: false,
          items: setVersionPrefix([
            { text: 'Introduction', link: 'installation/introduction' },
            { text: 'Requirements', link: 'installation/requirements' },
            { text: 'Installation', link: 'installation/installation' },
            { text: 'Docker', link: 'installation/docker' }
          ])
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/aureuserp/aureuserp' }
    ],

    editLink: {
      pattern: 'https://github.com/aureuserp/aureuserp-docs/:path',
      text: 'Edit this page on GitHub'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 Webkul'
    },

    algolia: {
      appId: '',
      apiKey: '',
      indexName: 'erp-docs'
    }
  }
})
