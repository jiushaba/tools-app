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
import { Menu } from "@/config/api";
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
