<template>
  <main class="home" aria-labelledby="main-title">
      <Ribbon></Ribbon>
    <div class="index-center">
        <span class="title font-base">{{$site.themeConfig.title}}</span>
        <p class="title-tips">
            <span>最近更新:</span>
        </p>
        <p class="link-item" v-for="(item,index) in recentList">
            <router-link
                :key="item.key"
                :to="item.path"
            >
                <span class="link-item-index">{{index}}.</span>
                <span>{{ item.title }}</span>
            </router-link>
        </p>
        <p  style="text-align:right;">
            <a href="/category/all/1.html" class="font-base more-article">更多文章</a>
        </p>
    </div>

    <!-- <Content class="theme-default-content custom"/> -->

    <div
      class="footer"
    >
      <a style="color:rgba(79,192,141,0.5);font-weight:normal;font-size:12px" href="http://beian.miit.gov.cn">浙ICP备18054731号-1</a>
    </div>
  </main>
</template>

<script>
import NavLink from '@theme/components/NavLink.vue'
import { debuglog } from 'util';
import Ribbon from './Ribbon'
export default {
  components: { NavLink ,Ribbon},
  computed: {
    data () {
      return this.$page.frontmatter
    },
    recentList(){
        const pages = this.$site.pages.filter(it=>it.regularPath.indexOf('blog')>-1);
        pages.sort((a,b)=>{
            return +b.regularPath.match(/\d{4}\/\d{4}/)[0].replace('/','') - (+a.regularPath.match(/\d{4}\/\d{4}/)[0].replace('/',''))
        })
        const l = pages.length
        return pages.slice(0,4)
    },
    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  },
}
</script>

<style lang="stylus">
.home
  padding $navbarHeight 2rem 0
  max-width 960px
  margin 0px auto
  display block
  .hero
    text-align center
    img
      max-width: 100%
      max-height 280px
      display block
      margin 3rem auto 1.5rem
    h1
      font-size 3rem
    h1, .description, .action
      margin 1.8rem auto
    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.3
      color lighten($textColor, 40%)
    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $accentColor
      padding 0.8rem 1.6rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)
      &:hover
        background-color lighten($accentColor, 10%)
  .features
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .feature
    flex-grow 1
    flex-basis 30%
    max-width 30%
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)
  .footer
    position fixed
    bottom 0
    white-space nowrap
    font-size 1rem
    left 50%
    transform translateX(-50%)
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)

.index-center
    // width 300px
    max-width 100%
    position absolute
    box-sizing border-box
    top 50%
    left 50%
    transform translate(-50%,-50%)
    z-index 0
    opacity 0.9
    text-align center
    overflow hidden
    // background-color: rgba(0,0,0,.5);
    color: #444;
    padding 20px
    font-size 1rem
    border-radius: 10px;
    font-family "Montserrat", "Helvetica Neue", "Hiragino Sans GB", "LiHei Pro", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .title
        font-size 1.8rem
        color: #444;
    .font-base
        position relative
        &::after
            content: "";
            position: absolute;
            z-index: -1;
            top: 60%;
            left: -0.1px;
            right: -0.1px;
            bottom: 0;
            transition: top 200ms cubic-bezier(0, .8, .13, 1);
            background-color: rgba(79,192,141,0.5);
            // background-color: #444
    p
        text-align left
    .link-item
        text-indent 20px
        font-size 18px;
        transition all .2s
        a
            color: inherit;
            font-weight normal
            position relative
            transition all .2s
            font-size 1rem
            &:hover
                &::after
                    content: "";
                    position: absolute;
                    z-index: -1;
                    top: 60%;
                    left: -0.1px;
                    right: -0.1px;
                    bottom: 0;
                    transition: top 200ms cubic-bezier(0, .8, .13, 1);
                    background-color: rgba(79,192,141,0.5);
        .link-item-index
            font-size 14px
            font-family source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    .dot
        display inline-block
        height 1em
        line-height 1
        vertical-align -.25ex
        overflow hidden
        &::before
            display block
            content '...\A..\A.'
            white-space pre-wrap
            animation playDot 2s infinite step-start both
    .more-article
        color #444
        font-size 1rem
        &:hover
            text-decoration:underline
    .title-tips
        line-height 1
        margin-bottom -10px
        text-align: left;
        z-index -1
        span
            color #e96900
            // background-color: #f8f8f8;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            font-size 12px
@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem
  .index-center
      width 100%

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
</style>
