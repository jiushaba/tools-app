/**字符转换 */
<template>
    <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="全角半角" name="dbc">全角半角</el-tab-pane>
        <el-tab-pane label="大小写转换" name="upper">大小写转换</el-tab-pane>
        <el-tab-pane label="Unix时间戳" name="unix">Unix时间戳</el-tab-pane>
        <el-tab-pane label="字符长度" name="len">字符长度</el-tab-pane>
        <el-tab-pane label="GUID" name="guid">GUID</el-tab-pane>
         <el-tab-pane label="URL参数格式化" name="url">URL参数格式化</el-tab-pane>
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
    this.activeName = this.$route.query.activeName || "dbc";
  },
  methods: {
    handleClick(tab, event) {
    this.$router.push('strconversion?activeName='+tab.name)
    }
  }
}
</script>

