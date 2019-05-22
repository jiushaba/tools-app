/**二维码生成 */
<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="二维码生成" name="create">
          <el-row :gutter="20" class="create-layout">
            <el-col :span="10" class="create-layout">
              <el-form label-position="left" label-width="80px" class="create-layout-content">
                <el-form-item label="内容">
                  <el-input v-model="genForm.content"></el-input>
                </el-form-item>
                <el-form-item label="纠错">
                  <el-select
                    v-model="genForm.errorCorrection"
                    placeholder="请选择"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="item in errorCorrectionOptions"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="大小">
                  <el-input v-model="genForm.size"></el-input>
                </el-form-item>
                <el-form-item label="边距">
                  <el-select v-model="genForm.margin" placeholder="请选择" style="width: 100%">
                    <el-option
                      v-for="(item,index) in 11"
                      :key="index"
                      :label="index"
                      :value="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="4">
              <el-button @click="getQr">
                生成
                <i class="el-icon-arrow-right"></i>
              </el-button>
            </el-col>
            <el-col :span="10" class="button-layout">
              <div :class="[genForm.margin!=0&&genForm.content!='' ? 'qr-layout' : '']">
                <img :src="genQrDataModel" alt>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<style>
.create-layout {
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-layout {
  display: flex;
  justify-content: center;
  align-items: center;
}
.create-layout-content {
  width: 60%;
}
.qr-layout {
  border: 1px solid gainsboro;
}
</style>

<script>
import { QrGenerate } from "@/assets/js/common";
export default {
  data() {
    return {
      activeName: "",
      genQrDataModel: "",
      genForm: {
        content: "https://www.zdlog.com/link",
        size: "200",
        errorCorrection: "L",
        margin: "0"
      },
      errorCorrectionOptions: [
        {
          name: "L (Low)	~7%",
          value: "L"
        },
        {
          name: "M (Medium)	~15%",
          value: "M"
        },
        {
          name: "Q (Quartile)	~25%",
          value: "Q"
        },
        {
          name: "H (High)	~30%",
          value: "H"
        }
      ]
    };
  },
  mounted() {
    this.activeName = this.$route.query.activeName || "create";
    this.getQr();
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push("qrgenerate?activeName=" + tab.name);
    },
    async getQr() {
      let obj = await QrGenerate.getQr(
        this.genForm.content,
        this.genForm.errorCorrection,
        this.genForm.margin,
        this.genForm.size
      );
      this.genQrDataModel = obj;
    }
  },
  head() {
    return {
      title: "二维码生成-程序员在线工具箱 zdlog.com",
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
