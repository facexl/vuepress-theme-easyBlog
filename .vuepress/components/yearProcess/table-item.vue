<template>
        <div :class="did?'green':'white'" class="table-item" :title="title">
            
        </div>
</template>

<script>
export default {
    props:{
        did:{
            type:Boolean,
            default:false
        },
        title:{
            type:String,
            default:''
        }
    }
}
</script>

<style lang="stylus" scoped>
.table-item
    width 10px
    height 10px
    margin 1px
.white
    box-sizing border-box
    border 1px solid $borderColor
.green
    background-color rgb(123, 201, 111)
</style>
