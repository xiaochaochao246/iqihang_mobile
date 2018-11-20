<template>
    <div>
        <ul class="videoBg">
            <li class="videoLine" v-if="guessList.length > 0" v-for="(videoItem,index) in guessList" :key="index">
                <router-link :to="{name:'courseconter', query:{id:videoItem._source.type_product_id}}">
                  <div class="videoBox">
                    <div class="videoImg">
                        <img :src="videoItem._source.type_product_mainPicture" alt="">
                    </div>
                    <div class="videoText">
                        <h3>{{videoItem._source.type_product_title}}</h3>
                        <div class="videoTextButtom">
                            <span><b class="currentPrice">{{videoItem._source.type_product_lowPrice != '0' ? '￥'+videoItem._source.type_product_lowPrice : '免费'}}</b><i class="pastPrice">{{'￥' + videoItem._source.type_product_highPrice}}</i></span>
                            <span class="salesNum"><img src="./videoImg/class-icon.png" alt="">{{videoItem._source.type_product_truesalse}}</span>
                        </div>
                    </div>
                </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      guessList: [],
      currentPrice: ""
    };
  },
  props: ["catalogId"],
  watch: {
    catalogId(val) {}
  },
  filters: {
    price(type, price) {
      console.log(type);
      if (price == "0") {
        return "免费";
      } else {
        return "￥" + price;
      }
    }
  },
  methods: {
    // 请求猜你喜欢数据
    getGuessDate(id) {
      this.axios
        .post("/es/index_product/type_product/_search", {
          query: {
            bool: {
              must: [
                {
                  term: {
                    type_product_catalogId: id
                  }
                }
              ],
              must_not: [
                {
                  term: {
                    type_product_ifreception: "0"
                  }
                }
              ]
            }
          },
          from: 0,
          size: 100,
          sort: [{ type_product_salesVolume: { order: "desc" } }],
          aggs: {}
        })
        .then(res => {
          if (res.status == "200" && res.data.hits.hits.length > 0) {
            this.guessList = res.data.hits.hits;
          } else if (res.status == "200" && res.data.hits.hits.length == 0) {
          } else {
            Toast({
              message: "网络异常",
              position: "middle",
              duration: 1000
            });
            return;
          }
        })
        .catch(error => {
          console.log(error);
          Toast({
            message: "网络异常",
            position: "middle",
            duration: 1000
          });
        });
    }
  },
  mounted() {
    this.getGuessDate(this.catalogId);
  },
  created() {}
};
</script>
<style scoped>
.videoBg {
  padding: 0.2rem;
}
.videoBg li:first-of-type {
  padding-top: 0;
}
.videoLine {
  border-bottom: 1px solid rgba(241, 242, 246, 1);
  padding: 0.2rem 0;
}
.videoBox {
  overflow: hidden;
}

.videoBox .videoImg {
  width: 2.4rem;
  height: 1.8rem;
  float: left;
}
.videoBox .videoText {
  margin-left: 2.6rem;
  height: 1.8rem;
  position: relative;
}
.videoBox .videoText h3 {
  font-size: 0.28rem;
  color: #4a4a4a;
  line-height: 0.4rem;
  font-weight: normal;
}
.videoBox .videoImg img {
  width: 100%;
  height: 100%;
}
.videoText .videoTextButtom {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}
.videoTextButtom .currentPrice {
  color: #ff5b09;
  font-weight: bold;
}
.videoTextButtom .pastPrice {
  margin-left: 0.1rem;
  color: #cacaca;
  font-size: 0.24rem;
  text-decoration-line: line-through;
}
.videoTextButtom .salesNum {
  float: right;
  color: #9b9b9b;
  font-size: 0.24rem;
}
.videoTextButtom .salesNum img {
  width: 0.2rem;
  height: 0.2rem;
}
</style>



