/**正则表达式 */
<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="正则测试" name="test">
          <el-row style="height:500px;">
            <el-col :span="10">
              <el-card class="box-card">
                <div slot="header" class="clearfix" style="height:80px;">
                  <el-scrollbar style="height:60px;">
                    <el-input
                      type="textarea"
                      :rows="2"
                      placeholder="请输入正则表达式"
                      v-model="regexDataModel"
                    ></el-input>
                  </el-scrollbar>
                </div>
                <el-scrollbar style="height:400px;">
                  <el-input
                    type="textarea"
                    :rows="10"
                    placeholder="请输入测试内容"
                    v-model="parmDataModel"
                  ></el-input>
                </el-scrollbar>
                <span>不处理大小写</span>
                <el-switch v-model="IgnoreCase" active-color="#13ce66" inactive-color="#909399"></el-switch>
              </el-card>
            </el-col>
            <!-- style=" text-align: center; height:100%; line-height: 500px;" -->
            <el-col
              :span="4"
              style=" text-align: center; height:100%;padding: 0 30px;padding-top: 150px;"
            >
              <el-button type="primkey" @click="test">
                <span>测试</span>
                <i class="el-icon-arrow-right"></i>
              </el-button>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card">
                <div slot="header" class="clearfix" style="height:80px;">
                  <span>{{notiDataModel}}</span>
                </div>
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" :rows="10" v-model="resDataModel"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="正则参考" name="docs">
          <el-row style="height:600px;" :gutter="20">
            <el-col :span="10">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>常用正则表达式</span>
                </div>
                <el-table :data="usuallyData" border style="width: 100%" :show-header="false">
                  <el-table-column prop="name" width="180"></el-table-column>
                  <el-table-column prop="value"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
            <el-col :span="14">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>正则语法</span>
                </div>
                <el-table :data="regularData" border style="width: 100%" :show-header="false" :max-height="500">
                  <el-table-column prop="name" width="80"></el-table-column>
                  <el-table-column prop="value"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<style scoped>
.el-table-filter {
  max-height: 300px;
  overflow: auto;
}
</style>

<script>
import { Regular } from "@/assets/js/common";
export default {
  data() {
    return {
      headerTitle: "正则表达式",
      regexDataModel: "",
      parmDataModel: "",
      resDataModel: "",
      IgnoreCase: false,
      notiDataModel: "",
      usuallyData: [],
      regularData: [],
      activeName: ""
    };
  },
  mounted() {
    this.activeName = this.$route.query.activeName || "test";
    this.usuallyData = Regular.usuallyRegular;
    this.regularData = Regular.regularData;
  },
  methods: {
    handleClick(tab, event) {
      this.headerTitle = event.currentTarget.textContent;
      this.$router.push("regular?activeName=" + tab.name);
    },
    test() {
      let obj = Regular.test(
        this.regexDataModel,
        this.IgnoreCase,
        this.parmDataModel
      );
      this.notiDataModel = obj.notice;
      this.resDataModel = obj.res;
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
