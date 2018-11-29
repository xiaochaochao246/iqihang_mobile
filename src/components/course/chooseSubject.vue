<template>
<div>
    <div class="classBox" :style="{backgroundImage:`url(${backgroundImg}`}" ref="backgroundImg">选择科目</div>
    <div class="classContent">
        <h3>选择课程</h3>
        <span class="close" @click="show"><img src="./courseImg/icon_close.png" alt=""></span>
        <div class="b_classBox">
          <div class="class" @click="jumpCourseDetail(item.associatedId)" v-for="(item,index) in associated" :key="index">
            <span v-show=" index == 0" :class="subJectSel == item.associatedId ? 'action' : ''" v-html="item.associatedTitle"></span>
            <span v-show="subJectSel != item.associatedId && index != 0" :class="subJectSel == item.associatedId ? 'action' : ''" v-html="item.associatedTitle"></span>
          </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
        subJectSel: ''
    };
  },
  props: ["backgroundImg", "associated"],
  watch: {
    backgroundImg() {
      this.backgroundImage();
    }
  },
  methods: {
    backgroundImage(url) {
      this.subJectSel = this.$route.query.id
    },
    show() {
      this.$emit("chooseSubjectShow", false);
    },
    jumpCourseDetail(id) {
      this.$router.push({
        path: "/course/courseconter",
        query: { id: id }
      });
    }
  },
  mounted() {
    this.backgroundImage(this.backgroundImg);
  }
};
</script>
<style scoped>
.classBox {
  position: fixed;
  left: -0.4rem;
  top: -0.4rem;
  right: -0.4rem;
  bottom: -0.4rem;
  background-repeat: no-repeat;
  background-size: 100% 43%;
  -webkit-filter: blur(10px);
  -moz-filter: blur(10px);
  -o-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: blur(10px);
  z-index: 101;
}
.classContent {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 101;
  background: white;
  width: 100%;
  height: 8.8rem;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  padding: 0 0.2rem;
}
.classContent h3 {
  line-height: 0.98rem;
  font-weight: 500;
  color: #4a4a4a;
  font-size: 0.32rem;
  text-align: center;
  border-bottom: 0.01rem solid #e7e7e7;
  position: relative;
}
.classContent .close {
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
}
.classContent span img {
  width: 100%;
}
.b_classBox{
  height: 7.8rem;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.classContent .b_classBox div {
  line-height: 0.98rem;
  border-bottom: 0.01rem solid #e7e7e7;
  font-size: 0.26rem;
  color: #696969;
  text-align: center;
}
.classContent .class span{
    line-height: 0.6rem;
    border-radius: 0.3rem;
    padding: 0 0.2rem;
    display: inline-block;
    min-width: 1.94rem;
}
.classContent .action{
    border:0.01rem solid #3EEFCB;
    color: #3EEFCB;
    background: #edfffb;
}
</style>
