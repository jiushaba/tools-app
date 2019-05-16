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
import { Link } from "@/config/api";
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
};
</script>

