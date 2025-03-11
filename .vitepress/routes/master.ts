import { setVersionPrefix } from '.vitepress/utils/versionPrefix'

const masterRoute = [
  {
    text: 'Prologue',
    collapsed: false,
    items: setVersionPrefix([
      { text: 'Introduction', link: 'prologue/introduction' },
      { text: 'Upgrade Guide', link: 'prologue/upgrade-guide' },
      { text: 'Contribution Guide', link: 'prologue/contribution-guide' }
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
    text: 'Architecture Concepts',
    collapsed: false,
    items: setVersionPrefix([
      { text: 'Introduction', link: 'architecture/introduction' },
      { text: 'Plugins', link: 'architecture/plugins' },
      { text: 'Frontend', link: 'architecture/frontend' },
      { text: 'Modular Design', link: 'architecture/modular-design' }
    ])
  },
  {
    text: 'Resources',
    collapsed: false,
    items: setVersionPrefix([
      { text: 'Getting started', link: 'resources/getting-started' },
      { text: 'Listing Records', link: 'resources/listing-records' },
      { text: 'Creating Record', link: 'resources/creating-record' },
      { text: 'Editing Record', link: 'resources/editing-record' },
      { text: 'Viewing Record', link: 'resources/viewing-record' },
    ])
  }
]

export default masterRoute
