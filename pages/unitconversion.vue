/**单位换算 */
<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="进制换算" name="binary">
          <div style="height:600px; display:inline;line-height:50px;">
            <div class="text-center">
              <el-input style="width:560px" placeholder="十进制" v-model="binary.ten">
                <template slot="prepend">十进制</template>
              </el-input>
              <el-button @click="calculation(10)">计算</el-button>
            </div>
            <div class="text-center">
              <el-input style="width:560px" placeholder="二进制" v-model="binary.two">
                <template slot="prepend">二进制</template>
              </el-input>
              <el-button @click="calculation(2)">计算</el-button>
            </div>
            <div class="text-center">
              <el-input style="width:560px" placeholder="八进制" v-model="binary.eight">
                <template slot="prepend">八进制</template>
              </el-input>
              <el-button @click="calculation(8)">计算</el-button>
            </div>
            <div class="text-center">
              <el-input style="width:560px" placeholder="十六进制" v-model="binary.sixteen">
                <template slot="prepend">十六进制</template>
              </el-input>
              <el-button @click="calculation(16)">计算</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="时间换算" name="time">
          <div style="height:600px; display:inline;line-height:50px;">
            <div class="text-center">
              <el-input style="width:560px" placeholder="天" v-model="date.day">
                <template slot="prepend">天</template>
              </el-input>
              <el-button @click="dateCalculation('天')">计算</el-button>
            </div>
            <div class="text-center">
              <el-input style="width:560px" placeholder="时" v-model="date.time">
                <template slot="prepend">时</template>
              </el-input>
              <el-button @click="dateCalculation('时')">计算</el-button>
            </div>
            <div class="text-center">
              <el-input style="width:560px" placeholder="分" v-model="date.branch">
                <template slot="prepend">分</template>
              </el-input>
              <el-button @click="dateCalculation('分')">计算</el-button>
            </div>
            <div class="text-center">
              <el-input style="width:560px" placeholder="秒" v-model="date.second">
                <template slot="prepend">秒</template>
              </el-input>
              <el-button @click="dateCalculation('秒')">计算</el-button>
            </div>
            <div class="text-center">
              <el-input style="width:560px" placeholder="豪秒" v-model="date.Millisecond">
                <template slot="prepend">豪秒</template>
              </el-input>
              <el-button @click="dateCalculation('毫秒')">计算</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import { UnitConversion } from "@/assets/js/common";
export default {
  data() {
    return {
      headerTitle: "单位换算",
      activeName: "",
      binary: {
        ten: "",
        two: "",
        eight: "",
        sixteen: ""
      },
      date: {
        day: "",
        time: "",
        branch: "",
        second: "",
        Millisecond: ""
      },
      first: {
        ipVal: "",
        localName: ""
      }
    };
  },
  mounted() {
    this.activeName = this.$route.query.activeName || "binary";
  },
  methods: {
    handleClick(tab, event) {
      this.headerTitle = event.currentTarget.textContent;
      this.$router.push("unitconversion?activeName=" + tab.name);
    },
    calculation(type) {
      let ad =
        type == 10
          ? this.binary.ten
          : type == 2
          ? this.binary.two
          : type == 8
          ? this.binary.eight
          : type == 16
          ? this.binary.sixteen
          : "";
      this.binary = UnitConversion.calculation(type, ad);
    },
    dateCalculation(type) {
      let ad =
        type == "天"
          ? this.date.day
          : type == "时"
          ? this.date.time
          : type == "分"
          ? this.date.branch
          : type == "秒"
          ? this.date.second
          : type == "豪秒"
          ? this.date.Millisecond
          : "";
      this.date = UnitConversion.dateCalculation(type, ad);
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

