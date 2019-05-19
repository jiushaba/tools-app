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
      headerTitle:'字符转换',
      activeName: ""
    };
  },
  mounted() {
    this.activeName = this.$route.query.activeName || "dbc";
  },
  methods: {
    handleClick(tab, event) {
      this.headerTitle = event.currentTarget.textContent;
      this.$router.push("strconversion?activeName=" + tab.name);
    }
  },
  head() {
    return {
      title:  this.headerTitle+ "-程序员在线工具箱 zdlog.com",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "常用工具,全角半角,js格式化,html格式化,css格式化,json格式化,xml格式化,sql格式化,历史上的今天,手机归属地查询,域名归属地查询,IP归属地查询,UrlEncode,Unicode,UTF-8,图片转Base64,ASCII,HtmlEncode,文件Md5,正则测试,正则参考,字符串生成实体,xml生成实体,json生成实体,在线调色板,px转rem,在线MarkDown编辑器,大小写转换,Unix时间戳,字符长度,GUID生成,URL参数格式化,程序员,在线工具,进制换算,时间换算,json格式化,ip查询,手机归属地查询,数据查询,前端工具,实体生成,编码解码,加密解密,字符转换,单位换算,代码格式化,正则表达式,二维码生成,条形码生成"
        }
      ]
    };
  }
};
</script>

