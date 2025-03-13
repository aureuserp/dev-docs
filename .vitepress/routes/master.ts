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
        text: 'Policies',
        collapsed: false,
        link: '/master/getting-started/policies'
      },
      {
        text: 'Clusters',
        collapsed: false,
        link: '/master/getting-started/clusters'
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
        text: 'Custom Fields',
        link: '/master/getting-started/custom-fields'
      }
    ]
  },
  {
    text: 'Table Views',
    collapsed: false,
    items: [
      { text: 'Introduction', link: '/master/table-views/introduction' }
    ]
  },
  {
    text: 'Dashboard',
    collapsed: false,
    items: [
      { text: 'Introduction', link: '/master/dashboard/introduction' }
    ]
  },
  {
    text: 'Chatter',
    collapsed: false,
    items: [
      { text: 'Overview', link: '/master/chatter/overview' },
      {
        text: 'Actions',
        collapsed: true,
        items: [
          { text: 'Message', link: '/master/chatter/actions/message' },
          { text: 'Log Note', link: '/master/chatter/actions/log-note' },
          { text: 'Activity', link: '/master/chatter/actions/activity' },
          { text: 'File', link: '/master/chatter/actions/file' },
          { text: 'Follower', link: '/master/chatter/actions/follower' }
        ]
      }
    ]
  },
  {
    text: 'Progress Stepper',
    collapsed: false,
    items: [
      {
        text: 'Implementation',
        link: '/master/progress-stepper/implementation'
      },
      {
        text: 'Customization',
        link: '/master/progress-stepper/customization'
      }
    ]
  },
  {
    text: 'Customer Account',
    collapsed: false,
    items: [
      {
        text: 'Introduction',
        link: '/master/customer-account/introduction'
      }
    ]
  }
]

export default routes
