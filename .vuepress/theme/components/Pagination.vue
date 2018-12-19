<template>
  <nav class="pagination-nav">
    <router-link class="pagination-action pagination-prev" 
      to="$pagination.prevLink"
      >← </router-link>
    <div class="pagination-docker">
      <!-- <router-link v-for="i in [1,2,3]"
        :key="i" 
        class="pagination-num"
        to="path"
        class="px">
        {{ i + 1 }}
      </router-link>   -->
    </div>
    <router-link class="pagination-action pagination-next" 
      to="/category/all.html#3"
      > →</router-link>
  </nav>
</template>

<script>
export default {
//   methods: {
//     hightlightCurrentPage(pageNum) {
//       return {
//         'pagination-current': pageNum === this.$pagination.currentIndex + 1
//       }
//     }
//   }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl'
.pagination-nav
  padding 1rem
  text-align center
  clear both
  line-height 2
  overflow hidden
  a:hover
    color $accentColor
.pagination-action
  display block
  color $textColor
  text-align center
  cursor pointer
  width 2rem
  height 2rem
  border-radius 50%
  transition all .2s ease-in-out
  background-color #fff
.pagination-num
  cursor pointer
  transition all .2s ease-in-out
  color $textColor
  padding 10px 20px
  line-height 1
  height 2px
.pagination-docker
  display inline-block
  a:hover
    font-weight 800
  a:not(.pagination-current):hover
    color $textColor!important
.pagination-prev
  float left
.pagination-next
  float right
.pagination-current
  font-weight 700
  color $accentColor
</style>