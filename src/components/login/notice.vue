<template>
  <div class="notice">
    <div class="notice-return" >
      <div class="notice-return-img" @click="returnIndex()"></div>公 告
    </div>
    <div class="title">{{noticeTitle}}</div>
    <div class="time">
        <p>发布时间：<span class="sj">{{noticeCreatedAt|dataTime}}</span></p>
        <p>阅读量：<span class="ydl">{{noticeBrowse}}</span></p>
    </div>
    <p class="content" v-html="noticeContent">{{noticeContent}}</p>
  </div>

</template>
<script>
  export default {
    name: 'notice',
    data () {
      return {
        noticeTitle : '',
        noticeContent : '',
        noticeCreatedAt:'',
        noticeBrowse:''
      }
    },
    filters:{
      //时间转换
      dataTime(time){
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var houer = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var times = `${year}-${month}-${day} ${houer}:${minutes}:${seconds}`;//时间拼接字符串
        return times
      }
    },
    computed: {
    },
    methods:{
      //获取id
      notice(){
        this.axios.get(`/es/cms_content_index/cms_content_type/`+this.$route.query.id)
          .then(response => {
            console.log(response);
            this.noticeContent = response.data._source.cms_content_type_content;//内容
            this.noticeTitle = response.data._source.cms_content_type_title;//标题
            this.noticeCreatedAt = response.data._source.cms_content_type_createdAt;//时间
            this.noticeBrowse = response.data._source.cms_content_type_totalViews//浏览量
          })
          .catch(err => {
            console.log(err)
          })
      },
    //  点击返回首页
      returnIndex(){
        this.$router.push({path:'shou'})
      }
    },
    mounted(){
      this.notice()
    },
    watch: {

    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .notice-return{
    width: 100%;
    height: 1rem;
    background: rgb(58, 203, 174);
    position: relative;
    text-align: center;
    font-size: 0.36rem;
    color: #ffffff;
    line-height: 1rem;
  }
  .notice-return-img{
    background: url("./loginImg/left-btn.png") no-repeat;
    background-size:100% auto;
    width: 0.25rem;
    height: 0.47rem;
    position: absolute;
    top: 50%;
    left: 0.2rem;
    margin-top: -0.235rem;
  }
  .notice .title{
    font-size: 0.3rem;
    padding: 0.2rem;
    color: rgb(153, 153, 153);
  }
  .notice .time{
    display: flex;
    justify-content: space-between;
    padding: 0 0.2rem 0.2rem 0.2rem;
    font-size: 0.02rem;
    border-bottom:1px solid rgba(153, 153, 153, 0.59);
  }
  .notice .time p{
    color: rgb(153, 153, 153);
  }
  .notice .time span{
    color: rgb(153, 153, 153);
  }
  .notice .content{
    padding: 0.2rem;
    line-height: 0.32rem;
  }
</style>



