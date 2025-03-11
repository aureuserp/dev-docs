import { setVersionPrefix } from '.vitepress/utils/versionPrefix'

const masterRoute = [
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
  },
  {
    text: 'Architecture concepts',
    collapsed: false,
    items: setVersionPrefix([
      { text: 'Introduction', link: 'architecture/introduction' },
      { text: 'Plugins', link: 'architecture/plugins' },
      { text: 'Frontend', link: 'architecture/frontend' },
      { text: 'Modular Design', link: 'architecture/modular-design' }
    ])
  }
]

export default masterRoute
