<template>
    <div>
        <div v-show="hotclassBox.length > 1" @click="popularShowClick" class="popularBox">
            <img src="./courseImg//default.jpg" alt="">
        </div>
        <div v-show="popularShow" :style="{backgroundImage:`url(${backgroundImage}`}" class="popularContent"></div>
        <div v-show="popularShow" class="contentBox">
            <ul class="listBox">
                <div class="header"><h3>热门搭配</h3><span><img @click.stop @click="popularShowClick" src="./courseImg/icon_close.png" alt=""></span></div>
                <li v-for="(item,index) in hotclassBox" :key="index">
                    <div :class="selectedId.indexOf(item.hotId) > -1 ? 'btn_left action' : 'btn_left'" @click="selectedClick(index,item.hotId)"></div>
                    <div class="content_right">
                        <div class="imgBox">
                            <img :src="item.hotImg" alt="">
                        </div>
                        <div class="textBox">
                            <h3>{{item.hotTitle}}</h3>
                            <div>
                                <i v-text="item.hotlowPrice == '0.00' ? '免费':'￥' + item.hotlowPrice"></i>
                                <span v-text="'￥'+item.hothighPrice"></span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="popularBottom">
                <div class="total">
                    <span>本组合包含 <i v-text="selectedId.length"></i> 门课</span>
                    <span>优惠：<i v-text="discountPrice"></i></span>
                    <span>总价：<i v-text="totalPrice"></i></span>
                </div>
                <ul>
                    <li @click="shoppingCart">加入购物车</li>
                    <li @click="nowBug">立即购买</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped>
.popularBox {
  height: 1.88rem;
  border-bottom: 0.01rem solid #e7e7e7;
  background: white;
  margin-top: 0.2rem;
  overflow: hidden;
}
.popularBox img {
  width: 100%;
  height: 100%;
}
.popularContent {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-size: 100% 100%;
  -webkit-filter: blur(8px);
  -moz-filter: blur(8px);
  -o-filter: blur(8px);
  -ms-filter: blur(8px);
  filter: blur(8px);
  z-index: 100;
}
.contentBox {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 101;
  background: white;
  width: 100%;
  height: 8.8rem;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  padding: 0 0.2rem;
  overflow: hidden;
}
.listBox {
  height: 6.7rem;
  overflow-y: scroll;
  width: 105%;
  -webkit-overflow-scrolling: touch;
}
.header{
  position: relative;
}
.header h3 {
  line-height: 0.98rem;
  font-weight: 500;
  color: #4a4a4a;
  font-size: 0.32rem;
  text-align: center;
  border-bottom: 0.01rem solid #e7e7e7;
}
.header span {
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  top: 0.29rem;
  right: 0.4rem;

}
.header span img {
  width: 100%;
}
.listBox li {
  border-bottom: 0.01rem solid #e7e7e7;
  display: flex;
  width: 95%;
  padding: 0.26rem 0;
}
.listBox .btn_left {
  width: 0.4rem;
  height: 0.4rem;
  border: 0.01rem solid #e7e7e7;
  border-radius: 0.2rem;
  margin-top: 0.49rem;
}
.listBox .action {
  background-image: url("./courseImg/popular_sel.png");
  background-size: 100% 100%;
  border: none;
}
.listBox .content_right {
  flex: 1;
  margin-left: 0.2rem;
  overflow: hidden;
}
.content_right .imgBox {
  width: 1.84rem;
  height: 1.38rem;
  overflow: hidden;
  float: left;
  border-radius: 0.1rem;
}
.imgBox img {
  width: 100%;
  height: 100%;
}
.content_right .textBox {
  margin-left: 2.04rem;
  position: relative;
  height: 100%;
}
.content_right .textBox h3 {
  color: #696969;
  font-size: 0.26rem;
  line-height: 0.36rem;
  font-weight: 500;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.content_right .textBox div {
  position: absolute;
  left: 0;
  bottom: 0;
}
.textBox div i {
  color: #ff5b09;
  font-size: 0.24rem;
  font-weight: 500;
}
.textBox div span {
  color: #cacaca;
  font-size: 0.22rem;
  margin-left: 0.2rem;
}
.popularBottom {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
}
.popularBottom .total {
  line-height: 0.88rem;
  background: white;
  color: #696969;
  font-size: 0.24rem;
  padding: 0 0.2rem;
  font-weight: 500;
  display: flex;
}
.popularBottom .total span {
    flex: 1 0 auto;
}
.popularBottom .total span i{
    color: #ff5b09;
}
.popularBottom ul {
  display: flex;
}
.popularBottom ul li {
  flex: 1 0 auto;
  color: white;
  line-height: 0.98rem;
  text-align: center;
  font-size: 0.28rem;
  font-weight: 500;
}
.popularBottom ul li:first-of-type {
  background: #3accae;
}
.popularBottom ul li:last-of-type {
  background: #ff5b09;
}
</style>
<script>
import { Toast, Picker } from "mint-ui";
export default {
  data() {
    return {
      selectedId: [],
      totalPrice: 0,
      discountPrice: 0,
      popularShow: false
    };
  },
  props: ["hotclassBox", "backgroundImage","lowPrice","addCar","loginStatus","userId"],
  watch: {
    hotclassBox() {
      this.show();
    }
  },
  methods: {
    show() {
        this.totalPrice = this.lowPrice
        this.selectedId.push(this.hotclassBox[0].hotId)
    },
    // 热门搭配显示隐藏
    popularShowClick(){
      this.popularShow = !this.popularShow
    },
    selectedClick(index, id) {
      if(index == 0) return;
      if (this.selectedId.length == 0) {
        this.selectedId.push(id);
      } else {
        if (this.selectedId.indexOf(id) > -1) {
          this.selectedId.splice(this.selectedId.indexOf(id), 1);
        } else {
          this.selectedId.push(id);
        }
      }
      this.hotPrice()
    },
    //热门搭配价格计算
    hotPrice() {
      let selectedCourseId = [];
      this.selectedId.length > 0 &&
        this.selectedId.map(item => {
          selectedCourseId.push({ courseId: item });
        });
      selectedCourseId.length > 0 && this.axios
        .post("/api/promotion/nologin/v1/pageView/calculatedPrice", selectedCourseId)
        .then(response => {
          if (response.data.status == "0") {
            this.totalPrice = parseFloat(response.data.data.totalPrice).toFixed(
              2
            );
            this.discountPrice = parseFloat(
              response.data.data.discountPrice
            ).toFixed(2);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //热门搭配立即购买
    nowBug() {
      let checkBox = "";
      this.selectedId.map( item =>{
          checkBox = item + "," + checkBox;
      })
      if (this.loginStatus == "888") {
        this.$router.push({
          path: "/login",
          query: { id: "/course/courseconter?id=" + this.$route.query.id }
        });
      } else {
        //判断重复购买
        this.axios
          .post("/es/productonuser/f/_search", {
            query: {
              bool: {
                must: [
                  {
                    term: {
                      f_userId: this.userId
                    }
                  }
                ]
              }
            },
            from: 0,
            size: 50,
            sort: [
              {
                f_openTime: {
                  order: "desc"
                }
              }
            ]
          })
          .then(response => {
            let classAll = response.data.hits.hits,
              type = true;
            for (let i = 0; i < classAll.length; i++) {
              if (this.$route.query.id == classAll[i]._source.f_productId) {
                type = false;
              }
            }
            if (type) {
              this.$router.push({
                path: "/payment",
                query: { paycid: checkBox }
              });
              this.hotbox = false;
            } else {
              Toast({
                message: "已购买" + this.courseTitel + "此课程",
                position: "middle",
                duration: 1000
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 添加购物车
    shoppingCart(){
        this.addCar()
    }
  },
  mounted() {
      this.hotPrice()
  }
};
</script>
