<template>
  <el-row :gutter="20">
    <el-col v-for="(item,idx) in  rankList" :span="3" :key="idx">
      <div class="grid-content bg-purple">
        <nuxt-link :to="item.url">
          <el-card
            shadow="always"
            style=" display: flex;flex-direction: row;justify-content: center;text-align: center;height: 100%;"
          >
            <cry :callsNum="item.callsNum+''"></cry>
            <span class="inName">{{item.name}}</span>
          </el-card>
        </nuxt-link>
      </div>
    </el-col>
  </el-row>
</template>
<style scoped>
.bg-purple {
  margin-bottom: 38px;
}
.el-card__body {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  height: 100%;
}
.inName {
  display: block;
  margin-top: 10px;
}
</style>


<script>
import cry from "~/components/public/dynamiccircle.vue";
import { clearInterval } from "timers";
export default {
  components: {
    cry
  },
  data() {
    return {
      rankList: [],
      timer: null
    };
  },
  methods: {
    async reuDate() {
      const {
        status,
        data: { list }
      } = await this.$axios.get("/index/ranking");
      if (status === 200) {
        this.rankList = list;
      }
    },
    async function() {
      this.timer = setInterval(() => {
        this.reuDate();
      }, 5000);
    }
  },
  async mounted() {
    // this.reuDate();
    // this.function();
  },
  beforeDestroy: function() {
    window.clearInterval(this.timer);
    this.timer = null;
  },
  head() {
    return {
      title: '首页-程序员在线工具箱 zdlog.com',
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

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
