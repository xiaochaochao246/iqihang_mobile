<template>
    <div>
        <ul class="itemBox">
            <!-- 一级目录 -->
            <li class="firstItem" v-for="(item,index) in chapterArr" :key="index">
                <div @click.stop @click="firstChapter(item.chapterId)" class="chapterItem">
                    <img v-show='item.live' class="chapterLiveImg" src="./mainImg/live.png" alt="">
                    <h3>{{item.chapterName}}</h3>
                    <img v-show="firstChapterId != item.chapterId" class="firstChapterImg" src="./mainImg/chapter.png" alt="">
                    <img v-show="firstChapterId == item.chapterId" class="firstChapterImg" src="./mainImg/chapter_sel.png" alt="">
                </div>
                <!-- 一级视频 -->
                <ul v-if="item.videoList.length > 0 && firstChapterId == item.chapterId" class="firstVideo">
                    <li v-for="(firstVideo,fvIndex) in item.videoList" :key="fvIndex">
                        <div class="videoBox">
                            <img class="noteImg" v-if="firstVideo.videoType == 1" src="./mainImg/notes.png" alt="">
                            <img class="videoImg" v-if="firstVideo.videoType == 2" src="./mainImg/icon_video.png" alt="">
                            <img class="liveImg" v-if="firstVideo.videoType == 0" src="./mainImg/liveIcon.png" alt="">
                            <p @click.stop @click="jumpPlayVideo(firstVideo.videoCompany,firstVideo.videoName,firstVideo.videoId)">{{firstVideo.videoName}}</p>
                            <span @click.stop @click="noteDown(firstVideo.videoId)" class="noteBtn" v-if="firstVideo.videoType == 1">查看</span>
                            <span class="liveTime" v-if="firstVideo.videoType == 0">{{firstVideo.startTime}}-{{firstVideo.endTime}}</span>
                            <span :class="firstVideo.liveStatus == '0' ? 'liveBtn liveBtnBlur' : firstVideo.liveStatus == '1' ? 'liveBtn liveBtnOrange':'liveBtn liveBtnGray'" v-if="firstVideo.videoType == 0">{{firstVideo.liveStatus == '0' ? '未开始' : firstVideo.liveStatus == '1' ? '直播中' : '已结束'}}</span>
                        </div>
                    </li>
                </ul>
                <!-- 二级目录 -->
                <ul class="secondItem" v-if="item.childern.length > 0 ">
                    <li v-if="firstChapterId == secondItem.chapterPid" @click.stop @click="secondChapter(secondItem.chapterId)"  v-for="(secondItem,secondIndex) in item.childern" :key="secondIndex">
                        <div class="chapterItem secondBg">
                            <h3>{{secondItem.chapterName}}</h3>
                            <span>共<i> {{videoSum[secondItem.chapterId]}} </i>节</span>
                        </div>
                        <!-- 二级视频 -->
                        <ul class="firstVideo" v-if="secondItem.videoList.length > 0 && secondChapterId == secondItem.chapterId">
                            <li v-for="(secondVideo,fvIndex) in secondItem.videoList" :key="fvIndex">
                                <div class="videoBox">
                                    <img class="noteImg" v-if="secondVideo.videoType == 1" src="./mainImg/notes.png" alt="">
                                    <img class="videoImg" v-if="secondVideo.videoType == 2" src="./mainImg/icon_video.png" alt="">
                                    <img class="liveImg" v-if="secondVideo.videoType == 0" src="./mainImg/liveIcon.png" alt="">
                                    <p @click.stop @click="jumpPlayVideo(secondVideo.videoCompany,secondVideo.videoName,secondVideo.videoId)">{{secondVideo.videoName}}</p>
                                    <span @click.stop @click="noteDown(secondVideo.videoId)" class="noteBtn" v-if="secondVideo.videoType == 1">查看</span>
                                    <span class="liveTime" v-if="secondVideo.videoType == 0">{{secondVideo.startTime}}-{{secondVideo.endTime}}</span>
                                    <span class="liveBtn" v-if="secondVideo.videoType == 0">{{secondVideo.liveStatus == '0' ? '未开始' : secondVideo.liveStatus == '2' ? '已结束' : '直播中'}}</span>
                                </div>
                            </li>
                        </ul>
                        <!-- 三级目录 -->
                        <ul class="threeItem" v-if="secondItem.childern.length > 0">
                            <li v-if="secondChapterId == threeItem.chapterPid" v-for="(threeItem,threeIndex) in secondItem.childern" :key="threeIndex">
                                <div @click.stop @click="threeChapter(threeItem.chapterId)" class="chapterItem">
                                    <h3>{{threeItem.chapterName}}</h3>
                                    <img class="firstChapterImg" src="./mainImg/icon_top.png" alt="">
                                </div>
                                <!-- 三级视频 -->
                                <ul class="firstVideo" v-if="threeItem.videoList.length > 0 && threeChapterId == threeItem.chapterId">
                                    <li v-for="(threeVideo,fvIndex) in threeItem.videoList" :key="fvIndex">
                                        <div class="videoBox">
                                            <img class="noteImg" v-if="threeVideo.videoType == 1" src="./mainImg/notes.png" alt="">
                                            <img class="videoImg" v-if="threeVideo.videoType == 2" src="./mainImg/icon_video.png" alt="">
                                            <img class="liveImg" v-if="threeVideo.videoType == 0" src="./mainImg/liveIcon.png" alt="">
                                            <p @click.stop @click="jumpPlayVideo(threeVideo.videoCompany,threeVideo.videoName,threeVideo.videoId)">{{threeVideo.videoName}}</p>
                                            <span @click.stop @click="noteDown(threeVideo.videoId)" class="noteBtn" v-if="threeVideo.videoType == 1">查看</span>
                                            <span class="liveTime" v-if="threeVideo.videoType == 0">{{threeVideo.startTime}}-{{threeVideo.endTime}}</span>
                                            <span class="liveBtn" v-if="threeVideo.videoType == 0">{{threeVideo.liveStatus == '0' ? '未开始' : threeVideo.liveStatus == '2' ? '已结束' : '直播中'}}</span>
                                        </div>
                                    </li>
                                </ul>
                                <!-- 四级目录 -->
                                <ul class="fourItem" v-if="threeItem.childern.length > 0">
                                    <li v-if="threeChapterId == fourItem.chapterPid" v-for="(fourItem,fourIndex) in threeItem.childern" :key="fourIndex">
                                        <div @click.stop @click="fourChapter(fourItem.chapterId)" class="chapterItem">
                                            <h3>{{fourItem.chapterName}}</h3>
                                            <img class="firstChapterImg" src="./mainImg/four_top.png" alt="">
                                        </div>
                                        <!-- 四级视频 -->
                                        <ul class="firstVideo" v-if="fourItem.videoList.length > 0 && fourChapterId == fourItem.chapterId">
                                            <li v-for="(fourVideo,fvIndex) in fourItem.videoList" :key="fvIndex">
                                                <div class="videoBox">
                                                    <img class="noteImg" v-if="fourVideo.videoType == 1" src="./mainImg/notes.png" alt="">
                                                    <img class="videoImg" v-if="fourVideo.videoType == 2" src="./mainImg/icon_video.png" alt="">
                                                    <img class="liveImg" v-if="fourVideo.videoType == 0" src="./mainImg/liveIcon.png" alt="">
                                                    <p @click.stop @click="jumpPlayVideo(fourVideo.videoCompany,fourVideo.videoName,fourVideo.videoId)">{{fourVideo.videoName}}</p>
                                                    <span @click.stop @click="noteDown(fourVideo.videoId)" class="noteBtn" v-if="fourVideo.videoType == 1">查看</span>
                                                    <span class="liveTime" v-if="fourVideo.videoType == 0">{{fourVideo.startTime}}-{{fourVideo.endTime}}</span>
                                                    <span class="liveBtn" v-if="fourVideo.videoType == 0">{{fourVideo.liveStatus == '0' ? '未开始' : fourVideo.liveStatus == '2' ? '已结束' : '直播中'}}</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
        firstChapterId:'',
        secondChapterId:'',
        threeChapterId:'',
        fourChapterId:''
    };
  },
  props: ["chapterArr","userName","catalogId","courseId","videoSum"],
  watch: {
    chapterArr() {
      this.aaa();
    }
  },
  methods: {
    aaa() {
    },
    //一级目录
    firstChapter(id){
        if(this.firstChapterId == id) {
            this.firstChapterId='';
            return 
        }
        this.firstChapterId = id;
    },
    //二级目录
    secondChapter(id){
        if(this.secondChapterId == id) return this.secondChapterId = '';
        this.secondChapterId = id;
    },
    //三级目录
    threeChapter(id){
        if(this.threeChapterId == id) return this.threeChapterId = '';
        this.threeChapterId = id;
    },
    //四级目录
    fourChapter(id){
        if(this.fourChapterId == id) return this.fourChapterId=''
        this.fourChapterId = id;
    },
    // 视频跳转
    jumpPlayVideo(type, title, vid) {
    //   if (this.loginStatus == "888") {
    //     this.$router.push({
    //       path: "/login",
    //       query: { id: "/course/courseconter?id=" + this.$route.query.id }
    //     });
    //     return;
    //   }
    //   if (this.expired == 1) {
    //     Toast({
    //       message: "此课程已过期",
    //       position: "middle",
    //       duration: 1000
    //     });
    //     return;
    //   }
    //   if (this.buyStatus == "1") {
    //     Toast({
    //       message: "您还未购买此课程" + this.courseTitel + "请先购买",
    //       position: "middle",
    //       duration: 1000
    //     });
    //     return;
    //   }
      if (type == "3") {
        if (vid.indexOf("=") != 11) {
          vid = vid.split("=")[1];
        }
        window.location.href = `http://r.iqihang.com/live/mobile.html?&vid=${vid}&name=${
          this.userName
        }&catalogId=${this.catalogId}`;
        return;
      }
      if (type == "4") {
        vid = vid.substring(vid.lastIndexOf("/")).split("/")[1];
      }
      this.$router.push({
        path: "/recorded",
        query: { courseId: this.courseId, playType: type, vdName: title, vdUser: vid }
      });
    },
    //下载电子讲义
    //讲义下载
    noteDown(url) {    
        window.location.href = url;
    }    
  },
  mounted() {}
};
</script>
<style scoped>
.firstItem {
  font-size: 0.3rem;
  font-weight: 500;
  color: rgba(74, 74, 74, 1);
  border-bottom: 0.01rem solid #e7e7e7;
  padding: 0 0 0 0.2rem;
}
.chapterItem {
  border-bottom: 0.01rem solid #e7e7e7;
  padding: 0.2rem 0;
}
.chapterItem h3 {
  display: inline-block;
  width: 80%;
  line-height: 0.48rem;
}
.chapterItem .chapterLiveImg{
    width: 0.68rem;
    height: 0.32rem;
    float: left;
    margin: 0.08rem 0.1rem 0 0;
}
.chapterItem .firstChapterImg {
  float: right;
  width: 0.34rem;
  height: 0.34rem;
  margin-right: 0.2rem;
}
.secondBg {
  background: #def7f1;
}
.secondBg span{
    float: right;
    line-height: 0.48rem;
    margin-right: 0.2rem;
}
.secondBg span i{
    color: #ff5b09;
}
.threeItem,
.fourItem {
  padding-left: 0.2rem;
}
.videoBox {
  position: relative;
}
.videoBox p {
  display: inline-block;
  padding: 0.2rem 0;
  line-height: 0.48rem;
  width: 75%;
}
.videoBox .noteImg {
  display: inline-block;
  height: 0.36rem;
  width: 0.3rem;
}
.videoBox .videoImg {
  display: inline-block;
  width: 0.28rem;
  height: 0.18rem;
}
.videoBox .liveImg {
  display: inline-block;
  width: 0.32rem;
  height: 0.28rem;
}
.firstVideo{
    padding-left: 0.1rem;
}
.firstVideo li {
  border-bottom: 0.01rem solid #e7e7e7;
}
.firstVideo .noteBtn {
  width: 1.1rem;
  line-height: 0.5rem;
  text-align: center;
  color: white;
  background: #3acbae;
  border-radius: 0.05rem;
  float: right;
  margin:0.15rem 0.2rem 0 0;

}
.firstVideo .liveTime {
  display: block;
  padding: 0 0 0.2rem 0.4rem;
}
.firstVideo .liveBtn {
  display: inline-block;
  width: 1.1rem;
  line-height: 0.5rem;
  text-align: center;
  color: white;
  background: #3acbae;
  border-radius: 0.05rem;
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
}
.firstVideo .liveBtnBlur {
  background: #3acbae;
}
.firstVideo .liveBtnGray {
  background: #e7e7e7;
}
.firstVideo .liveBtnOrange {
  background: #ff5b09;
}
</style>



