<template>
  <div class="Publicheader">
    <mt-header :title=" htitle " >
      <div @click="returnA" slot="left">
        <mt-button icon="back"></mt-button>
      </div>
      <mt-button slot="right" @click="addressAdd">{{rightTitle}}</mt-button>
    </mt-header>
  </div>
</template>

<script>
export default {
  props:['htitle','rightTitle'],
  name: 'header',
  data () {
    return {
      pp:false
    }
  },
  methods:{
    addressAdd(){
      this.$emit('adddata', this.pp)
    },
    returnA(){
      this.$emit('childReturn');
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Publicheader{
  height:1rem;
  background: #3acbae;
  color: #fff!important;
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100%;
}
.Publicheader .mint-header{background: none;height:1rem;}
.Publicheader .mint-header .is-left .router-link-active .mint-button .mint-button-icon .mintu{color: #fff !important;font-size: 0.22rem}
.Publicheader .mint-header .mint-header-title{font-size: 0.16rem;color: #fff !important;}
.mint-header-title{
  color: #fff!important;
}
</style>
