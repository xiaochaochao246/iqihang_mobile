<template>
    <div class="courseActive">
      <div class="active_left">
        <div class="active_price">
          <i>￥</i>
          <span>{{killPrice}}</span>
          <i>{{floatPrice}}</i>
        </div>
        <div class="original_price">￥{{orginPrice}}</div>
      </div>
      <div class="active_right">
        剩余名额：<i>{{killRemain}}</i>人
      </div>
      <div class="circular_border"></div>
    </div>
</template>

<script>
    export default {
        name: "courseActive",
      data(){
          return{
            wholePrice:"",
            killPrice:"",
            floatPrice:"",
            killRemain:0,//剩余名额
            orginPrice:0,
            courseId:""
          }
      },
      props:["associated"],
      watch:{
        associated(){
          this.getCourseData()
        }
      },
      methods:{
        getCourseData(){
          this.courseId=this.associated[0].associatedId;
          this.axios.post("/es/index_time_limit/_search",{
            "query": {
              "bool": {
                "must": [{
                  "term": {
                    "type_time_limit_dataType": "cut"
                  }
                },
                  {
                    "term": {
                      "type_time_limit_courseId": this.courseId
                    }
                  }],
                "must_not": [],
                "should": []
              }
            },
            "sort": [],
            "aggs": {

            }
          }).then(res=>{
            // console.log(res.data.hits.hits);
            if(res.data.hits.hits.length!=0){
              var act= res.data.hits.hits[0]._source;
              this.wholePrice=act.type_time_limit_newCoursePrice;
              this.killRemain=act.type_time_limit_fakeSales;    //剩余名额
              // console.log(this.wholePrice.toFixed(2));
              this.killPrice=Math.floor(this.wholePrice);
              if(this.killPrice==this.wholePrice){
                this.floatPrice=".00"
              }else {
                this.floatPrice="."+this.wholePrice.toString().split('.')[1];
              }
              // this.floatPrice="."+this.wholePrice.toString().split('.')[1];
              // this.killPrice=Math.floor(this.wholePrice);
              this.orginPrice=act.type_time_limit_oldCoursePrice;
            }
          });
        }
      }
    }
</script>

<style scoped>
  .courseActive{
    position: relative;
    height:1.15rem;
    width: 96%;
    margin:0 auto;
    background-color: #ed1f4b;
    border-radius: 10px;
  }
  .active_left{
    float: left;
    padding:.15rem 0 0 .15rem;
  }
  .active_price span,.active_price i{
    color:#FFFD9B;
  }
  .active_price span{
    font-size: .5rem;
    font-weight: 600;
  }
  .active_price i{
    font-size: .22rem;
  }
  .original_price{
    margin-top: .1rem;
    color:#fff;
    font-size: .22rem;
    text-decoration: line-through;
  }
  .active_right{
    width: 50%;
    position: absolute;
    right:0;
    top:0;
    text-align: center;
    height: 1.15rem;
    line-height: 1.15rem;
    font-size: .22rem;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    letter-spacing: .02rem;
    background-color: #e20e3b;
    color:#fff;
  }
  .active_right i{
    color:#fff;
    letter-spacing: .02rem;
    font-weight: 600;
    margin-left:.1rem;
    margin-right:.1rem;
    font-size: .36rem;
  }
  .circular_border{
    position: absolute;
    top:0;
    right:50%;
    width: 0;
    height: 0;
    border-bottom: 1.15rem solid #e20e3b;
    border-left: 2rem solid transparent;
  }
</style>
