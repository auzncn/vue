<template>
    <div class="photoinfodiv">
        <h1>{{photoInfo.title}}</h1>
        <p><span>发表于：{{photoInfo.createTime|dateformat()}}</span><span>点击 {{photoInfo.click}} 次</span></p>
        <hr>
        <div class="photohumnnaildiv">
            <vue-preview :list="thumbnail"
                :thumbImageStyle="{width: '100px', height: '100px', margin: '8px'}"
                :tapToClose="true"
            />
        </div>
        <div class="content">{{photoInfo.content}}</div>
        <cmt-box :photoId="id"></cmt-box>
    </div>

</template>

<script>
import Comment from "../subcompomets/Comment.vue";

export default {    
    name:"PhotoInfo",
    components:{
        "cmt-box":Comment
    },
    data(){
        return {
            id:this.$route.params.id,
            photoInfo:{},
            thumbnail:[]
        }
    },
    created(){
        this.getPhotoInfo();
        this.getPhotoThumbnail();
    },
    methods:{
        getPhotoInfo(){
            this.$axios({
                url:"/photoInfo/getByPhotoId",
                method:"post",
                params:{photoId:this.id}
            }).then(e=>{
                if(e.data.status==="OK"){
                    this.photoInfo=e.data.data;
                }
            })
        },
        getPhotoThumbnail(){
            this.$axios({
                url:"/photoThumbnail/listByPhotoId",
                method:"post",
                params:{photoId:this.id}
            }).then(e=>{
                if(e.data.status==="OK"){
                    e.data.data.forEach(i => {
                        this.thumbnail.push({
                            src:i.url,
                            w: 600,
                            h: 400
                        })
                    });
                }
            });
            console.log(this.thumbnail);           
        }
    }
}
</script>

<style scoped>
    .photoinfodiv{
        padding:8px;
    }

    .photoinfodiv h1{
        text-align:  center;
        font-size: 17px;
        color:  #26A2FF;
        margin: 15px 0;
    }
    .photoinfodiv p{
        display: flex;
        justify-content: space-between;
        font-size: 14px;
    }
    .content{
        font-size: 14px;
        line-height: 30px;
        text-indent: 2em;
    }
</style>

