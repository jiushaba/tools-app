<template>
  <div class="cry">{{callsNum}}</div>
</template>
<style scoped>
.cry {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  text-align: center;
  line-height: 90px;
  border-right: 6px solid salmon;
  border-left: 6px solid chartreuse;
  border-top: 6px solid cornflowerblue;
  border-bottom: 6px solid darkcyan;
}
/* 按钮动画效果 */
.cry {
  -webkit-animation: free_download 2.5s linear alternate infinite;
  animation: free_download 2.5s linear alternate infinite;
}
@-webkit-keyframes free_download {
  0% {
    -webkit-transform: scale(0.9);
  }
  100% {
    -webkit-transform: scale(1);
  }
}
@keyframes free_download {
  0% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>
<script>
export default {
  props: {
    callsNum: {
      type: String,
      default: () => {
        return "";
      }
    }
  },
  data() {
    return {};
  }
};
</script>

