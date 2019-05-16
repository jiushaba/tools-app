/**常用参数表 */
<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="Http状态码" name="http">Http状态码</el-tab-pane>
        <el-tab-pane label="Content-Type" name="ContentType">Content-Type</el-tab-pane>

        <el-tab-pane label="Html转义字符" name="html">Html转义字符</el-tab-pane>
        <el-tab-pane label="ASCII码表" name="ascii">ASCII码表</el-tab-pane>
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
    this.activeName = this.$route.query.activeName || "http";
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push("parametertable?activeName=" + tab.name);
    }
  }
};
</script>
