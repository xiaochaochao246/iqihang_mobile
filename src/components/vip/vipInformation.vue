<template>
  <div class="vip-index">
    <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
    <div class="vip-inf">
      <div class="vip-inf-list vip-inf-pic vip-inf-mg">
        <input type="file" id="upload" name="fileupload" accept="image" @change="upload" >
        <div class="vip-inf-pic-dw">
          <span>头像</span>
          <label for="upload"></label>
          <div class="vip-inf-list-rt">
            <div class="vip-inf-list-bg">
              <div class="vip-inf-tx" :style="'backgroundImage:url('+headerImage+')'"></div>
              <!--<img :src="imgSrc" class="vip-inf-tx">-->
            </div>
          </div>
        </div>

      </div>
      <div class="vip-inf-list">
        <span>会员名</span>
        <div class="vip-inf-list-rt">
          {{phone}}
        </div>
      </div>
      <router-link :to="{ path: '/vip/name',query:{name:this.name}}">
        <div class="vip-inf-list">
          <span>昵称</span>
          <div class="vip-inf-list-rt">
            <img src="./vipImg/vip-right.png" class="vip-inf-list-pic">
          </div>
          <i>{{name}}</i>
        </div>
      </router-link>
      <!--<router-link :to="{ path: '/vip/phone'}">
        <div class="vip-inf-list">
          <span>修改手机号</span>
          <div class="vip-inf-list-rt">
            <img src="./vipImg/vip-right.png" class="vip-inf-list-pic">
          </div>
          <i>{{name}}</i>
        </div>
      </router-link>-->
      <router-link :to="{ path: '/vip/account'}">
        <div class="vip-inf-list">
          <span>第三方账号绑定</span>
          <div class="vip-inf-list-rt">
            <img src="./vipImg/vip-right.png" class="vip-inf-list-pic">
          </div>
        </div>
      </router-link>
      <div class="vip-inf-list">
        <span>账户余额</span>
        <div class="vip-inf-list-rt">
          ￥{{money}}
        </div>
      </div>
      <router-link :to="{ path: '/vip/study'}">
        <div class="vip-inf-list">
          <span>学习卡充值</span>
          <div class="vip-inf-list-rt">
            <img src="./vipImg/vip-right.png" class="vip-inf-list-pic">
          </div>
        </div>
      </router-link>
      <router-link :to="{ path: '/vip/feedback'}">
        <div class="vip-inf-list">
          <span>用户反馈</span>
          <div class="vip-inf-list-rt">
            <img src="./vipImg/vip-right.png" class="vip-inf-list-pic">
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
import PublicHeader from '@/components/public/header'
import { Toast } from 'mint-ui'
import Exif from 'exif-js'
export default {
  name: 'loginIndex',
  components:{
    PublicHeader,
  },
  data () {
    return {
      htitleText:'账户信息',
      imgSrc:require('./vipImg/vip-pic.png'),
      phone:'',
      money:'',
      name:'',
      imgUrl:'',
      userId:'',
      headerImage: require('./vipImg/vip-pic.png'),
      picValue: ''
    }
  },
  methods:{
    allControl(){//返回上一页
      this.$router.go(-1)
    },
    headerImg:function () {
      this.axios.get('/api/party/user/v2/user/img', {})
        .then(response => {
          if (response.data.status == '888') {
            this.$router.push({name: 'loginIndex', query: {url: 'vipIindex'}});
          } else {
            this.userId = response.data.data.userId;
            this.phone = response.data.data.phone;//手机号
            this.money = response.data.data.money;//余额
            this.name = response.data.data.realName;//昵称
            if(response.data.data.headImg){
              this.headerImage = response.data.data.headImg
            }else{
              this.headerImage = this.headerImage
            }
          }
        })
    },
    upload(e) {//上传头像
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.picValue = files[0];
      this.imgPreview(this.picValue);
    },
    imgPreview (file) {
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function(){
        Orientation = Exif.getTag(this, 'Orientation');
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader();
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file);
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result;
          let img = new Image();
          img.src = result;
          //判断图片是否大于100K,是就直接上传，反之压缩图片
          if (this.result.length <= (100 * 1024)) {
            self.headerImage = this.result;
            //后台
            let param = new FormData(); //创建form对象
            param.append('fileupload',file,file.name);//通过append向form对象添加数据
            let config = {
              headers:{'Content-Type':'multipart/form-data'}
            };  //添加请求头
            self.axios.post('/api/oss/v1/oss/uploadImg',param,config)
              .then(response=>{
                self.headerImage = response.data.url
                self.postImg()
              })
          }else {
            img.onload = function () {
              let data = self.compress(img,Orientation);
              self.headerImage = data;
              file = self.getBlobBydataURI(data,'image/png');
              //Blob文件无文件名,需要自定义
              file.name = "file_"+Date.parse(new Date())+".png";
              //后台
              let param = new FormData(); //创建form对象
              param.append('fileupload',file,file.name);//通过append向form对象添加数据
              let config = {
                headers:{'Content-Type':'multipart/form-data'}
              };  //添加请求头
              self.axios.post('/api/oss/v1/oss/uploadImg',param,config)
                .then(response=>{
                  self.headerImage = response.data.url;
                  self.postImg()
                })
            }
          }
        }
      }
    },
    //转base64图片为Blob基本文件格式
    getBlobBydataURI(dataURI,type){
      let binary = atob(dataURI.split(',')[1]);
      let array = [];
      for(let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type:type });
    },
    postImg() {
      //这里写接口
      this.axios.post('/api/party/user/v2/user/img', {
        headImg : this.headerImage
      })
        .then(response => {
          Toast({
            message: '修改成功',
            position: 'middle',
            duration: 1000
          });
        })
        .catch(err => {
          console.log(err)
        })
    },
    rotateImg (img, direction,canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0;
      const max_step = 3;
      if (img == null)return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      let step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //旋转角度以弧度值为参数
      let degree = step * 90 * Math.PI / 180;
      let ctx = canvas.getContext('2d');
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
    compress(img,Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext('2d');
      //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      if(Orientation != "" && Orientation != 1){
        switch(Orientation){
          case 6://需要顺时针（向左）90度旋转
            this.rotateImg(img,'left',canvas);
            break;
          case 8://需要逆时针（向右）90度旋转
            this.rotateImg(img,'right',canvas);
            break;
          case 3://需要180度旋转
            this.rotateImg(img,'right',canvas);//转两次
            this.rotateImg(img,'right',canvas);
            break;
        }
      }
      //进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1);
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    },
  },
  mounted(){
    this.headerImg()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vip-index{
  height:100%;
  background: #f4f4f4;
}
.vip-inf{
  padding-top: 1rem;
}
.vip-inf-pic-dw{
  width:7rem;
}
#upload{
  height:100%;
  width:100%;
  opacity: 0;
  position: absolute;
}
.vip-inf-pic-dw span{
  line-height: 1.58rem;
}
.vip-inf-mg{
  position: relative;
  line-height: normal !important;
}
.vip-inf{margin-top: 0.2rem}
.vip-inf-list{
  height:1rem;
  width:100%;
  background: #fff;
  padding: 0 0.2rem 0 0.2rem;
  border-bottom: 1px solid #e6e6e6;
  overflow: hidden;
  line-height: 1rem;
}
.vip-inf-pic{
height:1.58rem;
  line-height: 1.58rem;
  position: relative;
}
  .vip-inf-list span{
    float: left;
    font-size: 0.28rem;
    color: #333;
  }
  .vip-inf-list-rt{
    float: right;
  }
  .vip-inf-list i{
    float: right;
    color: #cccccc;
    margin-right: 0.3rem;
  }
  .vip-inf-list-bg{
    width:1.1rem;
    height:1.1rem;
    background: #f4f4f4;
    border-radius: 50%;
    justify-content:center;
    align-items:center;
    display:-webkit-flex;
    margin-top: 0.24rem;
  }
  .vip-inf-tx{
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 50%;
  }
  .vip-inf-list-pic{
    float: right;
    width:0.2rem;
    height:0.3rem;
    margin-top: 0.35rem;
  }
.vip-inf-list-pic img{

}
.show {
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  border: 1px solid #d5d5d5;
}
.picture {

}
</style>
