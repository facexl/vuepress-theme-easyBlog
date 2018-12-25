<template>
    <div class="avatar-container">
        <div class="box">
            <div class="bg">
            <div :style="{backgroundImage:bgImg,opacity:opacity}" class="bg-img"></div>
            <Loading v-if="loading"></Loading>
            </div>
            <div class="author">小浪</div>
            <div class="desc">一个前端</div>
            <nav class="site-state motion-element">
                <div class="site-state-item site-state-posts">
                  <a href="javascript:;">
                    <span class="site-state-item-count">{{blogsCount}}</span>
                    <span class="site-state-item-name">日志</span>
                  </a>
                </div>
                <div class="site-state-item site-state-categories">
                  <a href="javascript:;">
                    <span class="site-state-item-count">{{categoryCount}}</span>
                    <span class="site-state-item-name">分类</span>
                  </a>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
import Loading from './Loading'
export default {
    components:{
        Loading
    },
    data(){
        return {
            bgImg:'',
            opacity:0,
            loading:true
        }
    },
    computed: {
        categoryCount(){
            return this.$site.themeConfig.nav.length-1
        },
        blogsCount(){
            return this.$site.pages.length-this.$site.themeConfig.nav.length
        }
    },
    created() {
        try{
            const img = new Image()
            img.src = `http://www.ruanyifeng.com/images_pub/pub_${Math.floor(Math.random() * (354) + 1)}.jpg`
            img.onload = ()=>{
            this.bgImg = `url(${img.src})`
            this.loading = false
            this.opacity = 1
            }
        }catch(err){
           // node use Image Object err!------ssr error
        }
    },
}
</script>

<style lang="stylus" scoped>
.avatar-container
    position fixed
    width 13rem
    right 5rem
    top 7rem
    z-index 999
    background-color #fff
    .box
        width 100%
        height 20rem
        border 1px solid $borderColor
    .site-state 
        overflow hidden
        line-height 1.4
        white-space nowrap
        text-align center
.bg
    display flex
    align-items center
    justify-content center
    position relative
    box-sizing border-box
    height 10rem
    .bg-img
        position absolute
        width 100%
        height 10rem
        background-size cover
        background-position 50%
        left 0
        top 0
        opacity 0
        transition all 1s
.author
    display flex
    align-items center
    justify-content center
    height: 3rem
    margin: 0;
    color: #222;
    font-weight: 600;
.desc
    margin-top: 0;
    text-align: center;
    font-size: 13px;
    color: #999;
    margin-bottom:10px
.site-state-item:first-child {
    border-left: none;
}
.site-state-item
    display: inline-block;
    padding: 0 10px;
    a
        border-bottom none 
        color #555
.site-state-item-count
    display: block;
    text-align: center;
    color: inherit;
    font-weight: 600;
    font-size: 16px;
.site-state-item-name
    font-size: 13px;
    color: #999;
@media (max-width: $MQMobile)
  .avatar-container
    position relative
    width 16.4rem
    right 0
    top 1rem
    z-index 999
    background-color #fff
</style>
