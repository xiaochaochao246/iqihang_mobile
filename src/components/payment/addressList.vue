<template>
  <div>
    <div class="vip-news-list" v-for="(item,index) in userAddList" :key="index">
      <div class="vip-news-list-header">
        <div class="vip-news-list-tp">
          <p v-text="item.addressName"></p>
          <p v-text="item.phone"></p>
        </div>
        <div class="vip-news-list-bm" v-text="item.address + item.delivery"></div>
      </div>
      <div class="vip-news-list-foter">
        <div @click="chooseClick(item.addressId)" class="vip-news-list-foter-lf" >
          <span :class="item.addressId == chooseId ? 'action' : ''"></span>
          选择此地址
        </div>
        <div class="vip-news-list-foter-rt">
          <!--<router-link :to="{ path: 'payAddMod', query:{url:'address',name:item.vipName,address:item.address,tel:item.phone,delivery:item.delivery,id:item.id,userid:userId}}"> <button>编辑</button></router-link>-->
          <!--<button @click="addressremove(item.id)">删除</button>-->
          <button @click="editClick(item)">编辑</button>
          <button @click="deleteClick(index,item.addressId)">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast,MessageBox  } from "mint-ui";
    export default {
      data(){
          return{
            chooseId: ''
          }
      },
      props:["userAddList","userId"],
      watch:{
        userAddList(){
          this.show()
        }
      },
      methods:{
        show(){},
        // 选择地址
        chooseClick(id){
          this.chooseId = id;
          MessageBox({
            title: '提示框',
            message: '确定选择此收货地址吗？',
            closeOnClickModal:false,
            showCancelButton: true
          }).then(action => {
            if(action == 'confirm'){  //选择确认
              // if(){}
              let courseId = this.$route.query.id.split(',')
              this.$router.push({
                path: '/course/courseconter',
                query:{order: this.$route.query.order,id:courseId[0]}
              })
            }
          })
        },
        // 编辑地址
        editClick(item){
          this.$router.push({
            path: '/vip/addmod',
            query: {url:'address',common:item.common,name:item.addressName,address:item.address,tel:item.phone,delivery:item.delivery,id:item.addressId,userid:this.userId}
          })
        },
        // 删除地址
        deleteClick(index,id){
          this.axios.post('/api/party/sysAddress/v1/employee/del',[id])
          .then( res => {
            console.log(res)
            if(res.status == '200' && res.data.status == '0'){
              this.userAddList.splice(index,1)
              Toast({
                message: res.data.msg,
                position: "middle",
                duration: 2000
              });
            }else if(res.status == '200' && res.data.status == '-1'){
              Toast({
                message: res.data.msg,
                position: "middle",
                duration: 2000
              });
            }
          })
          .catch( err => {
            Toast({
              message: '网络异常，删除失败',
              position: "middle",
              duration: 2000
            });
          })
        }
      },
      mounted() {
        
      },
    }
</script>

<style scoped>
  .vip-news-list {
    width: 100%;
    background-color: #fafafa;
    padding: 0.33rem 0.29rem 0 0.29rem;
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
    color: #4A4A4A;
    font-size: 0.33rem;
  }
  .vip-news-list-tp p:nth-child(1) {
    float: left;
  }
  .vip-news-list-tp p:nth-child(2) {
    float: right;
  }
  .vip-news-list-bm {
    padding: 0.3rem 0 0 0;
    font-size: 0.27rem;
    letter-spacing: .01rem;
    line-height: 0.38rem;
    color: #696969;
  }
  .vip-news-list-foter {
    overflow: hidden;
  }
  .vip-news-list-foter-lf {
    align-items: center;
    display: -webkit-flex;
    height: 0.88rem;
    float: left;
    color: #696969;
  }
  input.chooseAdd{
    margin-right:.2rem;
  }
  .vip-news-list-foter-lf span {
    width: 0.46rem;
    height: 0.46rem;
    float: left;
    margin: 0 0.1rem 0 0;
    border: 0.01rem solid #e7e7e7;
    border-radius: 50%;
    background-size: 0.46rem 0.46rem;
  }
  .vip-news-list-foter-lf .action{
    background-image: url('./paymentImg/pay-rad.png');
    border: none;
  }
  .vip-news-list-foter-rt {
    align-items: center;
    display: -webkit-flex;
    height: 0.88rem;
    float: right;
  }
  .vip-news-list-foter-rt button {
    width: 1.1rem;
    height: 0.45rem;
    border-radius: 20px;
    font-size: .25rem;
    border: 1px solid #3accae;
    color: #3accae;
    background: none;
    margin-left: 0.25rem;
  }
</style>
