<template>
  <div class="couerse">
    <div>
      <PublicHeader :htitle="htitleText" @childReturn="allControl"></PublicHeader>
    </div>
    <div class="videobox">
      <div id="iframeId">
        <iframe :src="this.videoId" width="100%" height="210"></iframe>
      </div>
      <!--视频播放区-->
      <!--cc录播-->
      <!--<div v-show="cclubo">
        <iframe id="cciframe_078C9E95F76035E59C33DC5901307461" :src="this.videoId" frameborder="0" width="100%" height="210"></iframe>
      </div>-->
      <!--保利录播-->
      <!--<div v-show="baoli">
        <div id='paly'></div>
      </div>-->
    </div>
    <div class="videolist">
      <ul>
        <li v-for="item in videoBox" @click="videoTab(item.userPhone,item.videoCenter,item.videoTitle)">{{item.videoTitle}}<span>观看</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import PublicHeader from '@/components/public/header'
export default {
  components:{
    PublicHeader
  },
  name: 'index',
  data () {
    return {
      htitleText:'',
      videoBox:[],
      cclubo:true,
      baoli:true,
      videoId:''
    }
  },
  watch:{

  },
  methods:{
   allControl(){//返回上一页
        this.$router.go(-1)
      },
    video(){
      this.axios.get(`/es/index_product/type_product/${this.$route.query.id}`)
        .then(response => {
          let videoIdAll = JSON.parse(response.data._source.type_product_videoIds)//试听视频
          let videoBox = [];
          for(let i = 0; i < videoIdAll.length; i++){
            videoBox.push({'videoTitle':videoIdAll[i].title,'videoCenter':videoIdAll[i].content,'userPhone':videoIdAll[i].userPhone})
          }
          this.htitleText = videoBox[0].videoTitle;
          if(videoBox[0].userPhone == '1'){
            this.cclubo = true;
            this.baoli = false;
            this.player(videoBox[0].videoCenter)
          }else if(videoBox[0].userPhone == '2'){
            this.baoli = true;
            this.cclubo = false;
            this.baoliplayer(videoBox[0].videoCenter)
          }
          this.videoBox = videoBox;
        })
        .catch(err => {
          console.log(err)
        })
    },
    //cc录播视频
    player(id){
      this.videoId = 'https://p.bokecc.com/playhtml.bo?vid='+id+'&siteid=096E928BC2A97B87&autoStart=false&playerid=3325CEBD9FD114A09C33DC5901307461&playertype=1';
//     let iframeId = document.getElementById('iframeId');
//     iframeId.innerHTML = '';
//     try{
//       var iframe = document.createElement('<iframe name="ifr"></iframe>');
//     }catch(e){
//       var iframe = document.createElement('iframe');
//       iframe.name = 'ifr';
//     }
//     iframe.src= 'https://p.bokecc.com/playhtml.bo?vid='+id+'&siteid=096E928BC2A97B87&autoStart=false&playerid=3325CEBD9FD114A09C33DC5901307461&playertype=1';
//     iframe.style='width:100%; height:210px;'
//     iframeId.appendChild(iframe);
    },
    //保利录播
    baoliplayer(id){
      this.videoId = 'http://mobile.iqihang.com/baoli?'+id
//      let paly = document.getElementById('iframeId');
//      paly.innerHTML = '';
//      polyvObject('#iframeId').videoPlayer({
//        'width':'100%',
//        'height':'210',
//        'vid' : id,
//        'ts':'<?php echo $ts; ?>',
//        'sign':'<?php echo $hash; ?>',
//        'flashvars':{'ban_seek_by_limit_time':'off'}
//
//      });
    },
    videoTab(type,id,name){
      this.htitleText = name;
      if(type == '1'){
        this.player(id);
      }else if(type == '2'){
        this.baoliplayer(id);
      }
    }
  },
  mounted(){
    this.video()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .videolist li{
    width: 7.5rem;
    height: 1rem;
    border-bottom: 1px solid #e6e6e6;
    padding:0 .2rem;
    line-height: 1rem;
  }
  .videolist li span{
    float: right;
    width: 1rem;
    height: .5rem;
    display: inline-block;
    background: #3accae;
    color: #fff;
    line-height: .5rem;
    text-align: center;
    border-radius: .05rem;
    margin-top: .25rem;
  }
  .videobox{
    margin-top:1rem;
  }

</style>
