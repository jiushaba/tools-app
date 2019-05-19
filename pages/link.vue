/**友情链接页面 */
<template>
  <el-row :gutter="20">
    <el-col :span="8" v-for="(item,idx) in linkList" :key="idx">
      <a :href="item.url" target="_blank">
        <el-tag round>{{item.name}}-{{item.dec}}</el-tag>
      </a>
    </el-col>
    <div class="apply-link">
      <el-button round @click="dialogFormVisible = true">申请友链</el-button>
    </div>
    <transition name="el-zoom-in-bottom">
      <el-dialog
        title="申请友链"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        width="38%"
        :show-close="false"
      >
        <el-form :model="applyForm" ref="applyForm" :rules="rules">
          <el-form-item label="网站名称" label-width="100px" prop="name">
            <el-input v-model="applyForm.name" placeholder="请输入网站名称"></el-input>
          </el-form-item>
          <el-form-item label="网站logo" label-width="100px" prop="logo">
            <el-input placeholder="请输入网站LOGO远程地址" v-model="applyForm.logo"></el-input>
          </el-form-item>
          <el-form-item label="网站地址" label-width="100px" prop="website">
            <el-input v-model="applyForm.website" placeholder="请输入网站地址"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" label-width="100px" prop="contact">
            <el-input v-model="applyForm.contact" placeholder="请输入联系方式(微信/QQ/手机)"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button @click="resetForm('applyForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('applyForm')">立即申请</el-button>
        </div>
      </el-dialog>
    </transition>
  </el-row>
</template>

<style scoped>
.el-col {
  text-align: center;
}
.apply-link {
  position: fixed;
  bottom: 130px;
  right: 30px;
}
</style>

<script>
export default {
  data() {
    return {
      linkList: [],
      dialogFormVisible: false,
      applyForm: {
        name: "",
        logo: "",
        website: "",
        contact: ""
      },
      rules: {
        name: [{ required: true, message: "请填写网站名称", trigger: "blur" }],
        logo: [
          { required: true, message: "请填写网站LOGO远程地址", trigger: "blur" }
        ],
        website: [
          { required: true, message: "请填写网站地址", trigger: "blur" }
        ],
        contact: [
          { required: true, message: "请填写联系方式", trigger: "blur" }
        ]
      }
    };
  },
  //   layout: 'blank',
  async mounted() {
     const {list} =await this.$axios.get('/friendlink/list')
     this.linkList = list;
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
  , head() {
    return {
      title: '友情链接-程序员在线工具箱 zdlog.com',
      meta: [
      {
          hid: "description",
          name: "description",
          content: "常用工具,全角半角,js格式化,html格式化,css格式化,json格式化,xml格式化,sql格式化,历史上的今天,手机归属地查询,域名归属地查询,IP归属地查询,UrlEncode,Unicode,UTF-8,图片转Base64,ASCII,HtmlEncode,文件Md5,正则测试,正则参考,字符串生成实体,xml生成实体,json生成实体,在线调色板,px转rem,在线MarkDown编辑器,大小写转换,Unix时间戳,字符长度,GUID生成,URL参数格式化,程序员,在线工具,进制换算,时间换算,json格式化,ip查询,手机归属地查询,数据查询,前端工具,实体生成,编码解码,加密解密,字符转换,单位换算,代码格式化,正则表达式,二维码生成,条形码生成"          
        }
      ]
    };
  }
};
</script>

