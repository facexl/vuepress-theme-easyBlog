// const CategoryPlugin = require('../categoryPlugin');
module.exports = {
    title: '小浪博客',
    description: '肖浪的博客网站,由vuepress驱动,主要记录前端技术',
    head: [
        ['link', { rel: 'icon', href: 'http://img.xlcool.cn/WechatIMG485.jpeg' }],
        ['link', { rel:"stylesheet",href: 'https://cdn.bootcss.com/gitalk/1.5.0/gitalk.min.css' }],
        ['script', { src: 'https://cdn.bootcss.com/gitalk/1.5.0/gitalk.min.js' }]
    ],
    themeConfig: {
        title:'小浪博客',
        githubLink:'https://github.com/facexl/vuepress-theme-easyBlog',
        avatar:'http://img.xlcool.cn/WechatIMG485.jpeg',
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