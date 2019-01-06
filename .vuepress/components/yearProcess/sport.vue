<template>
    <div>
        <TableBox :items="items"></TableBox>
    </div>
</template>
<script>
import TableBox from './table-box'
import {allDate} from './allDate.js'
import did from './did.js'
export default {
    components:{
        TableBox
    },
    computed:{
        items(){
            return allDate.map(it=>{
                it.did = did.sport.filter(item=>item===it.date).length!==0
                return it
            })
        }
    }
}
</script>