/**编码解码 */
<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="UrlEncode" name="url">
          <el-row style="height:500px;">
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="codeData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
            <!-- style=" text-align: center; height:100%; line-height: 500px;" -->
            <el-col
              :span="4"
              style=" text-align: center; height:100%;padding: 0 30px;padding-top: 150px;"
            >
              <el-row>
                <el-button type="primkey" @click="code">
                  <span>编码</span>
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </el-row>
              <el-row style="margin-top:30px">
                <el-button type="primkey" @click="deCode">
                  <i class="el-icon-arrow-left"></i>
                  <span>解码</span>
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="deCodeData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="HtmlEncode" name="html">
          <el-row style="height:500px;">
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="htmlCodeData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
            <!-- style=" text-align: center; height:100%; line-height: 500px;" -->
            <el-col
              :span="4"
              style=" text-align: center; height:100%;padding: 0 30px;padding-top: 150px;"
            >
              <el-row>
                <el-button type="primkey" @click="htmlCode">
                  <span>编码</span>
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </el-row>
              <el-row style="margin-top:30px">
                <el-button type="primkey" @click="htmlDeCode">
                  <i class="el-icon-arrow-left"></i>
                  <span>解码</span>
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="htmlDeCodeData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="ASCII" name="ascii">
          <el-row style="height:500px;">
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="ASCIICodeData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
            <!-- style=" text-align: center; height:100%; line-height: 500px;" -->
            <el-col
              :span="4"
              style=" text-align: center; height:100%;padding: 0 30px;padding-top: 150px;"
            >
              <el-row>
                <el-button type="primkey" @click="ASCIICode">
                  <span>编码</span>
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </el-row>
              <el-row style="margin-top:30px">
                <el-button type="primkey" @click="ASCIIDeCode">
                  <i class="el-icon-arrow-left"></i>
                  <span>解码</span>
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="ASCIIDeCodeData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="UTF-8" name="utf8">
          <el-row style="height:500px;">
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="utf8CodeData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
            <!-- style=" text-align: center; height:100%; line-height: 500px;" -->
            <el-col
              :span="4"
              style=" text-align: center; height:100%;padding: 0 30px;padding-top: 150px;"
            >
              <el-row>
                <el-button type="primkey" @click="utf8Code">
                  <span>编码</span>
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </el-row>
              <el-row style="margin-top:30px">
                <el-button type="primkey" @click="utf8DeCode">
                  <i class="el-icon-arrow-left"></i>
                  <span>解码</span>
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="utf8DeCodeData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="Unicode" name="unicode">
          <el-row style="height:500px;">
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="UnicodeCodeData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
            <!-- style=" text-align: center; height:100%; line-height: 500px;" -->
            <el-col
              :span="4"
              style=" text-align: center; height:100%;padding: 0 30px;padding-top: 150px;"
            >
              <el-row>
                <el-button type="primkey" @click="UnicodeCode">
                  <span>编码</span>
                  <i class="el-icon-arrow-right"></i>
                </el-button>
              </el-row>
              <el-row style="margin-top:30px">
                <el-button type="primkey" @click="UnicodeDeCode">
                  <i class="el-icon-arrow-left"></i>
                  <span>解码</span>
                </el-button>
              </el-row>
            </el-col>
            <el-col :span="10">
              <el-card class="box-card">
                <el-scrollbar style="height:400px;">
                  <el-input type="textarea" autosize v-model="UnicodeDeCodeData"></el-input>
                </el-scrollbar>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import { Decode } from "@/assets/js/common";
export default {
  //   layout: 'blank',
  data() {
    return {
      codeData: "",
      deCodeData: "",
      htmlCodeData: "",
      htmlDeCodeData: "",
      ASCIICodeData: "",
      ASCIIDeCodeData: "",
      utf8CodeData: "",
      utf8DeCodeData: "",
      UnicodeCodeData: "",
      UnicodeDeCodeData: "",
      activeName: ""
    };
  },
  mounted() {
    this.activeName = this.$route.query.activeName || "url";
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push("decode?activeName=" + tab.name);
    },
    code() {
      this.deCodeData = encodeURIComponent(this.codeData).toLowerCase();
    },
    deCode() {
      this.codeData = decodeURIComponent(this.deCodeData);
    },
    htmlCode() {
      this.htmlDeCodeData = Decode.htmlencode(this.htmlCodeData);
    },
    htmlDeCode() {
      this.htmlCodeData = Decode.htmldecode(this.htmlDeCodeData);
    },
    ASCIICode() {
      this.ASCIIDeCodeData = new Decode.Ascii().encode(this.ASCIICodeData);
    },
    ASCIIDeCode() {
      this.ASCIICodeData = new Decode.Ascii().decode(this.ASCIIDeCodeData);
    },
    utf8Code() {
      this.utf8DeCodeData = new Decode.UTF8().encode(this.utf8CodeData);
    },
    utf8DeCode() {
      this.utf8CodeData = new Decode.UTF8().decode(this.utf8DeCodeData);
    },
    UnicodeCode() {
      this.UnicodeDeCodeData = new Decode.Unicode().encode(
        this.UnicodeCodeData
      );
    },
    UnicodeDeCode() {
      this.UnicodeCodeData = new Decode.Unicode().decode(
        this.UnicodeDeCodeData
      );
    }
  }
};
</script>

