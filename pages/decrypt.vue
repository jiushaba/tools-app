/**加密解密 */
<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="Md5" name="md5">
          <el-row style="height:500px;">
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="md5EncryPtionData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
            <!-- style=" text-align: center; height:100%; line-height: 500px;" -->
            <el-col
              :span="4"
              style=" text-align: center; height:100%;padding: 0 30px;padding-top: 150px;"
            >
              <el-row>
                <el-button type="primkey" @click="md5EncryPtion">
                  <span>加密</span>
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="md5EncryPtionResData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Base64" name="base64">
          <el-row style="height:500px;">
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="Base64EncryPtionData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
            <!-- style=" text-align: center; height:100%; line-height: 500px;" -->
            <el-col
              :span="4"
              style=" text-align: center; height:100%;padding: 0 30px;padding-top: 150px;"
            >
              <el-row>
                <el-button type="primkey" @click="Base64EncryPtion">
                  <span>加密</span>
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </el-row>
              <el-row style="margin-top:30px">
                <el-button type="primkey" @click="Base64Decrypt">
                  <i class="el-icon-arrow-left"></i>
                  <span>解密</span>
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="Base64DecryptData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="图片转Base64" name="image64">
          <el-row style="height:500px;">
            <el-col :span="10" style=" height:100%">
              <el-card class="box-card" style="text-align: center;">
                <img
                  id="img64Preview"
                  :src="prView"
                  alt="图片预览"
                  v-loading.fullscreen.lock="fullscreenLoading"
                >
                <input
                  type="file"
                  ref="ad"
                  id="image64file"
                  @change="uploadImage"
                  style="visibility:hidden;"
                >
              </el-card>
            </el-col>
            <!-- style=" text-align: center; height:100%; line-height: 500px;" -->
            <el-col
              :span="4"
              style=" text-align: center; height:100%;padding: 0 30px;padding-top: 150px;"
            >
              <el-row>
                <el-button type="primkey" @click="imageBase64EncryPtion">
                  <span>加密</span>
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </el-row>
              <el-row style="margin-top:30px">
                <el-button type="primkey" @click="imageBase64Decrypt">
                  <i class="el-icon-arrow-left"></i>
                  <span>解密</span>
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-card
                class="box-card"
                v-loading.fullscreen.lock="fullscreenLoading"
                style="height:400px;"
              >
                <el-scrollbar style="height:380px;">
                  <el-input
                    style="height:380px;"
                    type="textarea"
                    autosize
                    v-model="Base64DecryptData"
                  ></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="文件Md5" name="filemd5">
          <el-row style="height: 600px;">
            <el-col :span="24">
              <el-row style="display: flex;justify-content: center;">
                <div class="el-upload-dragger" style="margin-top:60px;" @click="action">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    <em>点击上传</em>
                  </div>
                  <div class="el-upload__tip" slot="tip"></div>
                </div>
              </el-row>
              <el-row style="display: flex;justify-content: center;">
                <div style="width:480px;margin-top:60px;">
                  <el-table :data="fileMd5Data" border  :show-header="false"  v-loading="fileMd5Loading">
                    <el-table-column prop="name" width="80"></el-table-column>
                    <el-table-column prop="value"></el-table-column>
                  </el-table>
                </div>
              </el-row>
              <el-row>
                <input
                  type="file"
                  ref="uploadFileRef"
                  id="md5file"
                  style="visibility:hidden;"
                  @change="uploadFile"
                >
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<style scoped>
#img64Preview {
  width: 450px;
  height: 350px;
}
.info {
  width: 380px;
  border: 1px solid gray;
  background-color: #e4e7ed;
}
.info .name {
  border-right: 1px solid gray;
}
</style>

<script>
import md5 from "js-md5";
import { Base64 } from "js-base64";
import { Decrypt } from "@/assets/js/common";
import { setTimeout } from "timers";
export default {
  // layout:'blank'
  data() {
    return {
      headerTitle:'加密解密',
      fullscreenLoading: false,
      md5EncryPtionData: "",
      md5EncryPtionResData: "",
      Base64EncryPtionData: "",
      Base64DecryptData: "",
      prView: "/image/preview.png",
      isResult: true,
      fileMd5Loading:false,
      fileMd5Data: [
        {
          name: "文件：",
          value: ""
        },
        {
          name: "大小：",
          value: ""
        },
        {
          name: "md5：",
          value: ""
        }
      ],
      activeName: ""
    };
  },
  watch: {
    prView(newVal, oldVal) {}
  },
  mounted() {
    this.activeName = this.$route.query.activeName || "md5";
  },
  methods: {
    handleClick(tab, event) {
       this.headerTitle=event.currentTarget.textContent
      this.$router.push("decrypt?activeName=" + tab.name);
    },
    md5EncryPtion() {
      debugger;
      this.md5EncryPtionResData = md5(this.md5EncryPtionData);
    },
    Base64EncryPtion() {
      this.Base64DecryptData = Base64.encode(this.Base64EncryPtionData);
    },
    Base64Decrypt() {
      this.Base64EncryPtionData = Base64.decode(this.Base64DecryptData);
    },
    imageBase64EncryPtion() {
      this.$refs.ad.click();
    },
    async uploadImage() {
      await this.loadingAction();
      debugger;
      await Decrypt.readFile(this);
    },
    loadingAction() {
      this.fullscreenLoading = true;
    },
    imageBase64Decrypt() {
      Decrypt.isNull(this.Base64DecryptData);
      debugger;
      if (this.Base64DecryptData.indexOf("data:image/jpeg;base64,") >= 0) {
        this.prView = this.Base64DecryptData.trim();
      } else {
        this.prView = "data:image/jpeg;base64," + this.Base64DecryptData.trim();
      }
    },
    action() {
      this.$refs.uploadFileRef.click();
    },
    uploadFile() {
      this.fileMd5Loading=true;
      Decrypt.fileMd5(this)
    }
  },
   head() {
    return {
      title: this.headerTitle+'-程序员在线工具箱 zdlog.com',
      meta: [
       {
          hid: "description",
          name: "description",
          content: "常用工具,全角半角,js格式化,html格式化,css格式化,json格式化,xml格式化,sql格式化,历史上的今天,手机归属地查询,域名归属地查询,IP归属地查询,UrlEncode,Unicode,UTF-8,图片转Base64,ASCII,HtmlEncode,文件Md5,正则测试,正则参考,字符串生成实体,xml生成实体,json生成实体,在线调色板,px转rem,在线MarkDown编辑器,大小写转换,Unix时间戳,字符长度,GUID生成,URL参数格式化,程序员,在线工具,进制换算,时间换算,json格式化,ip查询,手机归属地查询,数据查询,前端工具,实体生成,编码解码,加密解密,字符转换,单位换算,代码格式化,正则表达式,二维码生成,条形码生成"          
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

