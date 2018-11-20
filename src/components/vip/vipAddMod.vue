<template>
  <div class="vip-index">
    <div class="address-addContent">
      <public-header :htitle="htitleTextTwo"  @childReturn="allControl" ></public-header>
      <div class="address-div">
        <div class="address-add">
          <mt-field label="收货人" v-model="ruleForm.name"></mt-field>
          <mt-field label="联系电话" v-model="ruleForm.phone"></mt-field>
          <div class="address-add-city">
            <label>所在地区</label>
            <div @click="citytext">
              <p v-show="addstate"><span>{{ AddressProvince }}</span><span>{{ AddressCity }}</span><span>{{ Addresscounty }}</span></p>
              <p v-show="!addstate"><span>{{ myAddressProvince }}</span><span>{{ myAddressCity }}</span><span>{{ myAddresscounty }}</span></p>
            </div>
          </div>
          <mt-field label="详细地址" v-model="ruleForm.street"></mt-field>
        </div>
        <button @click="submitForm()">保存/修改</button>
      </div>

    </div>
    <div class="addres-bm" v-show="cityState" @click="proclose">
      <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
    </div>
  </div>
</template>
<script>
import PublicHeader from '@/components/public/header'
import PublicCity from '@/components/public/city'
import { Toast } from 'mint-ui'
import myaddress from './../../../static/address3.json'
export default {
  name: 'loginIndex',
  components:{
    PublicHeader,
    PublicCity
  },
  data () {
    return {
      htitleTextTwo:'收货地址',
      cityState:false,//城市状态
      ruleForm: {
        name: '',
        region: '',
        phone:'',
        phone:'',
        street:''
      },
      addressId:'',
      addstate:true,
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(myaddress),  //省份数组
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot4'
        },
        {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      myAddressProvince:'省',
      myAddressCity:'市',
      myAddresscounty:'区/县',
      AddressProvince:'省',
      AddressCity:'市',
      Addresscounty:'区/县',
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    addedit(){//修改地址
      this.ruleForm.name = this.$route.query.name;
      this.ruleForm.street = this.$route.query.delivery;
      this.ruleForm.phone = this.$route.query.tel;
      let strs=this.$route.query.address.split(" "); //全
      this.AddressProvince = strs[0];
      this.AddressCity = strs[1];
      this.Addresscounty = strs[2];
      this.addressId = this.$route.query.id;
    },
    citytext(Province,City,county){//控制城市选择器
      this.cityState = true;
      this.addstate = false;
    },
    onMyAddressChange(picker, values) {
      if(myaddress[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
        picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
        let strs=this.$route.query.address.split(" "); //全
        this.myAddressProvince = values[0];
        this.myAddressCity = values[1];
        this.myAddresscounty = values[2];
      }
    },
    proclose(){
      this.cityState = false;
    },
    submitForm() {//地址提交
      if(this.ruleForm.name == ""){
        Toast({
          message: "请输入收货人名称",
          position: 'middle',
          duration: 1000
        });
      }else if(this.ruleForm.street == ""){
        Toast({
          message: "请输入详细地址",
          position: 'middle',
          duration: 1000
        });
      }else if(this.ruleForm.phone == ""){
        Toast({
          message: "请输入收货人手机号",
          position: 'middle',
          duration: 1000
        });
      }else if(!(/^1(3|4|5|7|8|9)\d{9}$/.test(this.ruleForm.phone))){
        Toast({
          message: "请输入正确的手机号",
          position: 'middle',
          duration: 1000
        });
      }else {
        if(this.addstate !== true){
          this.AddressProvince = this.myAddressProvince;
          this.AddressCity = this.myAddressCity;
          this.Addresscounty = this.myAddresscounty;
        }
        this.ruleForm.region = this.AddressProvince +' ' + this. AddressCity +' ' +  this.Addresscounty;
        this.axios.post('/api/party/sysAddress/v1/employee/add', {
          addressId:this.addressId,
          addressName: this.ruleForm.name,//收货人
          address: this.ruleForm.region,//地址
          delivery: this.ruleForm.street,//详细地址
          phone: this.ruleForm.phone,//手机号
          userId: this.$route.query.userid,
          common: this.$route.query.common
        })
          .then(response => {
            if (response.data.status == "0") {
              Toast({
                message: response.data.msg,
                position: 'middle',
                duration: 1000
              });
              setTimeout(() => {
                this.$router.push({path: this.$route.query.url})
              },2000)
            } else {
              Toast({
                message: response.data.msg,
                position: 'middle',
                duration: 1000
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  mounted(){
    this.addedit();
    this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0
      // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
      //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
    });
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vip-index{
  height:100%;
  background: #f4f4f4;
}
.address-div{
  padding-top: 1rem;
}
.vip-news-list{
  width:100%;
  background: #fff;
  padding: 0.33rem 0.21rem 0 0.21rem;
  margin-top: 0.2rem;
}
.address-div{
  padding-top: 1rem;
}
  .vip-news-list-tp{
    height:0.32rem;
    overflow: hidden;
  }
  .vip-news-list-header{
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 0.21rem;
  }
.vip-news-list-tp p{
  color: #757575;
  font-size: 0.28rem;
}
  .vip-news-list-tp p:nth-child(1){
    float: left;
  }
.vip-news-list-tp p:nth-child(2){
  float: right;
}
  .vip-news-list-bm{
    padding: 0.15rem 0 0 0;
    font-size: 0.25rem;
    line-height: 0.36rem;
    color: #666666;
  }
  .vip-news-list-foter{
    overflow: hidden;
  }
  .vip-news-list-foter-lf{
    align-items:center;
    display:-webkit-flex;
    height:0.88rem;
    float: left;
  }
.vip-news-list-foter-lf span{
  width:0.46rem;
  height:0.46rem;
  float: left;
  margin: 0 0.3rem 0 0;
  background: url("./../login/loginImg/login-radioFlase.png");
  background-size: 0.46rem 0.46rem;
}
.vip-news-list-foter-lf .active{
  background: url("./../login/loginImg/login-radio.png");
  background-size: 0.46rem 0.46rem;
}
  .vip-news-list-foter-rt{
    align-items:center;
    display:-webkit-flex;
    height:0.88rem;
    float: right;
  }
  .vip-news-list-foter-rt button{
    width:1.15rem;
    height:0.5rem;
    border-radius: 4px;
    border:1px solid #535353;
    color: #535353;
    background: none;
    margin-left: 0.25rem;
  }
.vip-news-list-foter-rt button:nth-child(1){
  border:1px solid #ff9c00;
  color: #ff9c00;
}
  .address-addContent button{
    border-radius: 8px;
    width:7.1rem;
    height:1.04rem;
    background: #3acbae;
    color: #fff;
    font-size: 0.30rem;
    margin: 0.4rem 0.2rem 0 0.2rem;
  }
  .mint-cell{
    border-bottom:1px solid #e6e6e6;
  }
  .address-addContent .mint-cell:nth-last-child(1){
    border:none;
  }
.address-add-city{
  min-height: 48px;
  background: #fff;
  border-bottom:1px solid #e6e6e6;
  align-items:center;
  display:-webkit-flex;
  padding: 0 10px;
  width:100%;
}
  .address-add-city label{
    font-size: 0.3rem;
  }
  .address-add-city div{
    height:1rem;
    width: auto;
    line-height: 1rem;
    width: 70%;
  }
.address-add-city span{
  color: #666;
  margin: 0 0 0 0.5rem;
}
.addres-bm{
  position: fixed;
  top:0;
  left: 0;
  right:0;
  bottom:0;
  background: rgba(0,0,0,.5);
}
  .picker{
    left: 0;
    right:0;
    position: absolute;
    bottom:0;
    background: #fff;
  }

</style>
