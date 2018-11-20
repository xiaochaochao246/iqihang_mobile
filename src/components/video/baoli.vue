<template>
  <div id="baoli">
    <div id='paly'></div>
  </div>
</template>

<script>
  export default {
    components:{

    },
    name: 'index',
    data () {
      return {
        myurl:''
      }
    },
    watch:{

    },
    methods:{
      //保利录播
      baoliplayer(){
        let paly = document.getElementById('paly');
        paly.innerHTML = '';
        polyvObject('#paly').videoPlayer({
          'width':'100%',
          'height':'210',
          'vid' :this.myurl,
          'ts':'<?php echo $ts; ?>',
          'sign':'<?php echo $hash; ?>',
          'flashvars':{'ban_seek_by_limit_time':'off'}
        });
      },
    },
    mounted(){
      this.myurl = window.location.search.split("?").join('');
      this.baoliplayer()
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #baoli{
    width: 100%;
    height: auto;
  }
</style>
