<template>
  <main class="page">
    <slot name="top"/>

    <Content class="theme-default-content"/>


    <div class="page-nav" v-if="footer && (footer.prev || footer.next)">
      <p class="inner">
        <span
          v-if="footer.prev"
          class="prev"
        >
          ←
          <router-link
            v-if="footer.prev"
            class="prev"
            :to="footer.prevPath"
          >
            {{ footer.prevTitle }}
          </router-link>
        </span>

        <span
          v-if="footer.next"
          class="next"
        >
          <router-link
            v-if="footer.next"
            :to="footer.nextPath"
          >
            {{ footer.nextTitle }}
          </router-link>
          →
        </span>
      </p>
    </div>

    <slot name="bottom"/>

    <Pagination v-if="isCategoryPage"></Pagination>
    <div id="gitalk-container"></div>
  </main>
</template>

<script>
import { resolveEasyBlogPage,isCategoryPage } from '../util'
import Pagination from './Pagination'
import { debuglog } from 'util';
export default {
  props: ['sidebarItems'],

  components:{
    Pagination
  },
  computed: {
    isCategoryPage(){
        return isCategoryPage(this.$route.path)
    },
    footer(){
        return resolveEasyBlogPage(this.$site.pages, this.$route.path)
    },
  },
    mounted() {
        var gitalk = new Gitalk({
            clientID: 'a30708b5e0304ea8b54c',
            clientSecret: '63a05ab493fdd64bd04efc942dbd6c86906d689f',
            repo: 'facexl.github.io',
            owner: 'facexl',
            admin: ['facexl'],
            id: location.pathname,      // Ensure uniqueness and length less than 50
            distractionFreeMode: false,  // Facebook-like distraction free mode
        })
        gitalk.render('gitalk-container') 
  },
}

</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem
  display block

.page-edit
  @extend $wrapper
  padding-top 1rem
  padding-bottom 1rem
  overflow auto
  .edit-link
    display inline-block
    a
      color lighten($textColor, 25%)
      margin-right 0.25rem
  .last-updated
    float right
    font-size 0.9em
    .prefix
      font-weight 500
      color lighten($textColor, 25%)
    .time
      font-weight 400
      color #aaa

.page-nav
  @extend $wrapper
  padding-top 1rem
  padding-bottom 0
  .inner
    min-height 2rem
    margin-top 0
    border-top 1px solid $borderColor
    padding-top 1rem
    overflow auto // clear float
  .next
    float right

@media (max-width: $MQMobile)
  .page-edit
    .edit-link
      margin-bottom .5rem
    .last-updated
      font-size .8em
      float none
      text-align left
#gitalk-container
    margin 0 auto
    padding 0 1rem
    max-width $contentWidth
</style>
