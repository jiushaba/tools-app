/**字符转换 */
<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="全角半角" name="dbc">
          <el-row style="height:500px;">
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="halfData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
            <!-- style=" text-align: center; height:100%; line-height: 500px;" -->
            <el-col
              :span="4"
              style=" text-align: center; height:100%;padding: 0 30px;padding-top: 150px;"
            >
              <el-row>
                <el-button type="primkey" @click="halfToWhole">
                  <span>半转全</span>
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </el-row>
              <el-row style="margin-top:30px">
                <el-button type="primkey" @click="wholeToHalf">
                  <i class="el-icon-arrow-left"></i>
                  <span>全转半</span>
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="wholeData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="大小写转换" name="upper">
          <el-row style="height:500px;">
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="beanData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
            <!-- style=" text-align: center; height:100%; line-height: 500px;" -->
            <el-col
              :span="4"
              style=" text-align: center; height:100%;padding: 0 30px;padding-top: 150px;"
            >
              <el-row>
                <el-button type="primkey" @click="toBig">
                  <span>转大写</span>
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </el-row>
              <el-row style="margin-top:30px">
                <el-button type="primkey" @click="toSmall">
                  <span>转小写</span>
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="resData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Unix时间戳" name="unix">
          <el-row class="just-content" style="height: 360px;">
            <span style="  margin: 0 10px;">日期:</span>
            <el-date-picker v-model="dateTimeModel" type="datetime" placeholder="选择日期时间"></el-date-picker>
            <el-button
              type="primary"
              icon="el-icon-arrow-left"
              style="  margin: 0 10px;"
              @click="toDateTime"
            >转日期</el-button>
            <el-button type="primary" icon="el-icon-arrow-right" @click="toTimeStamp">转时间戳</el-button>
            <div style="  margin: 0 10px;">
              <el-input v-model="timeSimapModel" width="100px">
                <template slot="prepend">时间戳</template>
              </el-input>
            </div>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="字符长度" name="len">
          <el-row style="height: 500px;">
            <el-col :span="14">
              <el-scrollbar style="height:480px;">
                <el-input type="textarea" :rows="20" v-model="strDataModel"></el-input>
              </el-scrollbar>
            </el-col>
            <el-col :span="10" style="height: 100%;" class="just-content">
              <div>
                <div style="    text-align: center;">
                  <el-button @click="couStrLength">计算</el-button>
                </div>
                <div style="  margin: 10px 0;">
                  <span>{{strLengthResDataModel}}</span>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="GUID" name="guid">
          <el-row style="height: 500px;">
            <el-col :span="14">
              <el-scrollbar style="height:480px;">
                <el-input type="textarea" :rows="20" v-model="guidDataModel"></el-input>
              </el-scrollbar>
            </el-col>
            <el-col :span="10" style="height: 100%;" class="just-content">
              <div>
                <el-select v-model="amount" placeholder="请选择">
                  <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
              <div>
                <div style="    text-align: center;">
                  <el-button @click="getGUID">获取</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="URL参数格式化" name="url">
          <el-row style="height:500px;">
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="urlDataModel"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
            <!-- style=" text-align: center; height:100%; line-height: 500px;" -->
            <el-col
              :span="4"
              style=" text-align: center; height:100%;padding: 0 30px;padding-top: 150px;"
            >
              <el-row>
                <el-button type="primkey" @click="doFormat">
                  <span>加密</span>
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="urlResDataModel"></el-input>
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
</style>

<script>
import { StrConversion } from "@/assets/js/common";
export default {
  data() {
    return {
      amount: 10,
      headerTitle: "字符转换",
      halfData: "",
      wholeData: "",
      beanData: "",
      resData: "",
      dateTimeModel: "",
      timeSimapModel: "",
      strDataModel: "",
      strLengthResDataModel: "",
      guidDataModel: "",
      urlDataModel: "",
      urlResDataModel: "",
      activeName: "",
      options: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    };
  },
  mounted() {
    this.activeName = this.$route.query.activeName || "dbc";
  },
  methods: {
    handleClick(tab, event) {
      this.headerTitle = event.currentTarget.textContent;
      this.$router.push("strconversion?activeName=" + tab.name);
    },

    halfToWhole() {
      StrConversion.isNull("半角", this.halfData);
      this.wholeData = StrConversion.ToDBC(this.halfData);
    },
    wholeToHalf() {
      StrConversion.isNull("全角", this.wholeData);
      this.halfData = StrConversion.ToCDB(this.wholeData);
    },
    toBig() {
      StrConversion.isNull("转换内容", this.beanData);
      this.resData = this.beanData.toUpperCase();
    },
    toSmall() {
      StrConversion.isNull("转换内容", this.beanData);
      this.resData = this.beanData.toLowerCase();
    },
    toDateTime() {
      if (StrConversion.isNull("时间戳", this.timeSimapModel)) {
        this.dateTimeModel = new Date().setTime(this.timeSimapModel * 1000);
        //		$("#txtSourceUnix").val(newDate.format('yyyy-MM-dd hh:mm:ss'));
      }
    },
    toTimeStamp() {
      if (StrConversion.isNull("日期", this.dateTimeModel)) {
        this.timeSimapModel = Date.parse(this.dateTimeModel) / 1000;
      }
    },
    couStrLength() {
      if (StrConversion.isNull("字符串", this.strDataModel)) {
        StrConversion.strLength(this);
      }
    },
    async getGUID() {
      let tem = "";
      const { data } = await this.$axios.get("/common/getGUID", {
        params: { amount: this.amount }
      });
      data.forEach(element => {
        tem += element + "\n";
      });
      this.guidDataModel = tem;
    },
    doFormat() {
      if (StrConversion.isNull("url参数", this.urlDataModel)) {
        this.urlResDataModel = StrConversion.urlSerialize(this.urlDataModel);
      //  console.log(tem.length);
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
          content:
            "在线工具,程序员,工具,开发人员工具,小工具,站长工具,代码格式化、压缩、加密、解密,下载链接转换"
        }
      ]
    };
  }
};
</script>

