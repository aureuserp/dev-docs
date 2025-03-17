const routes = [
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
        text: 'Settings',
        collapsed: false,
        link: '/master/getting-started/settings'
      },
      {
        text: 'Models',
        collapsed: false,
        link: '/master/getting-started/models'
      },
      {
        text: 'Policies',
        collapsed: false,
        link: '/master/getting-started/policies'
      },
      {
        text: 'Seeders',
        collapsed: false,
        link: '/master/getting-started/seeders'
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
      },
      {
        text: 'Clusters',
        collapsed: false,
        link: '/master/getting-started/clusters'
      },
      {
        text: 'Pages',
        collapsed: false,
        link: '/master/getting-started/pages'
      },
      {
        text: 'Custom Fields',
        link: '/master/getting-started/custom-fields'
      }
    ]
  },
  {
    text: 'Digging Deeper',
    collapsed: false,
    items: [
      {
        text: 'Dashboard',
        link: '/master/advanced/dashboard'
      },
      {
        text: 'Customer Account',
        link: '/master/advanced/customer-account'
      },
      {
        text: 'Table Views',
        link: '/master/advanced/table-views'
      },
      {
        text: 'Progress Stepper',
        collapsed: true,
        items: [
          {
            text: 'Implementation',
            link: '/master/advanced/progress-stepper/implementation'
          },
          {
            text: 'Customization',
            link: '/master/advanced/progress-stepper/customization'
          }
        ]
      },
      {
        text: 'Chatter',
        collapsed: true,
        items: [
          {
            text: 'Introduction',
            link: '/master/advanced/chatter/introduction'
          },
          {
            text: 'Actions',
            collapsed: true,
            items: [
              {
                text: 'Message',
                link: '/master/advanced/chatter/actions/message'
              },
              {
                text: 'Log Note',
                link: '/master/advanced/chatter/actions/log-note'
              },
              {
                text: 'Activity',
                link: '/master/advanced/chatter/actions/activity'
              },
              {
                text: 'File',
                link: '/master/advanced/chatter/actions/file'
              },
              {
                text: 'Follower',
                link: '/master/advanced/chatter/actions/follower'
              }
            ]
          }
        ]
      }
    ]
  }
]

export default routes
