<!--
 *反馈页面
 -->
<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<style scoped>
.el-row{
    text-align: center
}
</style>

<script>
export default {
  // layout: 'blank',
  data() {
    return {
      ruleForm: {
        title: "",
        desc: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        desc: [{ required: true, message: "请填写反馈内容", trigger: "blur" }]
      }
    };
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

