/**代码格式化 */
<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="js格式化" name="js">
          <el-row>
            <el-col :span="24" style="height:400px">
              <el-scrollbar style="height:400px;">
                <el-input type="textarea" :rows="15" placeholder="请输入内容" v-model="jsDataModel"></el-input>
              </el-scrollbar>
            </el-col>
            <el-col :span="24" class="text-center">
              <el-button @click="jsFormat">格式化</el-button>
              <el-button @click="jsCompress">压缩</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="html格式化" name="html">
          <el-row>
            <el-col :span="24" style="height:400px">
              <el-scrollbar style="height:400px;">
                <el-input type="textarea" :rows="15" placeholder="请输入内容" v-model="jsDataModel"></el-input>
              </el-scrollbar>
            </el-col>
            <el-col :span="24" class="text-center">
              <el-button @click="jsFormat">格式化</el-button>
              <el-button @click="jsCompress">压缩</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="css格式化" name="css">
          <el-row>
            <el-col :span="24" style="height:400px">
              <el-scrollbar style="height:400px;">
                <el-input type="textarea" :rows="15" placeholder="请输入内容" v-model="cssDataModel"></el-input>
              </el-scrollbar>
            </el-col>
            <el-col :span="24" class="text-center">
              <el-button @click="moreRow">格式化</el-button>
              <el-button @click="cssCompress">压缩</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="json格式化" name="json">
          <el-row>
            <el-col :span="24" style="height:400px">
              <el-scrollbar style="height:400px;">
                <el-input type="textarea" :rows="15" placeholder="请输入内容" v-model="jsonDataModel"></el-input>
              </el-scrollbar>
            </el-col>
            <el-col :span="24" class="text-center">
              <el-button @click="jsonFormat">格式化</el-button>
              <el-button @click="jsonCompress">压缩</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="xml格式化" name="xml">
          <el-row>
            <el-col :span="24" style="height:400px">
              <el-scrollbar style="height:400px;">
                <el-input type="textarea" :rows="15" placeholder="请输入内容" v-model="xmlDataModel"></el-input>
              </el-scrollbar>
            </el-col>
            <el-col :span="24" class="text-center">
              <el-button @click="xmlFormat">格式化</el-button>
              <el-button @click="xmlCompress">压缩</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="sql格式化" name="sql">
          <el-row>
            <el-col :span="24" style="height:400px">
              <el-scrollbar style="height:400px;">
                <el-input type="textarea" :rows="15" placeholder="请输入内容" v-model="sqlDataModel"></el-input>
              </el-scrollbar>
            </el-col>
            <el-col :span="24" class="text-center">
              <el-button @click="sqlFormat">格式化</el-button>
              <el-button @click="sqlCompress">压缩</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import { CodeFormat } from "@/assets/js/common";
export default {
  data() {
    return {
      headerTitle: "代码格式化",
      jsDataModel: "",
      cssDataModel: "",
      jsonDataModel: "",
      xmlDataModel: "",
      sqlDataModel: "",
      activeName: ""
    };
  },
  mounted() {
    this.activeName = this.$route.query.activeName || "js";
  },
  methods: {
    handleClick(tab, event) {
      this.headerTitle = event.currentTarget.textContent;
      this.$router.push("codeformat?activeName=" + tab.name);
    },
    jsFormat() {
      this.jsDataModel = CodeFormat.do_js_beautify(this.jsDataModel);
    },
    jsCompress() {
      this.jsDataModel = CodeFormat.pack_js(this.jsDataModel);
    },
    moreRow() {
      this.cssDataModel = CodeFormat.CSSdecode(this.cssDataModel, this);
    },
    cssCompress() {
      this.cssDataModel = CodeFormat.cssCompress(this.cssDataModel, this);
    },
    jsonFormat() {
      this.jsonDataModel = CodeFormat.jsonFormat(this.jsonDataModel);
    },
    jsonCompress() {
      this.jsonDataModel = CodeFormat.jsonCompress(this.jsonDataModel);
    },
    xmlFormat() {
      this.xmlDataModel = CodeFormat.xmlFormat(this.xmlDataModel);
    },
    xmlCompress() {
      this.xmlDataModel = CodeFormat.xmlCompress(this.xmlDataModel);
    },
    sqlFormat() {
      this.sqlDataModel = CodeFormat.sqlFormat(this.sqlDataModel);
    },
    sqlCompress() {
      this.sqlDataModel = CodeFormat.sqlCompress(this.sqlDataModel);
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

