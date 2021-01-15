<template>
  <div>
    <el-container class="page" style="border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-menu-item @click="to('/dashboard/personal')" index="1-1"
            >个人</el-menu-item
          >
          <el-menu-item @click="to('/dashboard/verify')" index="1-2"
            >审核</el-menu-item
          >
          <el-menu-item @click="to('/dashboard/visithistory')" index="1-2"
            >访问记录</el-menu-item
          >
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        <router-view class="i-main" />
      </el-container>
    </el-container>
  </div>
</template>


<script>
// import NavBar from "./components/NavBar";
export default {
  // components: {
  //   "nav-bar": NavBar,
  // },
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