<template>
    <div class="classBox">
        <!-- 服务包 -->
        <div class="serviceBox">
            <span @click="servicesBtn(servicesObj.id)" :class="servicesSel ? 'action servicesBtn' : 'servicesBtn'"></span>
            <img class="servicesBtnimg" @click="servicesBtn(servicesObj.id)" src="./courseImg/popular_sel.png" alt="" v-show="servicesSel">
            <h3 v-html="servicesObj.showTitle"></h3>
            <i>{{'￥' + servicesObj.price}}<span>.00</span><img @click="layerShow = !layerShow" src="./courseImg/info.png" alt=""></i>
        </div>
        <!-- <ul class="serviceBox couponsBox">
            <li>
                <img src="./courseImg/coupons.png" alt="">
                <span>优惠券</span>
            </li>
            <li @click="couponClick">
                <span>点击领取</span>
                <img src="./courseImg/arrow_right.png" alt="">
            </li>
        </ul> -->
        <div v-show="layerShow || couponsShow" :style="{backgroundImage:`url(${homeImg}`}" class="laterService"></div>
        <div v-show="layerShow" class="serviceImg"><img :src="servicesObj.showImg" alt=""> <img @click="layerShow = false" class="servicesClose" src="./courseImg/addServicesClose.png" alt=""></div>
        <div v-show="couponsShow" class="couponsLayer">
            <div class="header"><h3>优惠券</h3><span><img @click="couponsShow = !couponsShow" src="./courseImg/icon_close.png" alt=""></span></div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            servicesObj:'',
            layerShow: false,
            isShowimg:false,
            servicesSel: true,
            couponsShow: false
        }
    },
    props: ["servicesBox","homeImg","loginStatus"],
    watch: {
        servicesBox(){
            this.show()
        }
    },
    methods:{
        show(){
            this.servicesBox.map((item,index)=>{
                if(index == 0) { 
                    this.servicesObj = {
                        'id': item._source.type_coursematch_courseId,
                        'showTitle': item._source.type_coursematch_showname,
                        'title': item._source.type_coursematch_courseName,
                        'showImg': item._source.type_coursematch_addedValueImg,
                        'price': item._source.type_coursematch_lowPrice,
                        'highPrice': item._source.type_coursematch_highPrice
                    }
                }
            })
        },
        servicesBtn(id){
          this.servicesSel = !this.servicesSel;
          this.$emit('servicesStatus', {status:this.servicesSel,id:id})
        },
        couponClick(){

            // this.couponsShow=!this.couponsShow
        },
    },
    mounted() {
        
    },
}
</script>
<style scoped>
.classBox{
    margin-top: 0.2rem;
    background: white;
    padding: 0 0.2rem;
    border-bottom: 0.01rem solid #e7e7e7;
}
.classBox ul{
    border: none;
}
.serviceBox{
    line-height: 0.88rem;
  position: relative;
}
.serviceBox .servicesBtn{
    width: 0.36rem;
    height: 0.36rem;
    border: 0.01rem solid #e7e7e7;
    border-radius: 50%;
    float: left;
    margin-top: 0.26rem;
    margin-right: 0.2rem;
}
.serviceBox img.servicesBtnimg{
  position: absolute;
  left:0;
  top:.22rem;
  width: 0.36rem;
  height: 0.36rem;
}
.serviceBox .action{
    border: none;
}
.serviceBox h3{
    display: inline-block;
    color: #696969;
    font-size: 0.26rem;
    font-weight: normal;
}
.serviceBox i{
    float: right;
    color: #FF5B09;
    font-size: 0.28rem;
    font-weight: bold;
}
.serviceBox i span{
    font-size: 0.24rem;
    color: #FF5B09;
}
.serviceBox i img{
    width: 0.26rem;
    height: 0.26rem;
    float: right;
    margin-top: 0.31rem;
    margin-left: 0.1rem;
}
.laterService{
    background-size: 100% 100%;
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -o-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
    background-repeat: no-repeat;
    position: fixed;
    left: -0.2rem;
    top: -0.4rem;
    right: -0.2rem;
    bottom: -0.4rem;
    z-index: 101;
    opacity: 1;
}
.serviceImg{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 76%;
    opacity: 1;
    z-index: 101;
}
.serviceImg img{
    width: 100%
}
.serviceImg .servicesClose{
    display: inline-block;
    width: 0.5rem !important;
    height: 0.5rem; 
    position: absolute;
    top: 0.15rem;
    right: 0.1rem;
}
.couponsBox{
    overflow: hidden;
}
.couponsBox li:first-of-type{
    float: left;
}
.couponsBox li:first-of-type span{
    color: #696969;
    font-size: 0.28rem;
    font-weight:500;
}
.couponsBox li:last-of-type{
    float: right;
}
.couponsBox li:first-of-type img{
    width: 0.3rem;
    height: 0.26rem;
    float: left;
    margin-top: 0.29rem;
    margin-right: 0.2rem;
}
.couponsBox li:last-of-type span{
    font-size: 0.22rem;
    color: #CACACA;
    margin-right: 0.2rem;
}
.couponsBox li:last-of-type img{
    float: right;
    width: 0.18rem;
    height: 0.31rem;
    margin-top: 0.28rem;
}
.couponsLayer{
    position: fixed;
    left: 0;
    bottom: 0;
    height: 8.8rem;
    width: 100%;
    background: white;
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
    padding: 0 0.2rem;
    z-index: 100;
}
.couponsLayer .header h3{
    text-align: center;
}
.couponsLayer .header{
    line-height: 0.88rem;
    overflow: hidden;
}
.couponsLayer .header span{
    width: 0.4rem;
    height: 0.4rem;
    position: absolute;
    right: 0.2rem;
    top: 0.24rem;
}
.couponsLayer .header span img{
    width: 100%;
    float: left;
}
</style>

