<template>
  <div id="ccvideo">
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
        $("#ccvideo").append("<script src=\"https://p.bokecc.com/player?vid="+this.myurl+"&siteid=096E928BC2A97B87&autoStart=false&width=100%&height=230&playerid=7ED41A33655BEB0E&playertype=1\" type=\"text/javascript\"><\/script>");
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
