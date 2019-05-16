<template>
  <div class="headRoot">
    <img class="logo" src="~assets/image/logo.png" alt="键鼠社">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      active-text-color="#8E5FFF"
      router
      :default-active="menuHeadActiveName||$route.path"
    >
      <el-menu-item v-for="(item,idx) in headMenuList" :index="item.url" :key="idx">{{item.name}}</el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped>
.headRoot {
  width: 100%;
  height: 60px;
  position: relative;
  background-image: url("/image/head/node-bg.png");
}
.logo {
  height: 35px;
  position: absolute;
  z-index: 787;
  top: 12px;
  left: 10px;
}
.menu {
  display: inline;
  width: 80%;
  height: 100%;
}
ul {
  background-color: transparent !important;
  float: right;
}

.el-menu--horizontal > .el-menu-item {
  margin-right: 50px;
  color: white;
}

.el-menu-item:focus {
  outline: 0;
  background-color: transparent !important;
}
.el-menu-item:hover {
  outline: 0;
  color: rgb(142, 95, 255) !important;
  background-color: transparent !important;
}
</style>

<script>
export default {
  data() {
    return {};
  },
  watch: {
    $route(to, from) {
     this.$store.commit("setMenuHeadActiveName", to.path);
      console.log(to.path);
    }
  },
  async asyncData() {
    debugger;
    const ac = await sessionStorage.getItem("setMenuHeadActiveName");
    return { menuHeadActiveName: ac };
  },
  computed: {
    headMenuList: {
      get() {
        return this.$store.state.headMenuList;
      }
    },
    headUrlList: {
      get() {
        return this.$store.state.headMenuUrlList;
      }
    },
    menuHeadActiveName: {
      get() {
        return this.$store.state.menuHeadActiveName;
      },
      set(val) {
        this.$store.commit("setMenuHeadActiveName", val);
      }
    }
  },
  methods: {}
};
</script>

