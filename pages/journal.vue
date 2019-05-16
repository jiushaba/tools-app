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
import { CodeLog } from "@/config/api";
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
};
</script>

