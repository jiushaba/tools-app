<template>
  <el-container>
    <el-header><headermenu/></el-header>
    <el-main>
      <nuxt/>
    </el-main>
  </el-container>
</template>

<script>
import headermenu from "~/components/head/headmenu.vue";
export default {
   components: {
    headermenu
  },
   mounted() {
    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start();
    //   setTimeout(() => this.$nuxt.$loading.finish(), 500);
    // });
  },
};
</script>

<style lang="css">
</style>
