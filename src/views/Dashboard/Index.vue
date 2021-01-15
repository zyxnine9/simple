<template>
  <div>
    <el-container class="page" style="border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-menu-item @click="to('/dashboard/personal')" index="1-1"
            >个人</el-menu-item
          >
          <el-menu-item @click="to('/dashboard/verify')" index="1-2"
            >个人信用等级</el-menu-item
          >
          <el-menu-item @click="to('/dashboard/visithistory')" index="1-3"
            >访问记录</el-menu-item
          >
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          
          <span>{{name}}</span>
        </el-header>
        <router-view class="i-main" />
      </el-container>
    </el-container>
  </div>
</template>


<script>
// import NavBar from "./components/NavBar";
import Vue from "vue"
export default {
  created(){
    this.name = Vue.$cookies.get("username")
  },
  methods: {
    to(url) {
      this.$router.push(url);
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