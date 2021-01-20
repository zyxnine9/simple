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
        <el-form-item label="手机号">
          <el-input
            v-model="loginForm.mobile"
            placeholder="请输入手机号"
            clearable
          />
        </el-form-item>
        <el-form-item label="验证码">
          <div style="display: flex; flex-direction: row">
            <el-input
              v-model="loginForm.vertifyCode"
              placeholder="请输入验证码"
              clearable
            />
            <el-button
              class="btn"
              style="margin: 0 0 0 8px"
              @click="getCode"
              :disabled="!show"
              type="primary"
            >
              <span class="code-span" v-show="show">获取验证码</span>
              <span class="code-span" v-show="!show"> {{ count }} s后重试</span>
            </el-button>
          </div>
        </el-form-item>

        <div class="btn-group">
          <el-button class="login-btn" type="primary" @click="login"
            >登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import request from "@/utils/request";
import { Message } from "element-ui";
// import Vue from "vue";
import { setToken } from "@/utils/auth";
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
      show: true, //获取验证码和倒计时切换
      count: "", //数量
      timer: null, //时间
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
      const fd = new FormData();
      fd.append("mobile", this.loginForm.mobile);
      fd.append("code", this.loginForm.vertifyCode);
      axios
        .post("/api/SMSLogin/", fd)
        .then((res) => {
          console.log(res);
          this.$cookies.remove("user");
          setToken(res.data);
          this.$router.push("/dashboard");
        })
        .catch(() => {
          Message({
            type: "warning",
            message: "登录失败",
          });
        });
    },

    removeAllCookies() {
      for (const key of this.$cookies.keys()) {
        this.$cookies.remove(key);
      }
    },

    getCode() {
      if (this.loginForm.mobile !== null && this.loginForm.mobile !== "") {
        this, this.removeAllCookies();
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
          const datas = {
            mobile: this.loginForm.mobile,
            type: "CreateUser",
          };
          request
            .post("/api/SendSms/", datas)
            .then((res) => {
              // console.log(res);
              const responseCode = res.status;
              if (responseCode == 200) {
                Message({
                  message: "验证码已发送",
                  type: "success",
                  showClose: true,
                });
              }
            })
            .catch((error) => {
              console.log(error);
              Message({
                message: "验证码发送失败",
                type: "warning",
                showClose: true,
              });
            });
        }
      } else {
        Message({
          type: "warning",
          message: "手机号格式错误",
        });
      }
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
.btn-group {
  text-align: center;
  .login-btn {
    width: 40%;
    margin: 0 16px;
  }
}
</style>