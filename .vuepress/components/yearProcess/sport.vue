<template>
    <div>
        <TableBox :items="items"></TableBox>
        <span>
            success:
            <span class="green">{{success}}</span>
        </span>
        <span>
            fail:
            <span class="red">{{fail}}</span>
        </span>
    </div>
</template>
<script>
import TableBox from './table-box'
import dateRes from './handleDate.js'
import did from './did.js'
export default {
    components:{
        TableBox
    },
    computed:{
        items(){
            return dateRes.allDate.map(it=>{
                it.did = did.sport.filter(item=>item===it.date).length!==0
                return it
            })
        },
        success(){
            return dateRes.sportSuccess
        },
        fail(){
            return dateRes.sportFail
        }
    }
}
</script>
<style lang="stylus" scoped>
span
    color: #e96900;
    padding: 0.25rem 0.5rem;
    margin: 0;
    font-size: 0.85em;
    background-color: #f8f8f8;
    border-radius: 3px;
    .green
        color #7bc96f
    .red
        color red
</style>
