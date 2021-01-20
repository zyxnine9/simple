<template>
  <div>
    <el-container class="page" style="border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-menu-item @click="to('/dashboard/personal')" index="1-1">{{
            title
          }}</el-menu-item>
          <el-menu-item @click="to('/dashboard/verify')" index="1-2"
            >信用等级</el-menu-item
          >
          <el-menu-item @click="to('/dashboard/visithistory')" index="1-3"
            >审核进度</el-menu-item
          >
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>{{ name }}</span>
        </el-header>
        <router-view v-on:setTitle="setTitle" class="i-main" />
      </el-container>
    </el-container>
  </div>
</template>


<script>
// import NavBar from "./components/NavBar";
export default {
  data() {
    return {
      title: "个人申请",
      name: "",
    };
  },
  mounted() {
    try {
      this.name = this.$cookies.get("user").username
        ? this.$cookies.get("user").username
        : null;
    } catch (error) {
      this.name = "";
    }
    try {
      console.log((this.title = this.$cookies.get("user").idCard));
      this.title = this.$cookies.get("user").idCard ? "个人信息" : "个人申请";
    } catch (error) {
      this.title = "个人申请";
    }
    console.log(this.title);
  },
  methods: {
    to(url) {
      this.$router.push(url);
    },
    setTitle() {
      try {
        this.name = this.$cookies.get("user").username
          ? this.$cookies.get("user").username
          : null;
      } catch (error) {
        this.name = "";
      }

      try {
        this.title = this.$cookies.get("user").idCard ? "个人信息" : "个人申请";
      } catch (error) {
        this.title = "个人申请";
      }
    },
  },
};
</script>


<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.page {
  height: 100%;
  width: 100%;
}
.i-main {
  height: 100%;
}
</style>