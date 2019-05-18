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
import { setTimeout } from "timers";
import { DateQuery } from "@/assets/js/common";
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
    this.activeName = this.$route.query.activeName || "LocalIp";
    this.ip = returnCitySN["cip"];
    this.ipSerach();
    this.getHistoryToday();
    let userAgent = navigator.userAgent || window.navigator.userAgent; //取得浏览器的userAgent字符串
    let browerInfo = DateQuery.getBrowerInfo(userAgent);
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
      value: browerInfo.type
    });
    this.LocalIpData.push({
      name: "浏览器版本",
      value: browerInfo.version
    });
    this.LocalIpData.push({
      name: "浏览器语言",
      value: DateQuery.getBrowerLanguage()
    });
    this.LocalIpData.push({
      name: "分辨率",
      value: window.screen.width + "x" + window.screen.height
    });
    this.LocalIpData.push({
      name: "操作系统",
      value: DateQuery.detectOS()
    });
  },
  methods: {
    async getHistoryToday() {
      const { data } = await this.$axios.get("/dataQuery/today");
      this.HistoryTodayData = data;
    },
    async mobileSerach() {
      if (DateQuery.checkPhone(this.mobile)) {
        const { data } = await this.$axios.get("/dataQuery/mobile", {
          params: { mobile: this.mobile }
        });
        this.PhoneBelongToData = [data];
      }
    },
    async wordSerach() {
      if (DateQuery.checkWord(this.word)) {
        const { data } = await this.$axios.get("/dataQuery/word", {
          params: { word: this.word }
        });
        this.WordBelongToData = [data];
      }
    },
    async ipSerach() {
      if (DateQuery.checkIp(this.ip)) {
        const { data } = await this.$axios.get("/dataQuery/ip", {
          params: { ip: this.ip }
        });
        this.IpBelongToData = [data];
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

