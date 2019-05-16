/**正则表达式 */
<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="正则测试" name="test">正则测试</el-tab-pane>
        <el-tab-pane label="正则参考" name="docs">正则参考</el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      activeName: ""
    };
  },
  mounted() {
    this.activeName = this.$route.query.activeName || "test";
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push("regular?activeName=" + tab.name);
    }
  }
};
</script>
