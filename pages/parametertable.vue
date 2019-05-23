/**常用参数表 */
<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="Http状态码" name="http">
          <el-scrollbar style="height:600px;">
            <el-table :data="httpSttatusDatas" border style="width: 100%" height="600"   :default-sort="{prop: 'code', order: 'descending'}">
              <el-table-column prop="code" sortable label="状态码" width="100"></el-table-column>
              <el-table-column prop="value" label="含义"></el-table-column>
            </el-table>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="Content-Type" name="ContentType">
          <el-scrollbar style="height:600px;">
            <el-table :data="contentTypeDatas" border style="width: 100%" height="600">
              <el-table-column prop="code" label="文件扩展名" width="180"></el-table-column>
              <el-table-column prop="value" label="Content-Type(Mime-Type)"></el-table-column>
            </el-table>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="Html转义字符" name="html">
          <el-scrollbar style="height:600px;">
            <el-table :data="htmlDatas" border style="width: 100%" height="600">
              <el-table-column prop="code" label="字符"></el-table-column>
              <el-table-column prop="value" label="十进制"></el-table-column>
              <el-table-column prop="value2" label="转义字符"></el-table-column>
            </el-table>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="ASCII码表" name="ascii">
          <el-scrollbar style="height:600px;">
            <el-table
              :data="asciiDatas"
              border
              style="width: 100%"
              height="600"
              :default-sort="{prop: 'code', order: 'descending'}"
            >
              <el-table-column prop="code" sortable label="ASCII值"></el-table-column>
              <el-table-column prop="value" label="控制字符"></el-table-column>
            </el-table>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<style>
</style>

<script>
import { ParameterTable } from "@/assets/js/common";
export default {
  data() {
    return {
      headerTitle: "常用参数表",
      activeName: "",
      httpSttatusDatas: [],
      contentTypeDatas: [],
      htmlDatas: [],
      asciiDatas: []
    };
  },
  async mounted() {
    this.activeName = this.$route.query.activeName || "http";
    const { data: httpSttatusData } = await this.$axios.get("/common/getDict", {
      params: {
        type: 1
      }
    });
    httpSttatusData.forEach(element => {
      this.httpSttatusDatas.push({
        code: parseInt(element.code),
        value: element.value
      });
    });
    const { data: contentTypeData } = await this.$axios.get("/common/getDict", {
      params: {
        type: 2
      }
    });
    this.contentTypeDatas = contentTypeData;
    const { data: htmlData } = await this.$axios.get("/common/getDict", {
      params: {
        type: 3
      }
    });
    this.htmlDatas = htmlData;
    const { data: asciiData } = await this.$axios.get("/common/getDict", {
      params: {
        type: 4
      }
    });
    asciiData.forEach(element => {
      this.asciiDatas.push({
        code: parseInt(element.code),
        value: element.value
      });
    });
  },
  methods: {
    handleClick(tab, event) {
      this.headerTitle = event.currentTarget.textContent;
      this.$router.push("parametertable?activeName=" + tab.name);
    }
  },
  head() {
    return {
      title: this.headerTitle + "-程序员在线工具箱 zdlog.com",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "常用工具,全角半角,js格式化,html格式化,css格式化,json格式化,xml格式化,sql格式化,历史上的今天,手机归属地查询,域名归属地查询,IP归属地查询,UrlEncode,Unicode,UTF-8,图片转Base64,ASCII,HtmlEncode,文件Md5,正则测试,正则参考,字符串生成实体,xml生成实体,json生成实体,在线调色板,px转rem,在线MarkDown编辑器,大小写转换,Unix时间戳,字符长度,GUID生成,URL参数格式化,程序员,在线工具,进制换算,时间换算,json格式化,ip查询,手机归属地查询,数据查询,前端工具,实体生成,编码解码,加密解密,字符转换,单位换算,代码格式化,正则表达式,二维码生成,条形码生成"
        },
        {
          hid: "KeyWords",
          name: "KeyWords",
          content:
            "在线工具,程序员,工具,开发人员工具,小工具,站长工具,代码格式化、压缩、加密、解密,下载链接转换"
        }
      ]
    };
  }
};
</script>
