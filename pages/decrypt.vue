/**加密解密 */
<template>
    <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="Md5" name="md5">Md5</el-tab-pane>
        <el-tab-pane label="Base64" name="base64">Base64</el-tab-pane>
        <el-tab-pane label="图片转Base64" name="image64">图片转Base64</el-tab-pane>
        <el-tab-pane label="文件Md5" name="filemd5">文件Md5</el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
export default {
   // layout:'blank'
    data() {
    return {
      activeName: ""
    };
  },
  mounted() {
    this.activeName = this.$route.query.activeName || "md5";
  },
  methods: {
    handleClick(tab, event) {
    this.$router.push('decrypt?activeName='+tab.name)
    }
  }
}
</script>

