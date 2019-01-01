<template>
    <div>
        <TableBox :items="items"></TableBox>
    </div>
</template>
<script>
import TableBox from './table-box'
import moment from 'moment'
const did = require('./did.js')
export default {
    components:{
        TableBox
    },
    computed:{
        items(){
            const arr = new Array(365).fill(null)
            const start = +new Date('2019-01-01')
            return arr.map((it,i)=>{
                const date = moment(start+86400000*i).format('YYYY-MM-DD')
                return {
                    title:date,
                    did:did.sport.filter(item=>item===date).length!==0
                }
            })
        }
    }
}
</script>