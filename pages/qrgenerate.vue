/**二维码生成 */
<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="二维码生成" name="create">二维码生成</el-tab-pane>
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
    this.activeName = this.$route.query.activeName || "create";
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push("qrgenerate?activeName=" + tab.name);
    }
  }
};
</script>
