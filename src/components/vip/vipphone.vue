<template>
    
     <div class="vipphone">
         <public-header :htitle="htitleText" @childReturn="allControl"></public-header>
        <div class="vip-name" v-if="isshow">
            <div class="vip-name-list">
                <mt-field label="手机号：" type="text" :placeholder="phone"></mt-field>
            </div>
            <div class="vip-name-list">
                <mt-field label="验证码：" type="text"  placeholder="请输入验证码" v-model="vipyzm1"></mt-field>
            </div>
            <span v-if="!sendMsgDisabled" class="phone-codeactive" @click="firstget()">获取手机验证码</span>
            <span v-if="sendMsgDisabled" class="phone-code" >{{time+'秒后重新获取'}}</span>
            <button class="yzh" @click="newphone1()">验证后绑定新手机</button>

        </div>
        <div class="newphone" v-if="!isshow">
            <div class="vip-name-list">
                <mt-field label="新手机号：" type="text" placeholder="请输入新手机号" v-model="newphone"></mt-field>
            </div>
            <div class="vip-name-list">
                <mt-field label="验证码：" type="text"  placeholder="请输入验证码" v-model="vipyzm2"></mt-field>
            </div>
            <span v-if="!sendMsgDisabled" class="phone-codeactive" @click="twoget()">获取手机验证码</span>
            <span v-if="sendMsgDisabled" class="phone-code" >{{newtime+'秒后重新获取'}}</span>
            <button class="bangding" @click="updatephone()">确认修改</button>

        </div>
     </div>
</template>
<style  scoped>
    .vipphone{
    height:100%;
    background: #f4f4f4;
    }
    .vip-name,.newphone{
        margin-top: 0.2rem;
        padding-top: 1rem;
        position:relative;
    }
    .vip-name-list{
        width: 100%;
        padding: 0 0.2rem 0 0;
        background: #fff;
        border-bottom: 1px solid #e6e6e6;
    }
    .vip-name button.firstyzm,.newphone .vip-name button.towyzm{
        margin: 0.4rem 0.2rem 0 0.2rem;
        border-radius: 8px;
        width:1.8rem;
        height:.6rem;
        background: #3acbae;
        color: #fff;
        font-size: 0.30rem;
        position:absolute;
        top:.8rem;
        right:.1rem;
    }  
    .yzh,.bangding{
        margin: 0.4rem 0.2rem 0 0.2rem;
        border-radius: 8px;
        width:7.1rem;
        height:1.04rem;
        background: #3acbae;
        color: #fff;
        font-size: 0.30rem;
    }
    .phone-codeactive{
        position: absolute;
        top: 1.05rem;
        right: .3rem;
        width:2.8rem;
        line-height: 0.9rem;
        text-align: center;
        font-size: 0.25rem;
        display: block;
        color: #3acbae;
    }
    .phone-code{
        position: absolute;
        top: 1.05rem;
        right: .3rem;
        width:2.8rem;
        line-height: 0.9rem;
        text-align: center;
        font-size: 0.25rem;
        display: block;
        color: #c1c1c1;
    }
</style>
<script>
    import PublicHeader from '@/components/public/header'
    import { Toast } from 'mint-ui'
    export default {
        name: 'vipphone',
        components:{
            PublicHeader,
        },
        data () {
            return {
                phone:'',
                isshow:true,
                vipyzm1:'',
                username:'',
                vipyzm2:'',
                newphone:'',
                userid:'',
                sendMsgDisabled: '',
                time:'60',
                newtime:'60',
                 
            }
        },
        methods:{
            getphone:function () {
                this.axios.get('/api/party/user/v2/user/img', {})
                    .then(response => {
                        console.log(response);
                    if (response.data.status == '888') {
                        this.$router.push({name: 'login', query: {url: 'vip'}});
                    } else {
                        this.phone = response.data.data.phone;//手机号
                        this.username = response.data.data.username;
                        this.userid = response.data.data.userId;
                    }
                })
            },
            firstget:function(){
                this.axios.get('/api/party/user/v2/user/sendPhone1?phone='+this.phone+'&cmd=11', {
                })
                .then(response => {
                    if(response.data.status == "0"){
                        let me = this;
                        me.sendMsgDisabled = true;
                        this.interval = window.setInterval(function() {
                            if ((me.time--) <= 0) {
                            me.time = 60;
                            me.sendMsgDisabled = false;
                            window.clearInterval(this.interval);
                            }
                        }, 1000);
                        
                        Toast({
                            message: "手机验证码发送成功",
                            type: 'success',
                            duration:2000
                        });
                    }else {
                        Toast({
                            message: response.data.msg,
                            type: 'warning',
                            duration:2000
                        });
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            },
            newphone1:function(){
                console.log(123);
                this.sendMsgDisabled = true;
                if(this.vipyzm1 == ""){
                    Toast({
                    message: '请输入验证码',
                    position: 'middle',
                    duration: 2000
                    });
                }else{
                    this.axios.post('/api/party/user/v2/user/phone', {
                        username:this.username,
                        verifyCodeTel:this.vipyzm1
                    })
                    .then(response => {
                        console.log(response)
                        if(response.data.status == "0"){
                            this.isshow = false;
                            this.sendMsgDisabled = false;
                            
                        }else {
                            Toast({
                                message: response.data.msg,
                                position: 'warning',
                                duration: 2000
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            },
            twoget:function(){
                if(this.newphone ==""){
                    Toast({
                        message: '请输入手机号码',
                        position: 'warning',
                        duration: 2000
                    });
                }else if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.loginTel))){
                    Toast({
                        message: '请输入正确手机号',
                        position: 'middle',
                        duration: 2000
                    });
                }else {
                    this.axios.get('/api/party/user/v2/user/sendPhone1?phone='+this.newphone+'&cmd=11', {
                    })
                        .then(response => {
                            if(response.data.status == "0"){
                                    console.log(123);
                                    let me = this;
                                    me.sendMsgDisabled = true;
                                    let interval = window.setInterval(function() {
                                    if ((me.newtime--) <= 0) {
                                        me.newtime = 60;
                                        me.sendMsgDisabled = false;
                                        window.clearInterval(interval);
                                    }
                                }, 1000);
                                Toast({
                                    message: '手机验证码发送成功',
                                    position: 'success',
                                    duration: 2000
                                });
                            }else {
                                Toast({
                                    message: response.data.msg,
                                    type: 'warning'
                                });
                            }
                        })
                        .catch(err => {
                        console.log(err)
                        })
                }
            },
            updatephone:function(){
                if(this.vipyzm2 == ""){
                    Toast({
                        message: '请输入验证码',
                        position: 'warning',
                        duration: 2000
                    });
                }else{
                    this.axios.post('/api/party/user/v2/user/updatephone', {
                    userId:this.userid,
                    username:this.newphone,
                    verifyCodeTel:this.vipyzm2
                    })
                    .then(response => {
                        if(response.data.status == "0"){
                         Toast({
                            message: response.data.msg,
                            type: 'success',
                            duration:2000,
                        });
                         setTimeout(() => {
                           this.$router.push({path: '/login',query: {id: "vip"}})
                         },2000)
                        }else {
                         Toast({
                            message: response.data.msg,
                            type: 'warning'
                        });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            }
        },
        mounted() {
            this.getphone();
        }
    }
</script>