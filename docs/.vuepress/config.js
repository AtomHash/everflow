const apiSideBar = require("./api-sidebar.json");
const apiSideBarRelative = require('./api-sidebar-relative.json');

apiSideBar[0]['collapsable'] = false;

module.exports = {
  title: 'Everflow',
  description: 'The Modular, and Scalable TypeScript Framework built for vue.js',
  base: '/api/',
  head: [
    ['link', { rel: 'icon', href: 'https://everflowjs.github.io/images/logo.png' }]
  ],
  themeConfig: {
      repo: 'atomhash/everflow',
      repoLabel: 'Contribute!',
      editLinks: false,
      lastUpdated: 'Last Updated',
      logo: "https://everflowjs.github.io/images/logo.png",
      nav: [
      {
          text: 'Learn',
          ariaLabel: 'Learn Menu',
          items: [
          { text: 'Guide', link: 'https://everflowjs.github.io/v4/guide/', target:'_self' },
          { text: 'API', link: '/' },
          { text: 'Style Guide', link: 'https://everflowjs.github.io/v4/style-guide/', target:'_self' },
          ]
      }
      ],
      sidebar: [...apiSideBar]
  },
}