<template>
    <div class="avatar-container" :class="{
            pcIndexHidden:isIndex
        }">
        <div class="box">
            <div class="bg">
            <div @click="switchImg" :style="{backgroundImage:bgImg,opacity:opacity}" class="bg-img"></div>
            <Loading v-if="loading"></Loading>
            </div>
            <div class="author">{{ $site.themeConfig.short_title }}</div>
            <div class="desc">
                一个前端 / <a class="contact" style="cursor:pointer;color:#3eaf7c" :href="$site.themeConfig.github" target="_blank">github</a>
                <div>
                    <a style="cursor:pointer;" :href="'mailto:'+$site.themeConfig.email">Email:{{ $site.themeConfig.email }}</a>
                </div>
            </div>
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
import { debuglog } from 'util';
export default {
    components:{
        Loading
    },
    data(){
        return {
            bgImg:'',
            opacity:0,
            loading:true,
            pageProcess:0
        }
    },
    computed: {
        categoryCount(){
            return this.$site.themeConfig.nav.length-1
        },
        blogsCount(){
            return this.$site.pages.length-this.$site.themeConfig.nav.length
        },
        isIndex(){
            return this.$route.path === '/'
        },
    },
    created() {
        this.loadImag()
    },
    mounted(){
        // const height  =document.documentElement.offsetHeight+document.documentElement.scrollTop
        // window.addEventListener('scroll',()=>{
        //     this.pageProcess = ((window.scrollY/height)*100).toFixed(0);
        // })
    },
    methods:{
        switchImg(){
            // this.opacity = 0
            // this.loading = true
            // this.loadImag()
        },
        loadImag(){
            try{
                const img = new Image()
                // img.src = `http://www.ruanyifeng.com/images_pub/pub_${Math.floor(Math.random() * (354) + 1)}.jpg`
                img.src=this.$site.themeConfig.avatar
                img.onload = ()=>{
                    this.bgImg = `url(${img.src})`
                    this.loading = false
                    this.opacity = 1
                }
            }catch(err){
                // node use Image Object err!------ssr error
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.pcIndexHidden
    display none
.avatar-container
    position fixed
    width 13rem
    right 2rem
    top 7rem
    z-index 999
    background-color #fff
    .box
        width 100%
        height 21.5rem
        border 1px solid $borderColor
        border-radius 5px
    .contact
        white-space nowrap
        font-size 12px
        line-height: 1
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
        border-top-left-radius 5px
        border-top-right-radius 5px
        // cursor alias
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
        cursor default
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
    width 100%
    right 0
    top 1rem
    .box
        border-radius inherit
  .bg 
    .bg-img
        border-radius inherit
  .pcIndexHidden
      display block
@media (max-width: 1300px) and (min-width:$MQMobile)
  .avatar-container
    visibility hidden
</style>
