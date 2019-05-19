/**开发日志 */
<template>
  <el-row :gutter="20">
    <div class="block">
      <el-scrollbar style="height:100%">
        <el-timeline>
          <template v-for="item in codeLogData">
            <el-timeline-item :timestamp="item.timeStamp" placement="top">
              <el-card>
                <h4>{{item.theme}}</h4>
                <p>{{item.content}}</p>
              </el-card>
            </el-timeline-item>
          </template>
        </el-timeline>
      </el-scrollbar>
    </div>
  </el-row>
</template>
<style scoped>
.title {
  margin-bottom: 10px;
  font-size: initial;
}
.block {
  width: 600px;
  height: 700px;
}
.el-scrollbar__wrap {
  overflow-x: hidden !important;
}
.is-horizontal {
  display: none;
}
</style>

<script>
export default {
  // layout: 'blank',
  data() {
    return {
      codeLogData: []
    };
  },
  mounted() {
    this.getCodeLogData();
  },
  methods: {
    async getCodeLogData() {
      const { data } = await this.$axios.get("/codeLog/list");
      this.codeLogData = data;
    }
  }
  , head() {
    return {
      title: '开发日志-程序员在线工具箱 zdlog.com',
      meta: [
         {
          hid: "description",
          name: "description",
          content: "常用工具,全角半角,js格式化,html格式化,css格式化,json格式化,xml格式化,sql格式化,历史上的今天,手机归属地查询,域名归属地查询,IP归属地查询,UrlEncode,Unicode,UTF-8,图片转Base64,ASCII,HtmlEncode,文件Md5,正则测试,正则参考,字符串生成实体,xml生成实体,json生成实体,在线调色板,px转rem,在线MarkDown编辑器,大小写转换,Unix时间戳,字符长度,GUID生成,URL参数格式化,程序员,在线工具,进制换算,时间换算,json格式化,ip查询,手机归属地查询,数据查询,前端工具,实体生成,编码解码,加密解密,字符转换,单位换算,代码格式化,正则表达式,二维码生成,条形码生成"          
        },
           {
          hid: "KeyWords",
          name: "KeyWords",
          content: "常用工具,全角半角,js格式化,html格式化,css格式化,json格式化,xml格式化,sql格式化,历史上的今天,手机归属地查询,域名归属地查询,IP归属地查询,UrlEncode,Unicode,UTF-8,图片转Base64,ASCII,HtmlEncode,文件Md5,正则测试,正则参考,字符串生成实体,xml生成实体,json生成实体,在线调色板,px转rem,在线MarkDown编辑器,大小写转换,Unix时间戳,字符长度,GUID生成,URL参数格式化,程序员,在线工具,进制换算,时间换算,json格式化,ip查询,手机归属地查询,数据查询,前端工具,实体生成,编码解码,加密解密,字符转换,单位换算,代码格式化,正则表达式,二维码生成,条形码生成"          
        }
      ]
    };
  }
};
</script>

