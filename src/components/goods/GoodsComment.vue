<template>
    <div>
        <cmt-box :goodsId="goodsId"></cmt-box>
    </div>
</template>

<script>
import Commnet from '../subcompomets/Comment.vue'
export default {
    name:"GoodsComment",
    components:{
        "cmt-box":Commnet
    },
    data(){
        return {
            goodsId:this.$route.params.goodsId
        }
    }
}
</script>

<style scoped>

</style>
