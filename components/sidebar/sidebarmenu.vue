<template>
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
  </el-radio-group>-->
  <el-menu
    :default-active="this.$route.path"
    class="el-menu-vertical-demo"
    router
  >
    <el-menu-item index="/none" key="-1" hidden>
      <i class="el-icon-circle-close-outline"></i>
      <span slot="title">dsad</span>
    </el-menu-item>
    <template>
      <el-menu-item v-for="(item,idx) in menuList" :index="item.url" :key="idx">
        <i class="iconfont" :class="item.iconClass"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
   computed: {
    menuList: {
      get() { return this.$store.state.sideMenuList},
    },
    urlList: {
       get() {return this.$store.state.sideMenuUrlList},
    }
   },
  mounted() {
  },
  methods: {
    // isIndexOf(val) {
    //   if (this.urlList !== null) {
    //     if (this.urlList.indexOf(this.$route.path) >= 0) {
    //       return this.$route.path;
    //     } else if (this.urlList.length === 0) {
    //       return "/";
    //     } else {
    //       return "/none";
    //     }
    //   } else {
    //     return "";
    //   }
    // }
  },
  head: {
    link: [{ href: "http://at.alicdn.com/t/font_1165674_hjabevh4l4.css" }]
  }
};
</script>
