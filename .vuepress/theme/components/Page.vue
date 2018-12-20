<template>
  <div class="page">
    <slot name="top"/>

    <Content/>

    <!-- <div class="page-edit" v-if="contentMounted">
      <div
        class="edit-link"
        v-if="editLink"
      >
        <a
          :href="editLink"
          target="_blank"
          rel="noopener noreferrer"
        >{{ editLinkText }}</a>
        <OutboundLink/>
      </div>

      <div
        class="last-updated"
        v-if="lastUpdated"
      >
        <span class="prefix">{{ lastUpdatedText }}: </span>
        <span class="time">{{ lastUpdated }}</span>
      </div>
    </div> -->

    <div class="page-nav" v-if="footer.prev || footer.next">
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
  </div>
</template>

<script>
import { resolveEasyBlogPage, normalize, outboundRE, endingSlashRE,isCategoryPage } from '../util'
import Pagination from './Pagination'

export default {
  props: ['sidebarItems'],
  components:{
      Pagination
  },
  computed: {
    contentMounted () {
      return this.$vuepress.$get('contentMounted')
    },

    lastUpdated () {
      return this.$page.lastUpdated
    },

    lastUpdatedText () {
      if (typeof this.$themeLocaleConfig.lastUpdated === 'string') {
        return this.$themeLocaleConfig.lastUpdated
      }
      if (typeof this.$site.themeConfig.lastUpdated === 'string') {
        return this.$site.themeConfig.lastUpdated
      }
      return 'Last Updated'
    },
    isCategoryPage(){
        return isCategoryPage(this.$route.path)
    },

    // prev () {
    //   const prev = this.$page.frontmatter.prev
    //   if (prev === false) {
    //     return
    //   } else if (prev) {
    //     return resolvePage(this.$site.pages, prev, this.$route.path)
    //   } else {
    //     return resolvePrev(this.$page, this.sidebarItems)
    //   }
    //     resolveEasyBlogPage(this.$site.pages, this.$route.path)
    // },

    // next () {
    //   const next = this.$page.frontmatter.next
    //   if (next === false) {
    //     return
    //   } else if (next) {
    //     return resolvePage(this.$site.pages, next, this.$route.path)
    //   } else {
    //     return resolveNext(this.$page, this.sidebarItems)
    //   }
    // },
    footer(){
        return resolveEasyBlogPage(this.$site.pages, this.$route.path)
    },

    editLink () {
      if (this.$page.frontmatter.editLink === false) {
        return
      }
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      let path = normalize(this.$page.path)
      if (endingSlashRE.test(path)) {
        path += 'README.md'
      } else {
        path += '.md'
      }
      if (docsRepo && editLinks) {
        return this.createEditLink(repo, docsRepo, docsDir, docsBranch, path)
      }
    },

    editLinkText () {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      )
    }
  },

  methods: {
    createEditLink (repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo)
          ? docsRepo
          : repo
        return (
          base.replace(endingSlashRE, '') +
           `/${docsBranch}` +
           (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
           path +
           `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        )
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`

      return (
        base.replace(endingSlashRE, '') +
        `/edit/${docsBranch}` +
        (docsDir ? '/' + docsDir.replace(endingSlashRE, '') : '') +
        path
      )
    }
  }
}

// function resolvePrev (page, items) {
//   return find(page, items, -1)
// }

// function resolveNext (page, items) {
//   return find(page, items, 1)
// }

// function find (page, items, offset) {
//   const res = []
//   items.forEach(item => {
//     if (item.type === 'group') {
//       res.push(...item.children || [])
//     } else {
//       res.push(item)
//     }
//   })
//   for (let i = 0; i < res.length; i++) {
//     const cur = res[i]
//     if (cur.type === 'page' && cur.path === decodeURIComponent(page.path)) {
//       return res[i + offset]
//     }
//   }
// }
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'

.page
  padding-bottom 2rem

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

</style>
