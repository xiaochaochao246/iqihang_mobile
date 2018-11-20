import Vue from 'vue'
import Router from 'vue-router'
//首页
import Index from '@/components/login/index'
import report from '@/components/404'
//登录
import loginIndex from '@/components/login/loginIndex'
import binding from '@/components/login/binding'
//注册
import register from '@/components/login/register'
//修改密码
import retrieve from '@/components/login/retrieve'
//个人中心
import vip from '@/components/vip/vip'
import vipIndex from '@/components/vip/vipIndex'
import vipNews from '@/components/vip/vipNews'
import vipAddress from '@/components/vip/vipAddress'
import vipAddMod from '@/components/vip/vipAddMod'
import vipDown from '@/components/vip/vipDown'
import vipOrder from '@/components/vip/vipOrder'
import vipCoupon from '@/components/vip/vipCoupon'
import vipCard from '@/components/vip/vipCard'
import vipAgreement from '@/components/vip/vipAgreement'
import AgreementSee from '@/components/vip/AgreementSee'
import vipShopping from '@/components/vip/vipShopping'
import vipCollection from '@/components/vip/vipCollection'
import vipInformation from '@/components/vip/vipInformation'
import vipName from '@/components/vip/vipName'
import vipStudy from '@/components/vip/vipStudy'
import vipPassword from '@/components/vip/vipPassword'
import vipOrdMod from '@/components/vip/vipOrdMod'
import paymentNot from '@/components/vip/paymentNot'
import vipDeliver from '@/components/vip/vipDeliver'
import vipNetwork from '@/components/vip/vipNetwork'
import vipFeedback from '@/components/vip/vipFeedback'
import vipAccount from '@/components/vip/vipAccount'
//支付页面
import payment from '@/components/payment/payment'
import paymentIndex from '@/components/payment/paymentIndex'
import paymentOrder from '@/components/payment/paymentOrder'
import paymentService from '@/components/payment/paymentService'
import paymentSuccess from '@/components/payment/paymentSuccess'
import payAddress from '@/components/payment/payAddress'
import payAddMod from '@/components/payment/payAddMod'
//课程
import courseIndex from '@/components/course/courseIndex'
import courseList from '@/components/course/courselist'
import courseconter from '@/components/course/courseconter'
import coursevideo from '@/components/course/coursevideo'
import courselive from '@/components/course/courselistzb'
//shou
import shou from '@/components/login/index'
import search from '@/components/login/search'
//公告
import notice from '@/components/login/notice'
//我的课程
import mainIndex from '@/components/main/mainIndex'
// 课程目录
import directory from '@/components/main/directory'
Vue.use(Router);
//视频
import recorded from '@/components/video/recorded'
import viedoClass from '@/components/video/viedoClass'
import baoli from '@/components/video/baoli'
import cc from '@/components/video/cc'

import qqq from '@/components/login/loginqqq'
import bbb from '@/components/login/bbb'
//活动
import activity from '@/components/activity/activity'
import activityregister from '@/components/activity/activityregister'
import vipact from '@/components/activity/vipAct'

import teacher from '@/components/teacher/teacher'

// 修改手机号
// import vipphone from '@/components/vip/vipphone'
Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',//主页
      name: 'index',
      component: Index,
      meta: {title: '爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'},
    },
    {
      path: '*',//404页面
      name: 'report',
      meta: {title: '出错了404'},
      component: report,
    },
    {
      path: '/qqq',//主页
      name: 'qqq',
      component: qqq,
      meta: {title: '爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'},
    },
    {
      path: '/bbb',//主页
      name: 'bbb',
      component: bbb,
      meta: {title: '爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'},
    },
    {
      path: '/login',//登录
      name: 'loginIndex',
      component: loginIndex,
      meta:{title:'登陆中心-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    },
    {
      path: '/binding',//登录
      name: 'binding',
      component: binding,
      meta:{title:'绑定用户-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    },
    {
      path: '/register',//注册
      name: 'register',
      component: register,
      meta:{title:'注册中心-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    },
    {
      path: '/retrieve',//修改密码
      name: 'retrieve',
      component: retrieve,
      meta:{title:'修改密码-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    },
    {
      path: '/vip',//个人中心
      name: 'vip',
      component: vip,
      children:[
        {path: '/', name: 'vipIndex', component: vipIndex,meta:{title:'个人中心-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'news', name: 'vipNews', component: vipNews,meta:{title:'消息中心-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'address', name: 'vipAddress', component: vipAddress,meta:{title:'地址中心-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'addmod', name: 'vipAddMod', component: vipAddMod,meta:{title:'修改地址-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'down', name: 'vipDown', component: vipDown,meta:{title:'APP下载-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'order', name: 'vipOrder', component: vipOrder,meta:{title:'订单中心-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'coupon', name: 'vipCoupon', component: vipCoupon,meta:{title:'我的优惠券-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'card', name: 'vipCard', component: vipCard,meta:{title:'课程卡激活-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'agreement', name: 'vipAgreement', component: vipAgreement,meta:{title:'我的协议-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'agreementSee', name: 'AgreementSee', component: AgreementSee,meta:{title:'协议详情-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'shopping', name: 'vipShopping', component: vipShopping,meta:{title:'我的购物车-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'collection', name: 'vipCollection', component: vipCollection,meta:{title:'我的收藏-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'information', name: 'vipInformation', component: vipInformation,meta:{title:'账户信息-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'name', name: 'vipName', component: vipName,meta:{title:'修改昵称-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'study', name: 'vipStudy', component: vipStudy,meta:{title:'学习卡充值-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'password', name: 'vipPassword', component: vipPassword,meta:{title:'修改密码-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'ordermodify', name: 'vipOrdMod', component: vipOrdMod,meta:{title:'修改订单-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'paymentnot', name: 'paymentNot', component: paymentNot,meta:{title:'签订协议-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'deliver', name: 'vipDeliver', component: vipDeliver,meta:{title:'发货信息-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'network', name: 'vipNetwork', component: vipNetwork,meta:{title:'签订协议-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'feedback', name: 'vipFeedback', component: vipFeedback,meta:{title:'用户反馈-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'account', name: 'vipAccount', component: vipAccount,meta:{title:'账号绑定-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        // {path: 'phone',name:'vipphone',component:vipphone,meta:{title:'修改手机号-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}}
      ]
    },
    {
      path: '/course',//课程
      name: 'course',
      component: courseIndex,
      children:[
        {path: '/', name: 'course', component: courseList,meta:{title:'课程列表-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'courseconter', name: 'courseconter', component: courseconter,meta:{title:'课程详情-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'conter', name: 'conter', component: courseconter,meta:{title:'课程详情-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'coursevideo', name: 'coursevideo', component: coursevideo,meta:{title:'课程试听-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},//试听
        {path: 'courselive', name: 'courselive', component: courselive,meta:{title:'课程直播-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网',requiresAuth: true}},//直播
      ]
    },
    {
      path: '/payment',//支付
      name: 'payment',
      component: payment,
      children:[
        {path: '/', name: 'paymentIndex', component: paymentIndex,meta:{title:'提交订单-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'service', name: 'paymentService', component: paymentService,meta:{title:'选择客服-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'paymentorder', name: 'paymentOrder', component: paymentOrder,meta:{title:'确认订单-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'paymentsuccess', name: 'paymentSuccess', component: paymentSuccess,meta:{title:'支付成功-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'payAddress', name: 'payAddress', component: payAddress,meta:{title:'添加地址-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
        {path: 'payAddMod', name: 'payAddMod', component: payAddMod,meta:{title:'修改地址-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}},
      ]
    },
    {
      path: '/shou',//首页
      name: 'shou',
      component: shou,
      meta:{title:'爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    },
    {
      path: '/search',//搜索
      name: 'search',
      component: search,
      meta:{title:'搜索-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    },
    {
      path: '/notice',//公告
      name: 'notice',
      component: notice,
      meta:{title:'公告-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    },
    {
      path: '/main',//我的课程
      name: 'main',
      component: mainIndex,
      meta:{title:'我的课程-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    },
    {
      path: '/directory',//我的课程
      name: 'directory',
      component: directory,
      meta:{title:'课程目录-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    },
    {
      path: '/recorded',//视频
      name: 'recorded',
      component: recorded,
      meta:{title:'视频中心-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    },
    {
      path: '/viedoClass',//无权限
      name: 'viedoClass',
      component: viedoClass,
      meta:{title:'无权限-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    },
    {
      path: '/teacher',//教师
      name: 'teacher',
      component: teacher,
      meta:{title:'教师-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    },
    {
      path: '/activity',//活动
      name: 'activity',
      component: activity,
      meta:{title:'活动-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    },
    {
      path: '/activityregister',//活动注册
      name: 'activityregister',
      component: activityregister,
      meta:{title:'注册活动-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    },
    {
      path: '/vipact',//vip活动
      name: 'vipact',
      component: vipact,
      meta:{title:'VIP活动-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    },
    {
      path: '/baoli',//保利视频
      name: 'baoli',
      component: baoli,
      meta:{title:'视频中心-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    },
    {
      path: '/cc',//保利视频
      name: 'cc',
      component: cc,
      meta:{title:'视频中心-爱启航在线官网-爱启航_启航旗下远程教育网站,爱启航网络课堂,爱启航在线官网'}
    }
  ]
})
