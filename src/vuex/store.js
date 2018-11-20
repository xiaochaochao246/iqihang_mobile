import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  userName:'',
  userCardId:'',
  userTel:'',
  userMailbox:'',
  userQq:'',
  teacherId:'',
  teacherName:'',
  vipId1:''
}

const mutations = {
  increment(state,obj){//方法  --------------支付页面网络协议
    state.userName = obj.name;
    state.userCardId = obj.card;
    state.userTel = obj.tel;
    state.userMailbox = obj.mailbox;
    state.userQq = obj.qq;
  },
  teacherevent(state,obj){
    state.teacherId = obj.teaid;
    state.teacherName = obj.teaname;
  }
}

const actions = {
  increment(context,name,card,tel,mailbox,qq){//存储方法
    context.commit("increment",name,card,tel,mailbox,qq)
  },
  teacherevent(context,teaid,teaname){//存储方法
    context.commit("teacherevent",teaid,teaname)
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
// 例子
// alert(this.$store.state.userName)
// console.log(this.$store.state.userName,this.$store.state.password)//取值
// this.$store.commit("increment",'LVEL','789')//赋值
// console.log(this.$store.state.userName,this.$store.state.password)
// alert(this.$store.state.userName)

