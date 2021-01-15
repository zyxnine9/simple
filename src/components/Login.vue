<template>
  <div class="loginMain">
    <div class="tabBar">
      <span :style="Pcolor" @click="choseType(1)">个人</span>
      <span :style="Dcolor" @click="choseType(2)">单位</span>
    </div>
    <div class="loginBox">
      <el-form
        ref="loginform"
        :model="loginForm"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="用户名">
          <el-input v-model="loginForm.mobile" clearable />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" show-password />
        </el-form-item>
        <!-- <el-form-item label="验证码">
          <el-input v-model="loginForm.vertifyCode" clearable />
        </el-form-item> -->

        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="register">注册</el-button>
      </el-form>
    </div>
  </div>
</template>


<script>
import Vue from "vue"
import axios from "axios"
import { setToken } from "@/utils/auth"
export default {
  name: "",
  data() {
    return {
      type: 1,
      loginForm: {
        mobile: "",
        password: "",
        vertifyCode: "",
      },
    };
  },
  computed: {
    Pcolor() {
      return this.type == 1 ? "background:blue;color:white" : "";
    },

    Dcolor() {
      return this.type == 2 ? "background:blue;color:white" : "";
    },
  },
  methods: {
    login() {
      const fd = new FormData()
      fd.append("username", this.loginForm.mobile);
      fd.append("password", this.loginForm.password)
      axios.post('http://192.168.203.66:20002/get_token', fd)
      .then(res=>{
        Vue.$cookies.set("username",res.data.username,"3d")
        setToken(res.data.token)
        this.$router.push("/dashboard");
      })
      .catch(error=>{
        console.log(error)
      })
      
    },

    register() {
      console.log("register");
    },
    choseType(value) {
      this.type = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.loginMain {
  background: white;
  padding: 32px;
  border-radius: 8px;
}
.tabBar {
  margin: -32px -32px 32px -32px;
  text-align: center;

  span {
    display: inline-block;
    padding: 2%;
    width: 46%;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>