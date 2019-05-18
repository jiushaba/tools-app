/**数据查询页面 */
<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="本机IP" name="LocalIp">
          <el-table :data="LocalIpData" border style="width: 100%" :show-header="false">
            <el-table-column prop="name" align="left" width="100"></el-table-column>
            <el-table-column prop="value" width="1566"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="IP归属地查询" name="IpBelongTo">
          <el-row>
            <el-col :span="24" style="    text-align: center">
              <el-input style="width:auto; margin-right:30px" v-model="ip" placeholder="请输入IP"></el-input>
              <el-button type="primary" @click="ipSerach()">搜索</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="text-align: center">
              <el-table :data="IpBelongToData" border style="width: 40%;   margin:40px auto">
                <el-table-column label="Ip" prop="ip" align="center" width="150"></el-table-column>
                <el-table-column label="国家" prop="country" align="center"></el-table-column>
                <el-table-column label="地区" prop="region" align="center"></el-table-column>
                <el-table-column label="城市" prop="city" align="center"></el-table-column>
                <el-table-column label="isp" prop="isp" align="center"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="域名归属地查询" name="RealmNameBelongTo">
          <el-row>
            <el-col :span="24" style="    text-align: center">
              <el-input style="width:auto; margin-right:30px" v-model="word" placeholder="请输入域名"></el-input>
              <el-button type="primary" @click="wordSerach()">搜索</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="text-align: center">
              <el-table :data="WordBelongToData" border style="width: 40%;   margin:40px auto">
                <el-table-column label="Ip" prop="ip" align="center" width="150"></el-table-column>
                <el-table-column label="国家" prop="country" align="center"></el-table-column>
                <el-table-column label="地区" prop="region" align="center"></el-table-column>
                <el-table-column label="城市" prop="city" align="center"></el-table-column>
                <el-table-column label="isp" prop="isp" align="center"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="手机归属地查询" name="PhoneBelongTo">
          <el-row>
            <el-col :span="24" style="    text-align: center">
              <el-input
                style="width:auto; margin-right:30px"
                v-model="mobile"
                placeholder="请输入手机号码"
              ></el-input>
              <el-button type="primary" @click="mobileSerach()">搜索</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="text-align: center">
              <el-table :data="PhoneBelongToData" border style="width: 40%;   margin:40px auto">
                <el-table-column label="号码段" prop="mobile" align="center" width="150"></el-table-column>
                <el-table-column label="省份" prop="province" align="center"></el-table-column>
                <el-table-column label="城市" prop="city" align="center"></el-table-column>
                <el-table-column label="运营商" prop="corp" align="center"></el-table-column>
                <el-table-column label="区号" prop="areaCode" align="center"></el-table-column>
                <el-table-column label="邮编" prop="postCode" align="center"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="历史上的今天" name="HistoryToday">
          <el-scrollbar style="height:600px;">
            <el-collapse v-model="HistoryTodayActiveName" accordion>
              <template v-for="(item,index) in HistoryTodayData">
                <el-collapse-item :title="item.title" :name="index">
                  <div style="padding:30px">{{item.content}}</div>
                </el-collapse-item>
              </template>
            </el-collapse>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>
<style >
</style>

<script>
import { DataQuery } from "@/config/api";
import { setTimeout } from "timers";
import { error } from "util";
export default {
  //   layout: 'blank',
  data() {
    return {
      HistoryTodayActiveName: "",
      word: "",
      ip: "",
      activeName: "",
      mobile: "",
      LocalIpData: [],
      IpBelongToData: [],
      WordBelongToData: [],
      PhoneBelongToData: [],
      HistoryTodayData: []
    };
  },
  mounted() {
    this.ip = returnCitySN["cip"];
    this.ipSerach();
    this.getHistoryToday();
    let userAgent = navigator.userAgent || window.navigator.userAgent; //取得浏览器的userAgent字符串
    this.activeName = this.$route.query.activeName || "LocalIp";
    this.LocalIpData.push({
      name: "本机IP",
      value: returnCitySN["cip"]
    });
    this.LocalIpData.push({
      name: "用户代理",
      value: userAgent
    });
    this.LocalIpData.push({
      name: "浏览器类型",
      value: this.getBrowerInfo().type
    });
    this.LocalIpData.push({
      name: "浏览器版本",
      value: this.getBrowerInfo().version
    });
    this.LocalIpData.push({
      name: "浏览器语言",
      value: this.getBrowerLanguage()
    });
    this.LocalIpData.push({
      name: "分辨率",
      value: window.screen.width + "x" + window.screen.height
    });
    this.LocalIpData.push({
      name: "操作系统",
      value: this.detectOS()
    });
  },
  methods: {
    async getHistoryToday() {
      const { data } = await this.$axios.get("/dataQuery/today");
      this.HistoryTodayData = data;
    },
    async mobileSerach() {
      if (this.mobile === "") {
        this.$notify({
          title: "警告",
          message: "请输入手机号",
          type: "warning"
        });
        return;
      }
      if (!/^1[34578]\d{9}$/.test(this.mobile)) {
        this.$notify({
          title: "警告",
          message: "手机号格式错误，请重新输入",
          type: "warning"
        });
        return;
      }
      const { data } = await this.$axios.get("/dataQuery/mobile", {
        params: { mobile: this.mobile }
      });
      this.PhoneBelongToData = [data];
    },
    async wordSerach() {
      if (this.word === "") {
        this.$notify({
          title: "警告",
          message: "请输入域名",
          type: "warning"
        });
        return;
      }
      if (
        !/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/.test(
          this.word
        )
      ) {
        this.$notify({
          title: "警告",
          message: "域名不规范，请重新输入",
          type: "warning"
        });
        return;
      }
      const { data } = await this.$axios.get("/dataQuery/word", {
        params: { word: this.word }
      });
      this.WordBelongToData = [data];
    },
    async ipSerach() {
      if (this.ip === "") {
        this.$notify({
          title: "警告",
          message: "请输入ip地址",
          type: "warning"
        });
        return;
      }
      if (
        this.ip &&
        !/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/.test(
          this.ip
        )
      ) {
        this.$notify({
          title: "警告",
          message: "ip地址不规范",
          type: "warning"
        });
        return;
      }
      const { data } = await this.$axios.get("/dataQuery/ip", {
        params: { ip: this.ip }
      });

      this.IpBelongToData = [data];
    },
    getBrowerInfo() {
      let browserObject;
      let userAgent = window.navigator.userAgent.toLowerCase();
      let browserType = "";
      let browserVersion = "";
      let isIE =
        userAgent.match(/msie/) != null || userAgent.match(/trident/) != null;
      // 浏览器类型-IE
      if (
        userAgent.match(/msie/) != null ||
        userAgent.match(/trident/) != null
      ) {
        browserObject = {
          type: "IE",
          version: this.getIeVersion()
        };
      }
      // 欧朋
      else if (window.opera || userAgent.indexOf("opr") > 0) {
        browserObject = {
          type: "欧朋",
          version: this.getOperaVersion(userAgent)
        };
      }
      // UC
      else if (userAgent.indexOf("ubrowser") > 0) {
        browserObject = {
          type: "UC",
          version: userAgent.match(/ubrowser\/([\d.]+)/)[1]
        };
      }
      // 百度
      else if (userAgent.indexOf("bidubrowser") > 0) {
        browserObject = {
          type: "百度",
          version: userAgent.match(/bidubrowser\/([\d.]+)/)[1]
        };
      }
      // 搜狗
      else if (
        userAgent.indexOf("metasr") > 0 ||
        userAgent.indexOf("se 2.x") > 0
      ) {
        browserObject = {
          type: "搜狗",
          version: userAgent.match(/metasr\/([\d.]+)/)[1]
        };
      }
      // QQ
      else if (userAgent.indexOf("tencenttraveler") > 0) {
        browserObject = {
          type: "QQ",
          version: userAgent.match(/tencenttraveler\/([\d.]+)/)[1]
        };
      }
      // QQ
      else if (userAgent.indexOf("qqbrowser") > 0) {
        browserObject = {
          type: "QQ",
          version: userAgent.match(/qqbrowser\/([\d.]+)/)[1]
        };
      }
      // 遨游
      else if (userAgent.indexOf("maxthon") > 0) {
        browserObject = {
          type: "遨游",
          version: userAgent.match(/maxthon\/([\d.]+)/)[1]
        };
      }
      // 火狐
      else if (userAgent.indexOf("firefox") > 0) {
        browserObject = {
          type: "火狐",
          version: userAgent.match(/firefox\/([\d.]+)/)[1]
        };
      }
      // edge
      else if (userAgent.indexOf("edge") > 0) {
        browserObject = {
          type: "Edge",
          version: userAgent.match(/edge\/([\d.]+)/)[1]
        };
      }
      // 谷歌/360
      else if (userAgent.indexOf("chrome") > 0) {
        if (this.validate360("type", "application/x360mmplugin")) {
          browserObject = {
            type: "360",
            version: userAgent.match(/chrome\/([\d.]+)/)[1]
          };
        } else {
          browserObject = {
            type: "谷歌",
            version: userAgent.match(/chrome\/([\d.]+)/)[1]
          };
        }
      }
      // 苹果
      else if (userAgent.indexOf("Safari") > -1) {
        browserObject = {
          type: "Safari",
          version: userAgent.match(/version\/([\d.]+)/)[1]
        };
      }
      return browserObject;
    },
    getIeVersion() {
      let IEMode = document.documentMode;
      let rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
      let ma = window.navigator.userAgent.toLowerCase();
      let match = rMsie.exec(ma);
      try {
        return match[2];
      } catch (e) {
        return IEMode;
      }
    },
    getBrowerLanguage() {
      //检测浏览器语言
      let currentLang = navigator.language; //判断除IE外其他浏览器使用语言
      if (!currentLang) {
        //判断IE浏览器使用语言
        currentLang = navigator.browserLanguage;
      }
      return currentLang;
    },
    /*
     * 获取oper浏览器版本
     */

    getOperaVersion(userAgent) {
      try {
        if (window.opera) {
          return userAgent.match(/opera.([\d.]+)/)[1];
        } else if (userAgent.indexOf("opr") > 0) {
          return userAgent.match(/opr\/([\d.]+)/)[1];
        }
      } catch (e) {
        return 0;
      }
    },
    /*
     * 判断是否为360浏览器
     */

    validate360(option, value) {
      let mimeTypes = window.navigator.mimeTypes;
      for (let mt in mimeTypes) {
        if (mimeTypes[mt][option] == value) {
          return true;
        }
      }
      return false;
    },
    detectOS() {
      var sUserAgent = navigator.userAgent;
      var isWin =
        navigator.platform == "Win32" || navigator.platform == "Windows";
      var isMac =
        navigator.platform == "Mac68K" ||
        navigator.platform == "MacPPC" ||
        navigator.platform == "Macintosh" ||
        navigator.platform == "MacIntel";
      if (isMac) return "Mac";
      var isUnix = navigator.platform == "X11" && !isWin && !isMac;
      if (isUnix) return "Unix";
      var isLinux = String(navigator.platform).indexOf("Linux") > -1;
      if (isLinux) return "Linux";
      if (isWin) {
        var isWin2K =
          sUserAgent.indexOf("Windows NT 5.0") > -1 ||
          sUserAgent.indexOf("Windows 2000") > -1;
        if (isWin2K) return "Win2000";
        var isWinXP =
          sUserAgent.indexOf("Windows NT 5.1") > -1 ||
          sUserAgent.indexOf("Windows XP") > -1;
        if (isWinXP) return "WinXP";
        var isWin2003 =
          sUserAgent.indexOf("Windows NT 5.2") > -1 ||
          sUserAgent.indexOf("Windows 2003") > -1;
        if (isWin2003) return "Win2003";
        var isWinVista =
          sUserAgent.indexOf("Windows NT 6.0") > -1 ||
          sUserAgent.indexOf("Windows Vista") > -1;
        if (isWinVista) return "WinVista";
        var isWin7 =
          sUserAgent.indexOf("Windows NT 6.1") > -1 ||
          sUserAgent.indexOf("Windows 7") > -1;
        if (isWin7) return "Win7";
        if (sUserAgent.indexOf("Windows NT 10.0") > -1) return "Windows 10";
      }
      return "other";
    },
    //ip地址正则验证
    validateIP(rule, value, callback) {
      if (value && "..." === value) {
        callback(new Error("请输入IP地址"));
      }
      if (
        value &&
        !/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/.test(
          value
        )
      ) {
        callback(new Error("IP地址不规范"));
      } else {
        callback();
      }
    },
    handleClick(tab, event) {
      this.$router.push("datequery?activeName=" + tab.name);
    }
  },
  head: {
    script: [{ src: "http://pv.sohu.com/cityjson?ie=utf-8" }]
  }
};
</script>

