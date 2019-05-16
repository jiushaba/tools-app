/**编码解码 */
<template>
    <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="UrlEncode" name="url">UrlEncode</el-tab-pane>
        <el-tab-pane label="HtmlEncode" name="html">HtmlEncode</el-tab-pane>
        <el-tab-pane label="ASCII" name="ascii">ASCII</el-tab-pane>
        <el-tab-pane label="UTF-8" name="utf8">UTF-8</el-tab-pane>
        <el-tab-pane label="Unicode" name="unicode">Unicode</el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
export default {
  //   layout: 'blank',
  data() {
    return {
      activeName: ""
    };
  },
  mounted() {
    this.activeName = this.$route.query.activeName || "url";
  },
  methods: {
    handleClick(tab, event) {
    this.$router.push('decode?activeName='+tab.name)
    }
  }
};
</script>

