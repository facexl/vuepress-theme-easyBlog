<template>
  <nav class="pagination-nav">
      <div v-if="page.totalPage>1" class="page-box">
        <router-link class="pagination-action pagination-prev" 
        v-if="page.prevPage"
        :to="page.prevPage"
        >← </router-link>
        <div class="pagination-docker">
        <router-link v-for="item in page.pages"
            :key="item" 
            :to="`${item}.html`"
            :class="hightlightCurrentPage(item)?'pagination-current':''"
        >
            {{ item }}
        </router-link>  
        </div>
        <router-link class="pagination-action pagination-next"
        v-if="page.nextPage" 
        :to="page.nextPage"
        > →</router-link>
      </div>
      <!-- <div>第{{page.page}}页,共{{page.totalPage}}页</div> -->
  </nav>
</template>

<script>
export default {
    computed:{
        page(){
            const category = this.$page.title
            const pageList = category==='all'?
            this.$site.pages.filter(it=>it.frontmatter.category)
            :
            this.$site.pages.filter(it=>it.frontmatter.category===this.$page.title)
            const page = Number(this.$page.path.match(/\d+(?=\.html)/)[0])
            const pageSize = this.$site.themeConfig.pageSize || 20
            const totalCount = pageList.length
            const totalPage = Math.ceil(totalCount/pageSize)
            return {
                category,
                page,
                pageSize,
                pageList,
                totalCount:pageList.length,
                prevPage:page>1?`${page-1}.html`:false,
                nextPage:page<totalPage?`${page+1}.html`:false,
                pages:this.pagination(totalPage,page,5),
                totalPage
            }
        }
    },
  methods: {
    hightlightCurrentPage(pageNum) {
      return pageNum === Number(this.$page.path.match(/\d+(?=\.html)/)[0])
    },
    /**
     * @param totalPage 总页数
     * @param page 当前页
     * @param length 每次底部显示的页码数
     */
    pagination(totalPage,page,pageLen){
        const halfLen = Math.ceil(pageLen/2)
        const newArr = new Array(totalPage).fill(1).map((it,i)=>i+1)
        const length = newArr.length
        if(length>pageLen && page>halfLen){
            if(length-(page-halfLen)<pageLen){
                return newArr.splice(length-pageLen,pageLen)
            }
            return newArr.splice(page-halfLen,pageLen)
        }
        if(length>pageLen && page<=halfLen){
            return newArr.splice(0,pageLen)
        }
        return newArr
    }
  }
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
  a
    display inline-block
    width 40px
    font-family: consolas,monaco,"Andale Mono",monospace;
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
  color #e96900
.page-box
    display inline-block
</style>