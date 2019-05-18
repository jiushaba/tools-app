/**前端工具页面 */
<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="调色板" name="color">
          <el-row>
            <el-col :span="6">
              <el-row class="colorSelect" :style="{'border-color':  color}">
                <el-col :span="12" style=" text-align: center">
                  <el-color-picker v-model="color" show-alpha></el-color-picker>
                </el-col>
                <el-col :span="12">
                  <div class="colorPanel" :style="{'background-color': color}"></div>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="18">
              <el-row style="text-align: center;">
                <h2 class="content element-doc content">常用颜色</h2>
              </el-row>
              <template v-for="tem in commonColors">
                <div class="el-col el-col-4" style="padding-left: 6px; padding-right: 6px;">
                  <div class="demo-color-box" :style="{'background': tem.color}">
                    <div class="value">{{tem.color}}</div>
                  </div>
                </div>
              </template>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="RGB转16进制" name="hex">
          <el-row style="display: flex;align-items: center;">
            <el-col :span="12">
              <el-form ref="form" label-width="80px">
                <el-form-item label="R">
                  <el-input
                    type="number"
                    oninput="if(value>255)value=255;if(value<0)value=0"
                    v-model="r"
                  ></el-input>
                </el-form-item>
                <el-form-item label="G">
                  <el-input
                    type="number"
                    oninput="if(value>255)value=255;if(value<0)value=0"
                    v-model="g"
                  ></el-input>
                </el-form-item>
                <el-form-item label="B">
                  <el-input
                    type="number"
                    oninput="if(value>255)value=255;if(value<0)value=0"
                    v-model="b"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12" style="    margin-left: 100px;">
              <el-tooltip class="item" effect="dark" content="点击复制" placement="right">
                <div
                  class="el-col el-col-6 teg-color"
                  style="padding-left: 6px; padding-right: 6px;"
                  data-clipboard-target="#colorValue"
                  @click="copyColor()"
                >
                  <div class="demo-color-box" :style="{'background': hexColor}">
                    <div class="value" id="colorValue">{{hexColor}}</div>
                  </div>
                </div>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="px转rem" name="rem">
          <el-row style="height:500px;">
            <el-col :span="10">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>原始</span>
                </div>
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="pxData"></el-input>
                </el-scrollbar>
                <span>不处理Border</span>
                <el-switch v-model="noBorderValue" active-color="#13ce66" inactive-color="#909399"></el-switch>
              </el-card>
            </el-col>
            <!-- style=" text-align: center; height:100%; line-height: 500px;" -->
            <el-col
              :span="4"
              style=" text-align: center; height:100%;padding: 0 30px;padding-top: 150px;"
            >
              <div>
                <el-form>
                  <el-form-item label="1rem=">
                    <el-input placeholder v-model="tem" style="width:60%">
                      <template slot="append">px</template>
                    </el-input>
                  </el-form-item>
                </el-form>
                <el-button @click="pxToRemConvert">转换</el-button>
              </div>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>结果</span>
                </div>
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="remData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- <el-tab-pane label="在线MarkDown编辑器" name="markdown">在线MarkDown编辑器</el-tab-pane> -->
      </el-tabs>
    </el-col>
  </el-row>
</template>

<style scoped>
.tost {
  background-color: red;
}
.colorSelect {
  border: 2px solid crimson;
  height: 280px;
  border-radius: 8px;
  line-height: 280px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.colorPanel {
  width: 100px;
  height: 100px;
  background-color: rebeccapurple;
}
.demo-color-box {
  position: relative;
  border-radius: 4px;
  padding: 20px;
  margin: 5px 0;
  height: 114px;
  box-sizing: border-box;
  color: #fff;
  font-size: 14px;
  text-align: center;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.value {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>

<script>
import Clipboard from "clipboard";
export default {
  data() {
    return {
      noBorderValue: false,
      remData: "",
      pxData: ".value {\nposition: absolute;\ntop: 10px;\nright: 10px;\n}",
      tem: 10,
      r: 0,
      g: 0,
      b: 0,
      colorActiveName: "",
      activeName: "",
      color: "#F56C6C",
      hexColor: "",
      rgb: "",
      commonColors: [
        {
          title: "#409EFF",
          color: "#409EFF"
        },
        {
          title: "#67C23A",
          color: "#67C23A"
        },
        {
          title: "#E6A23C",
          color: "#E6A23C"
        },
        {
          title: "#F56C6C",
          color: "#F56C6C"
        },
        {
          title: "#909399",
          color: "#909399"
        },
        {
          title: "#000000",
          color: "#000000"
        },
        {
          title: "#191970",
          color: "#191970"
        },
        {
          title: "#ED9121",
          color: "#ED9121"
        },
        {
          title: "#663366",
          color: "#663366"
        }
      ]
    };
  },
  watch: {
    r(curVal, oldVal) {
      this.changeRgbColorToHex();
    },
    g(curVal, oldVal) {
      this.changeRgbColorToHex();
    },
    b(curVal, oldVal) {
      this.changeRgbColorToHex();
    },
    pxData(old) {
      this.pxToRemConvert();
    },
    tem(val) {
      this.pxToRemConvert();
    },
    noBorderValue(val) {
      this.pxToRemConvert();
    }
  },
  mounted() {
    this.activeName = this.$route.query.activeName || "color";
    this.changeRgbColorToHex();
    this.r = parseInt(255 * Math.random());
    this.g = parseInt(255 * Math.random());
    this.b = parseInt(255 * Math.random());
    this.pxToRemConvert();
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push("frontend?activeName=" + tab.name);
    },
    copyColor() {
      var clipboard = new Clipboard(".teg-color");
      clipboard.on("success", e => {
        this.$message({
          message: "复制成功！" + e.text,
          type: "success",
          customClass: "tost"
        });
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        this.$message("该浏览器不支持自动复制");
        // 释放内存
        clipboard.destroy();
      });
    },
    changeRgbColorToHex() {
      var rgbColor = "rgb(" + this.r + "," + this.g + "," + this.b + ")";
      var reg = /^rgb\((\s*[1-2]?[0-9]?[0-9]{1}\,)(\s*[1-2]?[0-9]?[0-9]{1}\,)(\s*[1-2]?[0-9]?[0-9]{1})\)$/;

      if (reg.test(rgbColor)) {
        var matches = reg.exec(rgbColor);
        var hexColor = "#";
        for (var i = 1; i <= 3; i++) {
          if (parseInt(matches[i]) < 16) {
            hexColor += "0" + parseInt(matches[i]).toString(16);
          } else {
            hexColor += parseInt(matches[i]).toString(16);
          }
        }
      }

      return (this.hexColor = hexColor);
    },
    pxToRemConvert() {
      let sou = this.pxData;
      var arr = sou.split("\n");
      var sb = "";
      for (var i = 0; i < arr.length; i++) {
        var line = arr[i];
        sb +=
          line.replace(/\d+px/g, px => {
            if (this.noBorderValue) {
              if (!/border:/gi.test(line)) {
                return parseInt(px) / parseInt(this.tem) + "rem";
              } else {
                return px;
              }
            } else {
              return parseInt(px) / parseInt(this.tem) + "rem";
            }
          }) + "\n";
      }
      this.remData = sb;
    }
  }
};
</script>

