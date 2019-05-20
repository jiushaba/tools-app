/**实体生成页面 */
<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="json生成实体" name="json">
          <el-row style="height:500px;">
            <el-col :span="10">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>JSON字符串</span>
                </div>
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="JsonStringData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
            <!-- style=" text-align: center; height:100%; line-height: 500px;" -->
            <el-col
              :span="4"
              style=" text-align: center; height:100%;padding: 0 30px;padding-top: 150px;"
            >
              <el-select v-model="convertType" placeholder="请选择">
                <el-option
                  v-for="item in jsonConvertType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>结果</span>
                </div>
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="resData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="xml生成实体" name="xml">
          <!-- <el-row style="height:500px;">
            <el-col :span="10">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>XML字符串</span>
                </div>
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="JsonStringData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
            <el-col
              :span="4"
              style=" text-align: center; height:100%;padding: 0 30px;padding-top: 150px;"
            >
              <el-select v-model="convertType" placeholder="请选择">
                <el-option
                  v-for="item in jsonConvertType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>结果</span>
                </div>
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="resData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
          </el-row>-->
          <el-row class="codeing" style="height:500px; text-align: center">
            <codeing/>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="字符串生成实体" name="string">
          <el-row style="height:500px;">
            <el-col :span="10">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>字符串</span>
                </div>
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="stringData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
            <!-- style=" text-align: center; height:100%; line-height: 500px;" -->
            <el-col
              :span="4"
              style=" text-align: center; height:100%;padding: 0 30px;padding-top: 150px;"
            >
              <el-select v-model="strConvertType" placeholder="请选择">
                <el-option
                  v-for="item in jsonConvertType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>结果</span>
                </div>
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="resStringData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<style scoped>
.codeing {
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
}
</style>


<script>
import { EntityGenerate } from "@/assets/js/common";
import codeing from "~/components/public/codeing.vue";
export default {
  components: {
    codeing
  },
  //   layout: 'blank',
  data() {
    return {
      headerTitle: "实体生成",
      stringData: "",
      resStringData: "",
      activeName: "",
      JsonStringData: "",
      resData: "",
      convertType: "j",
      strConvertType: "j",
      jsonConvertType: [
        {
          value: "j",
          label: "JAVA"
        },
        {
          value: "c",
          label: "C#"
        }
      ]
    };
  },
  watch: {
    convertType(val) {
      this.jsonGenerate();
    },
    strConvertType(val) {
      this.strGenerate();
    }
  },
  mounted() {
    this.activeName = this.$route.query.activeName || "json";
    this.JsonStringData = EntityGenerate.JsonStringData;
    this.stringData = EntityGenerate.stringData;
    this.jsonGenerate();
    this.strGenerate();
  },
  methods: {
    handleClick(tab, event) {
      this.headerTitle = event.currentTarget.textContent;
      this.$router.push("entitygenerate?activeName=" + tab.name);
    },
    jsonGenerate() {
      try {
        var obj = eval("(" + this.JsonStringData + ")");
      } catch {
        this.resData = "";
        EntityGenerate.notificationWarning("json格式错误");
        return;
      }
      if (this.convertType == "c") {
        let ob = EntityGenerate.extractJson("Object", obj);
        while (
          EntityGenerate.jsonChilds != null &&
          EntityGenerate.jsonChilds.length > 0
        ) {
          var item = EntityGenerate.jsonChilds.pop();
          ob += "\r\n\r\n" + EntityGenerate.extractJson(item.name, item.value);
        }
        this.resData = ob;
      } else if (this.convertType == "j") {
        var ob = EntityGenerate.extractJavaJson("Object", obj);
        while (
          EntityGenerate.jsonChilds != null &&
          EntityGenerate.jsonChilds.length > 0
        ) {
          var item = EntityGenerate.jsonChilds.pop();
          ob +=
            "\r\n\r\n" + EntityGenerate.extractJavaJson(item.name, item.value);
        }
        this.resData = ob;
      }
    },
    strGenerate() {
      if (this.strConvertType == "j") {
        this.resStringData = EntityGenerate.strToJavaEntity(this.stringData);
      } else {
        this.resStringData = EntityGenerate.strToCEntity(this.stringData);
      }
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
          content: "在线工具,程序员,工具,开发人员工具,小工具,站长工具,代码格式化、压缩、加密、解密,下载链接转换"          
        }
      ]
    };
  }
};
</script>

