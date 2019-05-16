/**单位换算 */
<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="进制换算" name="binary">进制换算</el-tab-pane>
        <el-tab-pane label="时间换算" name="time">时间换算</el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      activeName: "",
      first: {
        ipVal: "",
        localName: ""
      }
    };
  },
  mounted() {
    this.activeName = this.$route.query.activeName || "binary";
  },
  methods: {
    handleClick(tab, event) {
    this.$router.push('unitconversion?activeName='+tab.name)
    }
  }
};
</script>

