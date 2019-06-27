module.exports = {
    title: '小浪博客',
    description: '肖浪的博客网站,由vuepress驱动,主要记录前端技术',
    head: [
        ['link', { rel: 'icon', href: 'https://avatars3.githubusercontent.com/u/25611177?s=460&v=4' }],
        ['link', { rel:"stylesheet",href: 'https://cdn.bootcss.com/gitalk/1.5.0/gitalk.min.css' }],
        ['script', { src: 'https://cdn.bootcss.com/gitalk/1.5.0/gitalk.min.js' }]
    ],
    themeConfig: {
        githubLink:'https://github.com/facexl/facexl.github.io',
        avatar:'https://avatars3.githubusercontent.com/u/25611177?s=460&v=4',
        nav: [
          { text: 'Home', link: '/' },
          { text: 'All', link: '/category/all/1' },
          { text: 'Study', link: '/category/study/1' },
          { text: 'Practice', link: '/category/practice/1' },
          { text: 'Chat', link: '/category/chat/1' },
        ],
        // sidebar: [
        //   ['/','666'],
        //   ['/blog/x','6667']
        // ]
        sidebar: 'auto',
        pageSize:20,
    },
}