<template>
  <div class="PublicCity">
    <span @click="cityClose">确定</span>
    <mt-picker :slots="myAddressSlots" @change="onMyAddressChange"></mt-picker>
    <p>地址3级联动：{{myAddressProvince}} {{myAddressCity}} {{myAddresscounty}}</p>
  </div>
</template>

<script>
import myaddress from './../../../static/address3.json'
export default {
  props:['htitle'],
  name: 'header',
  data () {
    return {
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(myaddress),  //省份数组
          className: 'slot1',
          textAlign: 'center'
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot4'
        },
        {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      myAddressProvince:'省',
      myAddressCity:'市',
      myAddresscounty:'区/县',
    }
  },
  methods:{
    onMyAddressChange(picker, values) {
      if(myaddress[values[0]]){  //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
        picker.setSlotValues(1,Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2,myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
        this.myAddressProvince = values[0];
        this.myAddressCity = values[1];
        this.myAddresscounty = values[2];
      }
    },
    cityClose(){
      this.$emit('citydata', myAddressProvince,myAddressCity,myAddresscounty)
    }
  },
  mounted(){
    this.$nextTick(() => { //vue里面全部加载好了再执行的函数  （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0
      // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
      //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
    });
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.PublicCity{
  position: fixed;
  bottom:0;
  width:100%;
  background: #fff;
}
  .PublicCity span{
    display: block;
    height:0.5rem;
    line-height: 0.5rem;
    color: blue;
    text-align: center;
    padding: 0.2rem;
  }
  .picker-items{
    overflow: hidden;
    width: 100%;
  }
</style>
