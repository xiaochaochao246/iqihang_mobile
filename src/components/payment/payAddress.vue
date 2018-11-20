<template>
  <div class="vip-index">
    <div v-show="addState">
      <header-right :htitle="htitleText" :rightTitle="rightwords" @adddata="addEvent" @childReturn="allControl"></header-right>
      <div class="padding-top-70">
        <div class="vip-news-list" v-for="(item,index) in vipUserUrl" :key="index">
          <div class="vip-news-list-header">
            <div class="vip-news-list-tp">
              <p>{{item.vipName}}</p>
              <p>{{ item.phone }}</p>
            </div>
            <div class="vip-news-list-bm">
              {{ item.address }}{{item.delivery}}
            </div>
          </div>
          <div class="vip-news-list-foter">
            <div class="vip-news-list-foter-lf" >
              <span  @click="defaultAddress(item.vipName,item.phone,item.address,item.delivery)"></span>
              选择地址
            </div>
            <div class="vip-news-list-foter-rt">
              <router-link :to="{ path: 'payAddMod', query:{url:'address',name:item.vipName,address:item.address,tel:item.phone,delivery:item.delivery,id:item.id,userid:userId}}"> <button>编辑</button></router-link>
              <button @click="addressremove(item.id)">删除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="!addState" class="address-addContent">
      <mt-header title="收货地址">
        <div slot="left" @click="control">
          <mt-button icon="back"></mt-button>
        </div>
      </mt-header>
      <div class="padding-top-70 address-padding">
        <div class="address-add">
          <mt-field label="收货人" v-model="ruleForm.name"></mt-field>
          <mt-field label="联系电话" v-model="ruleForm.phone"></mt-field>
          <div class="address-add-city">
            <label>所在地区</label>
            <div @click="citytext">
              <span>{{myAddressProvince}}</span>
              <span>{{myAddressCity}}</span>
              <span>{{myAddresscounty}}</span>
            </div>
          </div>
          <mt-field label="详细地址" v-model="ruleForm.street"></mt-field>
        </div>
        <button class="address-addButton" @click="submitForm()">保存/修改</button>
      </div>
    </div>
    <div class="addres-bm" v-show="cityState" @click="proclose">
      <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
    </div>
  </div>
</template>
<script>
import headerRight from "@/components/public/headerRight";
import PublicHeader from "@/components/public/header";
import PublicCity from "@/components/public/city";
import { Toast, MessageBox } from "mint-ui";
import myaddress from "./../../../static/address3.json";
export default {
  name: "loginIndex",
  components: {
    headerRight,
    PublicHeader,
    PublicCity
  },
  data() {
    return {
      htitleText: "地址管理",
      rightwords: "添加",
      vipUserUrl: [],
      addState: true,
      cityState: false, //城市状态
      Province: "",
      City: "",
      county: "",
      orderid: "", //订单id
      ruleForm: {
        name: "",
        region: "",
        phone: "",
        street: ""
      },
      ruleForm2: {
        name: "",
        region: "",
        phone: "",
        street: ""
      },
      addressId: "",
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(myaddress), //省份数组
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: [],
          className: "slot5",
          textAlign: "center"
        }
      ],
      myAddressProvince: "省",
      myAddressCity: "市",
      myAddresscounty: "区/县"
    };
  },
  methods: {
    control() {
      this.addState = true;
    },
    allControl() {
      this.orderid = this.$route.query.order;
      this.id = this.$route.query.id;
      let that = this,
        _route = this.$router;
        MessageBox.confirm("请选择收货地址").then(
          res => {},
          req => {
            // if (localStorage.getItem("shop") == 0) {
            //     localStorage.removeItem("shop");
            //     this.$router.push({ path: "/main" });
            //     return;
            //   }
            //   if (this.$route.query.order && this.$route.query.id) {
            //     this.$router.push({
            //       path: "/course/courseconter",
            //       query: {
            //         order: this.$route.query.order,
            //         id: this.$route.query.id
            //       }
            //     });
            //   } else if (this.$route.query.classType === undefined) {
            //     this.$router.push({ path: "/vip/order" });
            //   }

              if (localStorage.getItem("shop") == 0 || that.id.length > 1) {
                localStorage.removeItem("shop");
                _route.push({ path: "/main" });
                return;
              }
              if (that.orderid && that.id) {
                _route.push({
                  path: "/course/courseconter",
                  query: {
                    order: that.orderid,
                    id: that.id
                  }
                });
              } else if (this.$route.query.classType === undefined) {
                _route.push({ path: "/vip/order" });
              } else {
                _route.push({ path: "/main" }); //我的课程
              }
          }
        );
    },
    addEvent(val) {
      this.addState = val;
      this.ruleForm.name = "";
      this.ruleForm.street = "";
      this.ruleForm.phone = "";
      this.myAddressProvince = "北京市";
      this.myAddressCity = "市辖区";
      this.myAddresscounty = "东城区";
    },
    vipUserId() {
      //获取用户地址
      this.axios
        .get("/api/party/user/v2/user/session", {})
        .then(response => {
          this.userId = response.data.data.userId;
          this.axios
            .post("/api/party/sysAddress/v1/employee/queryAll", {
              userId: this.userId
            })
            .then(response => {
              let userId = response.data.data;
              let box = [];
              for (var i = 0; i < userId.length; i++) {
                box.push({
                  vipuserId: userId[i].addressId,
                  vipName: userId[i].addressName,
                  address: userId[i].address,
                  delivery: userId[i].delivery,
                  phone: userId[i].phone,
                  id: userId[i].addressId,
                  addressCommon: userId[i].common //判断是否是默认地址
                });
              }
              this.vipUserUrl = box;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    defaultAddress(name, tel, address, delivery) {
      //修改地址
      this.judgeJogin();
      this.orderid = this.$route.query.order;
      this.id = this.$route.query.id;
      let that = this,  _route = this.$router;

      this.axios
        .post("/api/trade/order/v1/buy/edit/" + this.orderid, {
          orderCode: this.orderid, //订单号
          consignee: name, //收货人姓名
          address: address + " " + delivery, //收货人地址
          contactTel: tel //收货人电话
        })
        .then(response => {
          if (response.status == "200") {
            Toast({
              message: "地址修改成功 !",
              position: "middle",
              duration: 2000
            });
            setTimeout(() => {
              console.log(that.$route.query.id)
              if (localStorage.getItem("shop") == 0 || (that.$route.query.id && that.$route.query.id.length > 1)) {
                localStorage.removeItem("shop");
                _route.push({ path: "/main" });
                return;
              }
              if (that.$route.query.order && that.$route.query.id) {
                _route.push({
                  path: "/course/courseconter",
                  query: {
                    order: that.$route.query.orderid,
                    id: that.$route.query.id
                  }
                });
              } else if (this.$route.query.classType === undefined) {
                _route.push({ path: "/vip/order" });
              } else {
                _route.push({ path: "/main" }); //我的课程
              }
            }, 1000);
          } else {
            Toast({
              message: response.data.msg,
              position: "middle"
            });
          }
        });
    },
    addressremove(id) {
      //删除地址
      this.judgeJogin();
      this.axios
        .post("/api/party/sysAddress/v1/employee/del", [id])
        .then(response => {
          if (response.data.status == "0") {
            Toast({
              message: response.data.msg,
              position: "middle",
              duration: 2000
            });
            this.vipUserId();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    citytext(Province, City, county) {
      //控制城市选择器
      this.cityState = true;
    },
    onMyAddressChange(picker, values) {
      if (myaddress[values[0]]) {
        //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
        picker.setSlotValues(1, Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2, myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
        this.myAddressProvince = values[0];
        this.myAddressCity = values[1];
        this.myAddresscounty = values[2];
      }
    },
    proclose() {
      this.cityState = false;
    },
    submitForm() {
      //地址提交
      this.judgeJogin();
      if (this.ruleForm.name == "") {
        Toast({
          message: "请输入收货人名称",
          position: "middle",
          duration: 1000
        });
      } else if (this.ruleForm.street == "") {
        Toast({
          message: "请输入详细地址",
          position: "middle",
          duration: 1000
        });
      } else if (this.ruleForm.phone == "") {
        Toast({
          message: "请输入收货人手机号",
          position: "middle",
          duration: 1000
        });
      } else if (!/^1(3|4|5|7|8|9)\d{9}$/.test(this.ruleForm.phone)) {
        Toast({
          message: "请输入正确的手机号",
          position: "middle",
          duration: 1000
        });
      } else {
        this.ruleForm.region =
          this.myAddressProvince +
          " " +
          this.myAddressCity +
          " " +
          this.myAddresscounty;
        this.axios
          .post("/api/party/sysAddress/v1/employee/add", {
            addressName: this.ruleForm.name, //收货人
            address: this.ruleForm.region, //地址
            delivery: this.ruleForm.street, //详细地址
            phone: this.ruleForm.phone, //手机号
            userId: this.userId
          })
          .then(response => {
            if (response.data.status == "0") {
              Toast({
                message: response.data.msg,
                position: "middle",
                duration: 1000
              });
              setTimeout(() => {
                this.addState = true;
                this.vipUserId();
              }, 2000);
            } else {
              Toast({
                message: response.data.msg,
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
    judgeJogin() {
      //判断用户有没有登录
      this.axios
        .get(`/api/party/user/v2/user/session`, {})
        .then(response => {
          if (response.data.status == "888") {
            this.$router.push({ path: "/login", query: { id: "main" } });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.vipUserId();
    this.$nextTick(() => {
      //vue里面全部加载好了再执行的函数  （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0;
      // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
      //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
    });
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vip-index {
  height: 100%;
  background: #f4f4f4;
}
.vip-news-list {
  width: 100%;
  background: #fff;
  padding: 0.33rem 0.21rem 0 0.21rem;
  margin-top: 0.2rem;
}
.address-padding {
  margin-top: 0.2rem;
}
.vip-news-list-tp {
  height: 0.32rem;
  overflow: hidden;
}
.vip-news-list-header {
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 0.21rem;
}
.vip-news-list-tp p {
  color: #757575;
  font-size: 0.28rem;
}
.vip-news-list-tp p:nth-child(1) {
  float: left;
}
.vip-news-list-tp p:nth-child(2) {
  float: right;
}
.vip-news-list-bm {
  padding: 0.15rem 0 0 0;
  font-size: 0.25rem;
  line-height: 0.36rem;
  color: #666666;
}
.vip-news-list-foter {
  overflow: hidden;
}
.vip-news-list-foter-lf {
  align-items: center;
  display: -webkit-flex;
  height: 0.88rem;
  float: left;
}
.vip-news-list-foter-lf span {
  width: 0.46rem;
  height: 0.46rem;
  float: left;
  margin: 0 0.3rem 0 0;
  background: url("./../login/loginImg/login-radioFlase.png");
  background-size: 0.46rem 0.46rem;
}
.vip-news-list-foter-lf .active {
  background: url("./../login/loginImg/login-radio.png");
  background-size: 0.46rem 0.46rem;
}
.vip-news-list-foter-rt {
  align-items: center;
  display: -webkit-flex;
  height: 0.88rem;
  float: right;
}
.vip-news-list-foter-rt button {
  width: 1.15rem;
  height: 0.5rem;
  border-radius: 4px;
  border: 1px solid #535353;
  color: #535353;
  background: none;
  margin-left: 0.25rem;
}
.vip-news-list-foter-rt button:nth-child(1) {
  border: 1px solid #ff9c00;
  color: #ff9c00;
}
.address-addContent .address-addButton {
  border-radius: 8px;
  width: 7.1rem;
  height: 1.04rem;
  background: #3acbae;
  color: #fff;
  font-size: 0.3rem;
  margin: 0.4rem 0.2rem 0 0.2rem;
}
.mint-cell {
  border-bottom: 1px solid #e6e6e6;
}
.address-addContent .mint-cell:nth-last-child(1) {
  border: none;
}
.address-add-city {
  min-height: 48px;
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  align-items: center;
  display: -webkit-flex;
  padding: 0 10px;
  width: 100%;
}
.address-add-city label {
  font-size: 0.3rem;
}
.address-add-city span {
  color: #666;
  margin: 0 0 0 0.5rem;
}
.addres-bm {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.picker {
  left: 0;
  right: 0;
  position: absolute;
  bottom: 0;
  background: #fff;
}
.mint-header {
  height: 1rem;
  background: #3acbae;
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
