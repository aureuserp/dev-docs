const masterRoute = [
  {
    text: 'Prologue',
    collapsed: false,
    items: [
      { text: 'Introduction', link: 'master/prologue/introduction' },
      { text: 'Upgrade Guide', link: 'master/prologue/upgrade-guide' },
      {
        text: 'Contribution Guide',
        link: 'master/prologue/contribution-guide'
      }
    ]
  },
  {
    text: 'Installation',
    collapsed: false,
    items: [
      { text: 'Introduction', link: 'master/installation/introduction' },
      { text: 'Requirements', link: 'master/installation/requirements' },
      { text: 'Installation', link: 'master/installation/installation' },
      { text: 'Docker', link: 'master/installation/docker' }
    ]
  },
  {
    text: 'Architecture Concepts',
    collapsed: false,
    items: [
      { text: 'Introduction', link: 'master/architecture/introduction' },
      {
        text: 'Plugins',
        collapsed: true,
        items: [
          {
            text: 'Introduction',
            link: 'master/architecture/plugins/introduction'
          },
          { text: 'Plugins', link: 'master/architecture/plugins/plugins' },
          {
            text: 'Frontend',
            link: 'master/architecture/plugins/frontend'
          },
          {
            text: 'Modular Design',
            link: 'master/architecture/plugins/modular-design'
          }
        ]
      },
      { text: 'Frontend', link: 'master/architecture/frontend' },
      {
        text: 'Modular Design',
        link: 'master/architecture/modular-design'
      }
    ]
  },
  {
    text: 'Resources',
    collapsed: false,
    items: [
      {
        text: 'Getting started',
        link: 'master/resources/getting-started'
      },
      {
        text: 'Listing Records',
        link: 'master/resources/listing-records'
      },
      {
        text: 'Creating Record',
        link: 'master/resources/creating-record'
      },
      { text: 'Editing Record', link: 'master/resources/editing-record' },
      { text: 'Viewing Record', link: 'master/resources/viewing-record' }
    ]
  }
]

export default masterRoute
