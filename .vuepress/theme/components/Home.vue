<template>
  <div class="home">
    <canvas id="index-background"></canvas>
    <!-- <div class="hero">
      <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        alt="hero"
      >

      <h1>
          {{ data.heroText || $title || 'Hello' }}
      </h1>

      <p class="description">
        {{ data.tagline || $description || 'Welcome to your VuePress site' }}
      </p>

      <p
        class="action"
        v-if="data.actionText && data.actionLink"
      >
        <NavLink
          class="action-button"
          :item="actionLink"
        />
      </p>
    </div> -->

    <div class="index-center">
        <span class="title font-base">{{$title}}</span>
        <p class="title-tips">
            <span>最近更新：</span>
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
            <!-- <span style="text-align:left" class="dot"></span> -->
        </p>
    </div>


    <Content class="custom"/>

    <!-- <div
      class="footer"
      v-if="data.footer"
    >
      {{ data.footer }}
    </div> -->
  </div>
</template>

<script>

import NavLink from './NavLink.vue'
// import VSparkline from './VSparkline'

export default {
  components: { NavLink },

  computed: {
    data () {
      return this.$page.frontmatter
    },
    recentList(){
        const pages = this.$site.pages.filter(it=>it.regularPath.indexOf('blog')>-1);
        pages.sort((a,b)=>{
            return +b.regularPath.match(/\d{8}/)[0] - (+a.regularPath.match(/\d{8}/)[0])
        })
        const l = pages.length
        return pages.slice(0,4)
    },
    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    },
  },
  mounted(){
      var c = document.getElementById('index-background'),
        x = c.getContext('2d'),
        w = window.innerWidth,
        h = window.innerHeight,
        f = 50,
        q,
        r = 0,
        u = Math.PI * 2,
        v = Math.cos,
        z = Math.random
        c.width = w
        c.height = h
        x.scale(1, 1)
        x.globalAlpha = 0.8
        function i() {
            x.clearRect(0, 0, w, h)
            q = [{ x: 0, y: h * .7 + f }, { x: 0, y: h * .7 - f }]
            while (q[1].x < w + f) d(q[0], q[1])
        }
        function d(i, j) {
            x.beginPath()
            x.moveTo(i.x, i.y)
            x.lineTo(j.x, j.y)
            var k = j.x + (z() * 2 - 0.25) * f,
            n = y(j.y)
            x.lineTo(k, n)
            x.closePath()
            r -= u / -50
            x.fillStyle = '#' + (v(r) * 127 + 128 << 16 | v(r + u / 3) * 127 + 128 << 8 | v(r + u / 3 * 2) * 127 + 128).toString(16)
            x.fill()
            q[0] = q[1]
            q[1] = { x: k, y: n }
        }
        function y(p) {
            var t = p + (z() * 2 - 1.1) * f
            return (t > h || t < 0) ? y(p) : t
        }
        // document.addEventListener('click',i)
        i()
  },
}
</script>

<style lang="stylus">
#index-background
    position absolute
    width 100%
    height 100%
    z-index 666
    left 0
    background #fff
.index-center
    width 300px
    position fixed
    top 35%
    left 50%
    transform translate(-50%,-50%)
    z-index 667
    opacity 0.9
    text-align center
    // background-color: rgba(0,0,0,.5);
    color: #444;
    padding 20px
    border-radius: 10px;
    font-family "Montserrat", "Helvetica Neue", "Hiragino Sans GB", "LiHei Pro", Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    .title
        font-size 28px
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
        text-indent 50px
        font-size 18px;
        transition all .2s
        &:hover
            background-color rgba(0,0,0,.7)
            color #fff
            text-decoration:underline
        a
            color: inherit;
            font-weight normal
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
        &:hover
            text-decoration:underline
    .title-tips
        text-align: left;
        span
            color #e96900
            background-color: #f8f8f8;
            padding: 0.25rem 0.5rem;
            border-radius: 3px;
            font-size 12px
@keyframes playDot {
    33%{
        transform translateY(-2em)
    }
    66%{
        transform translateY(-1em)
    }
}

.home
//   padding $navbarHeight 2rem 0
  max-width 960px
  margin 0px auto
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
  .footer
    padding 2.5rem
    border-top 1px solid $borderColor
    text-align center
    color lighten($textColor, 25%)
.index-btn
    display inline-block
    margin 0 auto 
    background-color #3eaf7c
    // background-color #000
    color #fff
    font-size 1.2rem
    padding .8rem 1.6rem
    border-radius 4px
.relative
    position relative
    .line-shot
        width 200%
        position absolute
        left -50%
@media (max-width: $MQMobile)
  .home
    .features
      width 100%
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

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
    .relative 
        .line-shot
            width 300%
            left -100%
</style>
