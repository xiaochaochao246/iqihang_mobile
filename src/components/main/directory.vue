<template>
    <div>
        <Public-header :htitle='title' @childReturn="returnBack" />
        <div class="chapter">
            <classItem :videoSum='videoSum' :userName='userName' :catalogId='catalogId' :courseId='courseId' :chapterArr='chapterArr' />
        </div>
    </div>
</template>

<script>
import PublicHeader from "@/components/public/header";
import classItem from "./classItem.vue";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      courseId: "",
      title: "课程目录",
      catalogId: '',
      userName: '',
      loginStatus: 0, // 0 => 无登录 1 => 已登录
      chapterArr: [], // 保存课程目录
      searchChapterArr: [], // 保存课程目录id，为获取视频和讲义使用
      videoSum:[],  // 保存视频数
    };
  },
  components: {
    PublicHeader,
    classItem
  },
  methods: {
    // 返回上一页
    returnBack() {
      this.$router.go(-1);
    },
    // 判断登录状态
    userIdBox() {
      this.axios
        .get("/api/party/user/v2/user/session", {})
        .then(response => {
          if (response.data.status == "888") {
            this.$router.push({ path: "/login", query: { id: 'main' } });
          } else {
            this.loginStatus = 1;
            this.userName = response.data.data.username;
            // 获取课程章节目录
            this.getChapter(this.courseId);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 根据课程Id，获取课程目录
    getChapter(id) {
      this.loginStatus == 1 &&
        this.axios
          .post("/es/index_catalog/type_catalog/_search", {
            query: {
              bool: {
                must: [
                  {
                    term: {
                      type_catalog_datatype: "chapter"
                    }
                  },
                  {
                    term: {
                      type_catalog_businessId: "1001"
                    }
                  },
                  {
                    term: {
                      type_catalog_invite: id
                    }
                  }
                ]
              }
            },
            from: 0,
            size: 100,
            sort: [{ type_catalog_sort: { order: "asc" } }]
          })
          .then(response => {
            response.status == 200 &&
              this.secondChapter(response.data.hits.hits);
          })
          .catch(error => {
            console.log(error);
            Toast({
              message: "网络出现故障，稍后重试",
              position: "middle",
              duration: 2000
            });
          });
    },
    // 二次处理返回的章节目录
    secondChapter(data) {
      let response = data; // 存储请求下来的数据
      // 处理一级目录
      response.map((item, index) => {
        this.searchChapterArr.push({
          term: { cms_content_type_classifyId: item._source.type_catalog_id }
        });
        item._source.type_catalog_pid == "-1" &&
          this.pushChapter(this.chapterArr, item);
      });
      // 处理二级目录
      response.map(item => {
        item._source.type_catalog_pid != "-1" &&
          this.chapterArr.map(itemChild => {
            itemChild.chapterId == item._source.type_catalog_pid &&
              this.pushChapter(itemChild.childern, item);
          });
      });
      // 处理三级目录
      this.chapterArr.map(itemChild => {
        itemChild.childern.length > 0 &&
          itemChild.childern.map(itemLastChild => {
            response.map(item => {
              item._source.type_catalog_pid != "-1" &&
                itemLastChild.chapterId == item._source.type_catalog_pid &&
                this.pushChapter(itemLastChild.childern, item);
            });
          });
      });
      // 处理四级目录
      this.chapterArr.map(itemChild => {
        itemChild.childern.length > 0 &&
          itemChild.childern.map(itemLastChild => {
            itemLastChild.childern.length > 0 &&
              itemLastChild.childern.map(lastChild => {
                response.map(item => {
                  item._source.type_catalog_pid != "-1" &&
                    lastChild.chapterId == item._source.type_catalog_pid &&
                    this.pushChapter(lastChild.childern, item);
                });
              });
          });
      });
      this.getVideoOrNote();
    },
    // 把数据填充到对应的目录里面
    pushChapter(element, item) {
      element.push({
        chapterId: item._source.type_catalog_id,
        chapterName: item._source.type_catalog_name,
        chapterPid: item._source.type_catalog_pid,
        childern: [],
        videoList: [],
        live: false
      });
    },
    // 通过课程目录ID 获取视频和讲义
    getVideoOrNote() {
      this.axios
        .post("/es/cms_content_index/cms_content_type/_search", {
          query: {
            bool: {
              must: [
                {
                  bool: {
                    should: this.searchChapterArr
                  }
                }
              ]
            }
          },
          from: 0,
          size: 10000,
          sort: { cms_content_type_sortView: { order: "asc" } }
        })
        .then(response => {
          response.status == 200 &&
            this.dealVideoOrNotes(response.data.hits.hits);
        })
        .catch(error => {
          console.log(error);
          Toast({
            message: "网络出现故障，稍后重试1",
            position: "middle",
            duration: 2000
          });
        });
    },
    // 处理视频和讲义数据
    dealVideoOrNotes(data) {
      data.map(videoItem => {
        this.chapterArr.map(firstItem => {
          videoItem._source.cms_content_type_classifyId ==
            firstItem.chapterId &&
            this.pushVideoOrNotes(firstItem.videoList, videoItem,firstItem);
          firstItem.childern.length > 0 &&
            firstItem.childern.map(secondItem => {
              videoItem._source.cms_content_type_classifyId ==
                secondItem.chapterId &&
                this.pushVideoOrNotes(secondItem.videoList, videoItem,firstItem);
              secondItem.childern.length > 0 &&
                secondItem.childern.map(threeItem => {
                  videoItem._source.cms_content_type_classifyId ==
                    threeItem.chapterId &&
                    this.pushVideoOrNotes(threeItem.videoList, videoItem,firstItem);
                  threeItem.childern.length > 0 &&
                    threeItem.childern.map(fourItem => {
                      videoItem._source.cms_content_type_classifyId ==
                        fourItem.chapterId &&
                        this.pushVideoOrNotes(fourItem.videoList, videoItem,firstItem);
                    });
                });
            });
        });
      });
      this.sumVideo()
    },
    // 把视频和讲义添加到对应的章节目录里
    pushVideoOrNotes(element, data,firstItem) {
      if (data._source.cms_content_type_datatype == "EVersion") {
        // 表示讲义
        element.unshift({
          videoName: data._source.cms_content_type_title,
          videoId: data._source.cms_content_type_content,
          videoType: "1", // 0 直播  1  讲义  2  录播
          videoCompany: "",
          startTime: "", // 直播开始时间
          endTime: "", // 直播结束时间
          liveStatus: "" // 直播状态   0 未开始  1 直播中  2  已结束
        });
        return;
      } else if (data._source.cms_content_type_userRealName == "0") {
        let status =  new Date().getTime() < data._source.cms_content_type_thumbMediaUrl ? '0' : new Date().getTime() > data._source.cms_content_type_thumbLocalUrl ? '2' : '1'
        // 表示直播
        firstItem.live = true;
        element.push({
          videoName: data._source.cms_content_type_title,
          videoId: data._source.cms_content_type_content,
          videoType: "0",
          videoCompany: data._source.cms_content_type_userPhone, // 3:CC(直播),4:微吼(直播)
          startTime: this.dataTime(data._source.cms_content_type_thumbMediaUrl), // 直播开始时间
          endTime: this.dataTime(data._source.cms_content_type_thumbLocalUrl), // 直播结束时间
          liveStatus: status // 直播状态   0 未开始  1 直播中  2  已结束
        });
        return;
      } else if (data._source.cms_content_type_userRealName == "1") {
        // 表示录播
        element.push({
          videoName: data._source.cms_content_type_title,
          videoId: data._source.cms_content_type_content,
          videoType: "2",
          videoCompany: data._source.cms_content_type_userPhone, // 1:CC(录播),2:保利(录播),
          startTime: "", // 直播开始时间
          endTime: "", // 直播结束时间
          liveStatus: "" // 直播状态   0 未开始  1 直播中  2  已结束
        });
        return;
      }

    },
    // 计算视频数
    sumVideo(){
      this.chapterArr.map( item => {
        item.childern.length > 0 && item.childern.map( secondItem => {
          this.videoSum[secondItem.chapterId] = 0
          secondItem.videoList.length > 0 && secondItem.videoList.map( video => {
            if(video.videoType == '2'){this.videoSum[secondItem.chapterId] += 1}
          })
          secondItem.childern.length > 0 && secondItem.childern.map( secondItems => {
              secondItems.videoList.length > 0 && secondItems.videoList.map( videos => {
                if(videos.videoType == '2'){this.videoSum[secondItem.chapterId] += 1}
              })
              secondItems.childern.length > 0 && secondItems.childern.map( secondItemss => {
                secondItemss.videoList.length > 0 && secondItemss.videoList.map( videoss => {
                  if(videoss.videoType == '2'){this.videoSum[secondItem.chapterId] += 1}
                })
              })
            })
        })
      })
    },
    //时间转换
    dataTime(time) {
      var date = new Date(Number(time));
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var houer = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      var dataTime = `${year}-${month}-${day} ${houer}:${minutes}:${seconds}`;
      return dataTime;
    }
  },
  mounted() {
    this.userIdBox();
    this.catalogId = this.$route.query.catalogId
    this.courseId = this.$route.query.id;
  }
};
</script>
<style scoped>
.chapter {
  margin-top: 1rem;
}
</style>



