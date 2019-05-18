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
.codeing{
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
  }
};
</script>

