<template>
    <div class="table-box">
        <TableItem v-for="(item,i) in items" :title="item.date" :did="item.did" :key="i"></TableItem>
    </div>
</template>

<script>
import TableItem from './table-item'
export default {
    components:{
        TableItem
    },
    props:{
        items:{
            type:Array,
            // default:[]
        }
    },
}
</script>

<style lang="stylus" scoped>
.table-box
    display flex
    flex-direction column
    flex-wrap wrap
    width 100%
    height 80px
    align-content flex-start
    overflow scroll
</style>
