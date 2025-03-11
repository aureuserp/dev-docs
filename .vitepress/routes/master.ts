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
      { text: 'Packages', link: 'architecture/packages' },
      { text: 'Frontend', link: 'architecture/frontend' },
      { text: 'Theme', link: 'architecture/theme' },
      { text: 'Performance', link: 'architecture/performance' },
      {
        text: 'Repository Pattern',
        link: 'architecture/repository-pattern'
      },
      { text: 'Modular Design', link: 'architecture/modular-design' }
    ])
  }
]

export default masterRoute
