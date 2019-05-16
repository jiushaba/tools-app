<template>
  <el-container class="maxcontainer">
    <el-header class="headerlayout">
      <headermenu/>
    </el-header>
    <el-container class="maincontainer">
      <el-aside style="width:180px">
        <sidebarmenu/>
      </el-aside>
      <el-container class="mincontainer">
        <el-main>
          <nuxt/>
        </el-main>
        <el-footer>
          <footer-index></footer-index>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<style scoped>
.mincontainer {
  min-height: calc(100vh - 60px);
}
.el-aside ul {
  border-width: 0;
}
.el-aside {
  min-height: calc(100vh - 60px);
  border-right: 1px solid #e6e6e6;
}
.el-footer {
  padding: 0 0;
}
</style>


<script>
import headermenu from "~/components/head/headmenu.vue";
import sidebarmenu from "~/components/sidebar/sidebarmenu.vue";
import footerIndex from "~/components/footer/footerIndex.vue";
import { error } from "util";
import { Menu } from "@/config/api";
export default {
  data() {
    return {};
  },
  components: {
    headermenu,
    sidebarmenu,
    footerIndex
  },
  methods: {},
};
</script>
