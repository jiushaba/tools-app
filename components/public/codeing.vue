<template>
  <div>
    <div class="root"></div>
    <h2 style="font-weight: 400; color: #1f2f3d; margin-top: 48px;">功能开发中</h2>
  </div>
</template>
<style>
.root {
  width: 180px;
  height: 180px;
  background-image: url("~assets/image/codeing.png");
  background-repeat: no-repeat;
  animation: spin 6s linear infinite;
 
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

<script>
export default {};
</script>
