// const CategoryPlugin = require('../categoryPlugin');
module.exports = {
    title: 'Tuco',
    description: 'Tuco的博客网站,由vuepress驱动,主要记录前端技术',
    head: [
        ['link', { rel: 'icon', href: 'https://avatars.githubusercontent.com/u/25611177?s=400&u=11064d99200489b4c5ea21ccfdc7577fc9b000a2&v=4' }],
        ['link', { rel:"stylesheet",href: 'https://cdn.bootcss.com/gitalk/1.5.0/gitalk.min.css' }],
        ['script', { src: 'https://cdn.bootcss.com/gitalk/1.5.0/gitalk.min.js' }]
    ],
    themeConfig: {
        title:`Tuco's Blog`,
        short_title:'Tuco',
        githubLink:'https://github.com/facexl/vuepress-theme-easyBlog',
        github:'https://github.com/facexl',
        email:'438944342@qq.com',
        avatar:'https://avatars.githubusercontent.com/u/25611177?s=400&u=11064d99200489b4c5ea21ccfdc7577fc9b000a2&v=4',
        nav: [
          { text: 'Home', link: '/' },
          { text: 'All', link: '/category/all/1' },
          { text: 'Study', link: '/category/study/1' },
          { text: 'Practice', link: '/category/practice/1' },
          { text: 'Chat', link: '/category/chat/1' },
        ],
        sidebar: 'auto',
        pageSize:20
    },
    // configureWebpack:{
    //     plugins: [
    //         new CategoryPlugin()
    //     ]
    // },
}