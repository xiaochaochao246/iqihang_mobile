<template>
  <div class="couerse">
    <div>
      <PublicHeader :htitle="htitleText"  @childReturn="allControl"></PublicHeader>
    </div>
    <!--<div class="videobox" id="videoBox">-->
      <!--&lt;!&ndash;视频播放区&ndash;&gt;-->
      <!--<div id="iframeId">-->
        <!--&lt;!&ndash;<iframe :src="this.videoId"></iframe>&ndash;&gt;-->
      <!--</div>-->
      <!--<div id="baoli">-->
        <!--<div id='paly'></div>-->
      <!--</div>-->
    <!--</div>-->

    <div class="videobox" id="ccshipin"></div>
    <!-- <ul class="jumpChapter">
      <li v-if="prevShow" @click="prevClick">上一节</li>
      <li v-if="nextShow" @click="nextClick">下一节</li>
    </ul> -->
    <ul class="chapterNav">
        <li @click="navClick(index)" :class="navShow== index ? 'action':''" v-for="(navItem,index) in navList" :key="index">{{navItem}}</li>
    </ul>
    <div class="chapterBox">
      <div v-if="navShow==0" class="chapter-directory">
        <directory :userName='userName' @currentVid='currentVid' :palyarType='palyarType' :directoryArr='directoryArr' :videoList='videoList' :videoNum='videoNum' :loginStatus='loginStatus' :buyStatus='buyStatus' :courseId='courseId' :courseTitel='courseTitel' :expired='expired' :player='true' :vid='vdUser' />
      </div>
      <div v-if="navShow == 1">
        <guessLike :catalogId='catalogId' />
      </div>
    </div>
    <!-- cc回放 -->
    <!-- <div style="margin-top:1.0rem" id="playbackPlayer"></div> -->
    
    <!--保利录播-->

    <!--&lt;!&ndash;cc直播&ndash;&gt;-->
    <!--<div  v-show="cczhibo" style="position: fixed; top:1rem;left: 0; width: 100%">-->
      <!--<iframe border="0" :src="cczb" width="100%" :height="hhe" ></iframe>-->
    <!--</div>-->
    <!--&lt;!&ndash;微吼&ndash;&gt;-->
    <!--<div v-show="vhall" style="position: fixed; top:1rem;left: 0; width: 100%">-->
      <!--<iframe border="0" :src="vhallplay" width="100%" :height="hhe"  ></iframe>-->
    <!--</div>-->
    <div style="height: 2.2rem"></div>
    <div class="videobtn">
      爱启航APP可离线缓存观看，效果更佳
      <span><router-link :to="{ path: '/vip/down'}">立即下载</router-link></span>
    </div>
  </div>
</template>

<script>
  import PublicHeader from '@/components/public/header'
  import { Toast, Picker } from "mint-ui";
  import popup from '@/components/public/popup'
  import directory from '@/components/course/directory'
  import guessLike from '@/components/video/guessLike'
  export default {
    components:{
      PublicHeader,
      popup,
      directory,
      guessLike
    },
    name: 'index',
    data () {
      return {
        htitleText:'',
        htitleUrl:'/course/courseconter?id='+this.$route.query.courseId,
        videoId:'',
        cclubo:false,
        baoli:false,
        cczhibo:false,
        vhall:false,
        cczb:'',
        vhallplay:'',
        courseId:'',
        vdName:'',
        vdUser:'',
        playType:'',
        //章节
        items:[],
        entitiesState:[],
        childState:[],
        allState:[],
        listLen:0,
        zjShow: true,
        setState:'',
        hhe:'',
        vd:'',
        zjvideo:false,
        navList:['课程目录','课程推荐'],
        // cms
        navShow: 0,
        directoryArr: [],
        videoList: [],
        videoNum: '',
        loginStatus: '',
        buyStatus: '',
        courseId: '',
        courseTitel: '',
        expired: '0',
        catalogId: '',
        videoKeys: '',
        userName: '',
        currentVideoVidIndex: 0,
        prevShow: true,
        nextShow: true
      }
    },
    watch:{

    },
    methods:{
      allControl(){//返回上一页
        this.$router.go(-1)
      },
      // 导航切换
      navClick(num){
        this.navShow = num
      },
     on_cc_player_init( vid, objectID ){var config = {};

      config.fullscreen_enable = 1; //启用自定义全屏

      config.fullscreen_function = "customFullScreen"; //设置自定义全屏函数的名称

      config.on_player_pause = "onPlayPaused"; //设置当暂停播放时的回调函数的名称
      config.control_enable = 0

      var player = this.getSWF( objectID );

      // player.setConfig( config );

    },
      getSWF( swfID ) {

        if (window.document[ swfID ]) {

          return window.document[ swfID ];

        } else if (navigator.appName.indexOf("Microsoft") == -1) {

          if (document.embeds && document.embeds[ swfID ]) {

            return document.embeds[ swfID ];

          }

        } else {

          return document.getElementById( swfID );

        }

      },
      //获取登陆状态
      headerImg:function () {
        this.axios.get('/api/party/user/v2/user/img', {
        })
          .then(response => {
            this.loginStatus = response.data.status;
            if(response.data.status == '888'){
              this.$router.push({path: '/login'})
            }else {
              this.userName = response.data.data.username;
              this.userId = response.data.data.userId;
              this.videoBoxa();
              this.classBuy()
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      //判断是否购买此课程
      classBuy(){
        this.axios.post('/es/productonuser/f/_search', {
            "query": {
              "bool": {
                "must": [
                  {
                    "term": {
                      "f_userId": this.userId
                    }
                  }
                ]
              }
            },
            "from": 0,
            "size": 50,
            "sort": [
              {
                "f_openTime": {
                  "order": "desc"
                }
              }
            ]
          }
        )
          .then(response => {
            let classAll = response.data.hits.hits, type = true, checkBox = [];
            for (let i = 0; i < classAll.length; i++) {
              if (this.courseId == classAll[i]._source.f_productId) {
                this.courseDetail()
                type = false
              }
            }
            if (type) {
              this.$router.push({path: '/viedoClass'})
            }else{
              this.buyStatus = "2";
            }
          })
          .catch(err => {
            console.log(err)
          })
      },
      handleTit(i){//点击父级
        let state=this.entitiesState;
        this.$set(state,i,!state[i]);
        for(let a in this.entitiesState){
          if(a!=i){
            this.$set(state,a,false);
          }
        }
      },
      add(m){
        return m<10?'0'+m:m
      },
      //获取视频资料
      videoBoxa(){
        this.courseId = this.$route.query.courseId;
        this.vdName = this.$route.query.vdName;
        this.vdUser = this.$route.query.vdUser.replace(/(^\s*)|(\s*$)/g, "");
        this.playType =this.$route.query.playType;
        this.palyarType(this.playType,this.vdUser, this.vdName)
        // this.chapter()
      },
      //cc录播视频
      player(id){
        $("#ccshipin").html('');
        this.videoId = 'ddd';
        this.zjShow = true;
        this.zjvideo = false;
        $("#ccshipin").html("<script src=\"https://p.bokecc.com/player?vid="+id.replace(/(^\s*)|(\s*$)/g, "")+"&siteid=096E928BC2A97B87&autoStart=false&width=100%&height=230&playerid=7ED41A33655BEB0E&playertype=1\" type=\"text/javascript\"><\/script>");
      },
      //保利录播
      baoliplayer(id){
        $("#ccshipin").html('<iframe src="http://mobile.iqihang.com/baoli?'+id.replace(/(^\s*)|(\s*$)/g, "")+'" width="100%" id="iframeId" height="210"></iframe>');
        this.zjShow = true;
        this.zjvideo = true;
        this.videoId = 'http://mobile.iqihang.com/baoli?'+id.replace(/(^\s*)|(\s*$)/g, "");
      },
      //cc直播
      cczbplayer(id){
        let eight = document.documentElement.clientHeight - 100;
        $("#ccshipin").html('<iframe src="https://view.csslcloud.net/api/view/index?roomid='+id.replace(/(^\s*)|(\s*$)/g, "")+'&userid=5BBD2F25E0E3EF7D" width="100%" id="iframeId" height="'+eight+'"></iframe>');
        this.zjShow = false;
        this.videoId = "https://view.csslcloud.net/api/view/index?roomid="+id.replace(/(^\s*)|(\s*$)/g, "")+"&userid=5BBD2F25E0E3EF7D";
      },
      //微吼直播
      vhplayer(id){
        let eight = document.documentElement.clientHeight - 100;
        $("#ccshipin").html('<iframe src="http://e.vhall.com/webinar/inituser/'+ id.replace(/(^\s*)|(\s*$)/g, "") +'" width="100%" id="iframeId" height="'+eight+'"></iframe>');
        this.zjShow = false;
//        this.videoId = 'http://e.vhall.com/webinar/inituser/'+ id;
//        let iframeId = document.getElementById('iframeId');
//        iframeId.height =  document.documentElement.clientHeight - 100
//        let iframeId = document.getElementById('iframeId');
//        iframeId.innerHTML = '';
//        var iframe = document.createElement('iframe');
//        iframe.src= id;
//        iframe.style='width:100%;'
//        iframe.height =  document.documentElement.clientHeight - 100
//        iframeId.appendChild(iframe);
      },
      // cc录播
  //     ccRecorded(id){
  //       $.DW.config({
  //         userId: '5BBD2F25E0E3EF7D',
  //         roomId: id,
  //         recordId: '7F82392E8C7261ED',
  //         viewername: '',
  //         viewertoken: '',
  //  });
      // },
      palyarType(type,id,name){
        if(type == '1'){
          this.htitleText = name;
          this.player(id)
        }else if(type == '2'){
          this.htitleText = name;
          this.baoliplayer(id)
        }else if(type == '3'){
          this.htitleText = name;
          this.cczbplayer(id)
        } else if(type == '4'){
          if(id.indexOf('/') > -1){
            id = id.substring(id.lastIndexOf("/")).split("/")[1];
          }
          this.htitleText = name;
          this.vhplayer(id)
        }
      },
      currentVid(id){
        this.videoKeys.map( (item,index) => {
          if(id == item.substr(1)){
            this.currentVideoVidIndex = index;
          }
        })
      },
      //上一节
      prevClick(){
        if(this.currentVideoVidIndex == 0){
          this.prevShow=false
          return
        }else{
          this.prevShow=true
          this.nextShow = true
        }
        this.currentVideoVidIndex--;
        this.saveCurrentJson()
      },
      nextClick(){
        if(this.currentVideoVidIndex == this.videoKeys.length-1){
          this.nextShow=false
          return
        }else{
          this.nextShow = true
          this.prevShow=true
        }
        this.currentVideoVidIndex++;
        this.saveCurrentJson()
      },
      // 保存视频的id和标题
      saveCurrentJson(){
        let playType = this.videoKeys[this.currentVideoVidIndex].substr(0,1),title=this.vdName;
        this.vdUser = this.videoKeys[this.currentVideoVidIndex].substr(1)
        if(playType != '1'){
          Toast({
            message: "此课程视频格式不对",
            position: "middle",
            duration: 2000
          });
          return;
        }
        if(playType == '1'){
          this.videoList.first.map( item => {
            item.value.hits.hits.length > 0 && item.value.hits.hits.map( firstItem => {
              if(firstItem._source.cms_content_type_content == this.vdUser){
                title = firstItem._source.cms_content_type_title
              }
            })
          })
          this.videoList.second.map( item => {
            item.value.hits.hits.length > 0 && item.value.hits.hits.map( firstItem => {
              if(firstItem._source.cms_content_type_content == this.vdUser){
                title = firstItem._source.cms_content_type_title
              }
            })
          })
          this.videoList.three.map( item => {
            item.value.hits.hits.length > 0 && item.value.hits.hits.map( firstItem => {
              if(firstItem._source.cms_content_type_content == this.vdUser){
                title = firstItem._source.cms_content_type_title
              }
            })
          })
          this.videoList.four.map( item => {
            item.value.hits.hits.length > 0 && item.value.hits.hits.map( firstItem => {
              if(firstItem._source.cms_content_type_content == this.vdUser){
                title = firstItem._source.cms_content_type_title
              }
            })
          })
          this.palyarType(playType,this.videoKeys[this.currentVideoVidIndex].substr(1),title)
        }
      },
      //下载电子讲义
      //讲义下载
      // down(url){
      //   window.location.href=url;
      // },
      //获取课程详情JSON
      courseDetail(){
        this.axios.get(`http://oss2.iqihang.com/json/course_details/${this.$route.query.courseId}.json?v=` + new Date().getTime())
        .then( response =>{
          this.catalogId = response.data.courseDetailData.hits.hits[0]._source.type_product_catalogId
          let directory = response.data.categoryData.hits.hits, directoryArr = { first:[],second:[],three:[],four:[] },videoList={ first:[],second:[],three:[],four:[]};
          directory.forEach(item => {
            item._source.type_catalog_pid === '-1' && directoryArr.first.push(item)
          })
          directoryArr.first.length > 0 && directoryArr.first.forEach( item => {
            let _id = item._source.type_catalog_id;
            directory.map( (first)=>{
              first._source.type_catalog_pid == _id && directoryArr.second.push(first)
            })
          })
          directoryArr.second.length > 0 && directoryArr.second.map((item) => {
            let _id = item._source.type_catalog_id;
            directory.map( (second)=>{
              second._source.type_catalog_pid == _id && directoryArr.three.push(second)
            })
          })
          directoryArr.three.length > 0 && directoryArr.three.map((item) => {
            let _id = item._source.type_catalog_id;
            directory.map( (three)=>{
              three._source.type_catalog_pid == _id && directoryArr.four.push(three)
            })
          })
          let keysArr = Object.keys(response.data),videoNum = {};
          for (const iterator of directoryArr.first) {
            keysArr.indexOf(iterator._source.type_catalog_id) > -1 && videoList.first.push({id:iterator._source.type_catalog_id, value:response.data[iterator._source.type_catalog_id]})
          }
          for (const iterator of directoryArr.second) {
            keysArr.indexOf(iterator._source.type_catalog_id) > -1 && videoList.second.push({id:iterator._source.type_catalog_id, value:response.data[iterator._source.type_catalog_id]})
          }
          for (const iterator of directoryArr.three) {
            keysArr.indexOf(iterator._source.type_catalog_id) > -1 && videoList.three.push({id:iterator._source.type_catalog_id, value:response.data[iterator._source.type_catalog_id]})
          }
          for (const iterator of directoryArr.four) {
            keysArr.indexOf(iterator._source.type_catalog_id) > -1 && videoList.four.push({id:iterator._source.type_catalog_id, value:response.data[iterator._source.type_catalog_id]})
          }
          // 保存视频数
          for (var iterator of directoryArr.second) {
            if(keysArr.indexOf(iterator._source.type_catalog_id) > -1) {
              videoNum[iterator._source.type_catalog_id] = response.data[iterator._source.type_catalog_id].hits.hits.length
            }
            for (var iterator1 of directoryArr.three) {
              if(iterator._source.type_catalog_id == iterator1._source.type_catalog_pid){
                videoNum[iterator._source.type_catalog_id] = videoNum[iterator._source.type_catalog_id] + response.data[iterator1._source.type_catalog_id].hits.hits.length
                for (var iterator2 of directoryArr.four) {
                  if(keysArr.indexOf(iterator2._source.type_catalog_id) > -1){
                    videoNum[iterator._source.type_catalog_id] = videoNum[iterator._source.type_catalog_id] + response.data[iterator2._source.type_catalog_id].hits.hits.length
                  }
                }
              }
            }
          }
          this.directoryArr = directoryArr
          // 判断视频里面是否有直播
          videoList.first.map(item => {
            item.value.hits.hits.map(video => {
              if (video._source.cms_content_type_userRealName == "0") {
                directoryArr.first.map(itemDir => {
                  if (itemDir._id == item.id) {
                    itemDir._live = "true";
                  }
                });
              }
            });
            videoList.second.map(itemThree => {
              itemThree.value.hits.hits.map(video => {
                if (video._source.cms_content_type_userRealName == "0") {
                  directoryArr.second.map(itemDir => {
                    if (itemThree.id === itemDir._id) {
                      directoryArr.second.map(itemDir1 => {
                        if (itemDir1._id == itemDir._source.type_catalog_pid) {
                          itemDir1._live = "true";
                        }
                      });
                    }
                  });
                }
              });
              videoList.three.map(itemFour => {
                itemFour.value.hits.hits.map(video => {
                  if (video._source.cms_content_type_userRealName == "0") {
                    directoryArr.three.map(itemDir => {
                      if (itemFour.id === itemDir._id) {
                        directoryArr.second.map(itemDir1 => {
                          if (
                            itemDir._source.type_catalog_pid === itemDir1._id
                          ) {
                            directoryArr.first.map(itemDir2 => {
                              if (
                                itemDir2._id ==
                                itemDir1._source.type_catalog_pid
                              ) {
                                itemDir2._live = "true";
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
                videoList.four.map(itemFour => {
                  itemFour.value.hits.hits.map(video => {
                    if (video._source.cms_content_type_userRealName == "0") {
                      directoryArr.four.map(itemDir => {
                        if (itemFour.id === itemDir._id) {
                          directoryArr.three.map(itemDir1 => {
                            if (itemDir._source.type_catalog_pid === itemDir1._id) {
                              directoryArr.second.map(itemDir2 => {
                                if (itemDir2._id ==itemDir1._source.type_catalog_pid) {
                                  directoryArr.first.map(itemFirst => {
                                    if (itemFirst._id == itemDir2._source.type_catalog_pid ) {
                                      itemFirst._live = "true";
                                    }
                                  });
                                }
                              });
                            }
                          });
                        }
                      });
                    }
                  });
                });
              });
            });
          });
          this.videoList = videoList
          this.videoNum = videoNum

         // 保存视频vid
        let videoKeys={},secondKey={},vidKeys=[];
        directoryArr.first.map( item => {
          videoKeys[item._source.type_catalog_id]=[];
          response.data[item._source.type_catalog_id].hits.hits.map( firstKey => {
            if(firstKey._source.cms_content_type_datatype == 'subVideo' && firstKey._source.cms_content_type_userRealName == '1'){
              videoKeys[item._source.type_catalog_id].push(firstKey._source.cms_content_type_userPhone + firstKey._source.cms_content_type_content)
            }
          })
          directoryArr.second.map( secondItem => {
            secondKey[secondItem._source.type_catalog_id]=secondItem._source.type_catalog_pid
            if(secondItem._source.type_catalog_pid == item._source.type_catalog_id){
              response.data[secondItem._source.type_catalog_id].hits.hits.map( firstKey => {
                if(firstKey._source.cms_content_type_datatype == 'subVideo' && firstKey._source.cms_content_type_userRealName == '1'){
                  videoKeys[item._source.type_catalog_id].push(firstKey._source.cms_content_type_userPhone + firstKey._source.cms_content_type_content)
                }
              })
            }
          })
        })
        directoryArr.second.map( secondItem => {
            directoryArr.three.map( threeItem => {
              if(threeItem._source.type_catalog_pid == secondItem._source.type_catalog_id){
                response.data[threeItem._source.type_catalog_id].hits.hits.map( firstKey => {
                  if(firstKey._source.cms_content_type_datatype == 'subVideo' && firstKey._source.cms_content_type_userRealName == '1'){
                    videoKeys[secondItem._source.type_catalog_pid].push(firstKey._source.cms_content_type_userPhone + firstKey._source.cms_content_type_content)
                  }
                })
              }
            })
        })
          directoryArr.three.map( threeItem => {
            directoryArr.four.map( fourItem => {
              if(fourItem._source.type_catalog_pid == threeItem._source.type_catalog_id){
                response.data[fourItem._source.type_catalog_id].hits.hits.map( firstKey => {
                  if(firstKey._source.cms_content_type_datatype == 'subVideo' && firstKey._source.cms_content_type_userRealName == '1'){
                    for (let key in secondKey) {
                      if(key == threeItem._source.type_catalog_pid){
                        videoKeys[secondKey[key]].push(firstKey._source.cms_content_type_userPhone + firstKey._source.cms_content_type_content)
                      }
                    }
                  }
                })
              }
            })
          })
          for (const key in videoKeys) {
            if (videoKeys.hasOwnProperty(key)) {
              const element = videoKeys[key];
              element.map( item => {
                vidKeys.push(item)
              })
            }
          }
          this.videoKeys = vidKeys;
          vidKeys.map( (item,index) => {
            if(this.vdUser == item.substr(1)){
              this.currentVideoVidIndex = index;
            }
          })
          if(this.currentVideoVidIndex==vidKeys.length-1){
            this.nextShow = false
          }else if(this.currentVideoVidIndex == 0){
            this.prevShow = false
          }
        })
        .catch( err => {
          console.log(err)
        })
      },
      //时间转换
      dataTime(time){
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var houer = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var times = year + '-' + this.add(month) + '-' + this.add(day) + ' ' + this.add(houer) + ':' + this.add(minutes) + ':' + this.add(seconds);
        return times
      },
      phoneType(){
        var u = navigator.userAgent, app = navigator.appVersion;
        var browser =  {//移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
          iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
        language: (navigator.browserLanguage || navigator.language).toLowerCase();
        var ua = navigator.userAgent.toLowerCase();
        if (browser.ios || browser.iPhone || browser.iPad) {
          this.setState = {
            site: 'https://itunes.apple.com/cn/app/ai-qi-hang/id1172161344',
          };
        }else if (browser.android) {
          if (ua.match(/MicroMessenger/i) == "micromessenger") {
            this.setState = {
              site: 'http://app.qq.com/#id=detail&appid=101375266',
            };
          } else {
            this.setState = {
              site: 'http://www.iqihang.com/app/iqihang.apk',
            };
          }
        } else {
          this.setState = {
            site: "http://mobile.iqihang.com/login",
          };
        }
      },
      appdown(){
        window.location.href = this.setState.site;
      },
    },
    mounted(){
      this.headerImg();
      this.phoneType();
      this.on_cc_player_init()
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.videobox{
    width: 100%;
    position: fixed;
    top: 1rem;
    left: 0;
    z-index: 111;
  }
  .videobtn{
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    position: fixed;
    z-index: 999;
    bottom: 0;
    background: #f2f2f2;
    text-align: center;
  }
  .videobtn span{
    background:#3acbae ;
    color: #fff;
    line-height: 1rem;
    width: 2rem;
    text-align: center;
    float: right;
  }
  .chapterBox{
    position: fixed;
    top: 6.6rem;
    bottom: 0.8rem;
    background: rgba(255, 255, 255, 1);
    overflow-y:scroll;
    overflow-x:hidden;
    -webkit-overflow-scrolling: touch;
    width: 100%;
  }
  .jumpChapter{
    position: absolute;
    top: 1.2rem;
    right: 0.2rem;
    z-index: 1000;
    display: flex;
    text-align: center;
  }
  .jumpChapter li{
    width: 1.0rem;
    line-height: 0.4rem;
    background:rgba(58,204,174,1);
    color: white;
    font-size: 0.24rem;
    border-radius: 0.05rem;
    opacity: 0.8;
  }
  .jumpChapter li:first-of-type{
    margin-right:0.2rem; 
  }
  .chapterNav{
    position: fixed;
    top: 5.6rem;
    width: 100%;
    display: flex;
    line-height: 0.98rem;
    text-align: center;
    background:rgba(250,250,250,1);
    box-shadow:0px 1px 3px 0px rgba(0,0,0,0.1);
    z-index: 100;
  }
  .chapterNav > li{
    flex: 1 0 auto;
    font-weight:400;
    color:rgba(105,105,105,1);
    font-size: 0.32rem;
  }
  .chapterNav > li.action{
    font-weight:500;
    color:rgba(58,204,174,1);
    border-bottom:1px solid rgba(58,204,174,1);
  }
  .ceshiDiv{
    position: fixed;
    top: 2.0rem;
    left: 0;
    z-index: 1000000000000;
  }
</style>
