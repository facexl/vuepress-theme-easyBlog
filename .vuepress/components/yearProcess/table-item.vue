<template>
        <div :class="did?'green':'white'" class="table-item" :title="title">
            <span class="tooltiptext">{{title}}</span>
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
    position relative
    width 10px
    height 10px
    margin 1px
    &:hover .tooltiptext
        visibility: visible
        opacity 1
    .tooltiptext
        visibility: hidden;
        width: 120px;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 50%;
        margin-left: -60px;
        opacity: 0;
        transition: opacity 0.3s;
        &:after
            content: "";
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: #555 transparent transparent transparent;
@media (max-width: $MQMobile)
    .table-item
        position static
        .tooltiptext
            position: fixed;
            height: 20px;
            left: 70%;
            top: 50%;
            transform: translate(-50%,-50%);
            &:after
                top 0
.white
    box-sizing border-box
    border 1px solid $borderColor
.green
    background-color rgb(123, 201, 111)

</style>
