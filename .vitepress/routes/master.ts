const masterRoute = [
  {
    text: 'Prologue',
    collapsed: false,
    items: [
      { text: 'Introduction', link: '/master/prologue/introduction' },
      { text: 'Upgrade Guide', link: '/master/prologue/upgrade-guide' },
      {
        text: 'Contribution Guide',
        link: '/master/prologue/contribution-guide'
      }
    ]
  },
  {
    text: 'Installation',
    collapsed: false,
    items: [
      { text: 'Introduction', link: '/master/installation/introduction' },
      { text: 'Requirements', link: '/master/installation/requirements' },
      { text: 'Installation', link: '/master/installation/installation' },
      { text: 'Docker', link: '/master/installation/docker' }
    ]
  },
  {
    text: 'Architecture Concepts',
    collapsed: false,
    items: [
      { text: 'Introduction', link: '/master/architecture/introduction' },
      { text: 'Plugins', link: '/master/architecture/plugins' },
      { text: 'Frontend', link: '/master/architecture/frontend' },
      {
        text: 'Modular Design',
        link: '/master/architecture/modular-design'
      }
    ]
  },
  {
    text: 'Getting Started',
    collapsed: false,
    items: [
      {
        text: 'Panels',
        collapsed: true,
        items: [
          {
            text: 'Admin',
            link: '/master/getting-started/panels/admin'
          },
          {
            text: 'Customer',
            link: '/master/getting-started/panels/customer'
          }
        ]
      },
      {
        text: 'Migrations',
        collapsed: false,
        link: '/master/getting-started/migrations'
      },
      {
        text: 'Policies',
        collapsed: false,
        link: '/master/getting-started/policies'
      },
      {
        text: 'Custom Fields',
        collapsed: true,
        items: [
          {
            text: 'Introduction',
            link: '/master/getting-started/custom-fields/introduction'
          }
        ]
      },
      {
        text: 'Resources',
        collapsed: true,
        items: [
          {
            text: 'Getting started',
            link: '/master/getting-started/resources/getting-started'
          },
          {
            text: 'Listing Records',
            link: '/master/getting-started/resources/listing-records'
          },
          {
            text: 'Creating Record',
            link: '/master/getting-started/resources/creating-record'
          },
          {
            text: 'Editing Record',
            link: '/master/getting-started/resources/editing-record'
          },
          {
            text: 'Viewing Record',
            link: '/master/getting-started/resources/viewing-record'
          }
        ]
      }
    ]
  }
]

export default masterRoute
