<template>
    <div class="demo-container" :style='{ width:width,height:height }'>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props:{
        width:{
            type:String,
            default:'100%'
        },
        height:{
            type:String,
            default:'25rem'
        }
    }
}
</script>

<style lang="stylus" scoped>

.demo-container
    border 1px solid #eaecef
</style>
