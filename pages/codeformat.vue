/**代码格式化 */
<template>
    <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="js格式化" name="js">js格式化</el-tab-pane>
        <el-tab-pane label="html格式化" name="html">html格式化</el-tab-pane>
        <el-tab-pane label="css格式化" name="css">css格式化</el-tab-pane>
        <el-tab-pane label="json格式化" name="json">json格式化</el-tab-pane>
        <el-tab-pane label="xml格式化" name="xml">xml格式化</el-tab-pane>
         <el-tab-pane label="sql格式化" name="sql">sql格式化</el-tab-pane>
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
    this.activeName = this.$route.query.activeName || "js";
  },
  methods: {
    handleClick(tab, event) {
    this.$router.push('codeformat?activeName='+tab.name)
    }
  }
}
</script>

