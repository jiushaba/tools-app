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
        <el-tab-pane label="xml生成实体" name="xml">xml生成实体</el-tab-pane>
        <el-tab-pane label="字符串生成实体" name="string">字符串生成实体</el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>


<script>
export default {
  //   layout: 'blank',
  data() {
    return {
      activeName: "",
      JsonStringData: "",
      resData: "",
      convertType: "",
      jsonConvertType: [
        {
          value: "c",
          label: "C#"
        },
        {
          value: "j",
          label: "JAVA"
        }
      ]
    };
  },
  watch: {
    convertType(val) {
      this.jsonGenerate();
    }
  },
  mounted() {
    this.activeName = this.$route.query.activeName || "json";
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push("entitygenerate?activeName=" + tab.name);
    },
    jsonGenerate() {
      var obj = eval("(" + text + ")");
      if (cate == "C#") {
        var sb = this.extractJson("Root", obj);
        while (jsonChilds != null && jsonChilds.length > 0) {
          var item = jsonChilds.pop();
          sb += "\r\n\r\n" + extractJson(item.name, item.value);
        }
        $("#txtDestJsonEntity").val(sb);
      } else if (cate == "Java") {
        var sb = extractJavaJson("Root", obj);
        while (jsonChilds != null && jsonChilds.length > 0) {
          var item = jsonChilds.pop();
          sb += "\r\n\r\n" + extractJavaJson(item.name, item.value);
        }
        $("#txtDestJsonEntity").val(sb);
      }
    },

    // json转实体
    extractJson(title, obj) {
      var sb = "public class " + title;
      sb += "\r\n{";
      var i = 0;
      for (var name in obj) {
        var val = obj[name];
        var type = typeof val;
        if (
          val == null ||
          type == "number" ||
          type == "string" ||
          type == "boolean"
        ) {
          if (type == "number") {
            type = "int";
          }
          if (type == "boolean") {
            type = "bool";
          }
          if (type == "object") {
            type = "string";
          }
          sb +=
            (i > 0 ? "\r\n" : "") +
            "\r\n\tpublic " +
            type +
            " " +
            name +
            " { get; set; }";
        } else {
          if (val.length == undefined) {
            sb +=
              (i > 0 ? "\r\n" : "") +
              "\r\n\tpublic " +
              name +
              " " +
              name +
              " { get; set; }";
            jsonChilds.push({
              name: name,
              value: val
            });
          } else {
            if (val[0].toString() != "[object Object]") {
              sb +=
                (i > 0 ? "\r\n" : "") +
                "\r\n\tpublic List<string> " +
                name +
                " { get; set; }";
            } else {
              sb +=
                (i > 0 ? "\r\n" : "") +
                "\r\n\tpublic List<" +
                name +
                "> " +
                name +
                " { get; set; }";
              jsonChilds.push({
                name: name,
                value: val[0]
              });
            }
          }
        }
        i++;
      }
      sb += "\r\n}";
      return sb;
    }
  }
};
</script>

