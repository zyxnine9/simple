<template>
  <div class="dashboard-container">
    <div v-loading="onSubmit" class="form">
      <h1>学术外联试用申请</h1>
      <div class="p-hint">
        <p>
          1、系统从申请人上传的身份证照片中提取姓名、身份证号信息，不需要申请人填写。
        </p>
        <p>
          2、填写的手机号码必须是申请人经过电信运营商实名认证，该号码将用于登陆“学术外联”的身份认证。
        </p>
      </div>
      <el-form label-position="left" label-width="100px">
        <el-form-item label="申请人">
          <el-input
            v-model="user.username"
            maxlength="20"
            placeholder="请上传身份证自动识别"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在单位">
          <el-input
            maxlength="20"
            v-model="user.organization_topLevel"
            :disabled="!submitable"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在部门">
          <el-input
            maxlength="20"
            v-model="user.organization_secondLevel"
            :disabled="!submitable"
          ></el-input>
        </el-form-item>
        <el-form-item label="职务或岗位">
          <el-input
            v-model="user.career"
            maxlength="20"
            :disabled="!submitable"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="user.mobile" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input
            v-model="user.idCard"
            placeholder="请上传身份证自动识别"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="申请理由">
          <el-input
            type="textarea"
            v-model="user.note"
            :disabled="!submitable"
            maxlength="200"
          ></el-input>
        </el-form-item>
        <div class="id-card">
          <input
            style="display: none"
            type="file"
            @change="onFileSelectedFront"
            ref="uploadFront"
          />
          <input
            style="display: none"
            type="file"
            @change="onFileSelectedBack"
            ref="uploadBack"
          />
          <div class="id-card">
            <img
              ref="front"
              title="身份证正面"
              alt="身份证正面"
              src="@/assets/front.svg"
              @click="frontClick"
            />
            <img
              ref="back"
              title="身份证背面"
              alt="身份证背面"
              @click="backClick"
              src="@/assets/back.svg"
            />
          </div>
        </div>
        <el-form-item label="本人承诺" prop="type">
          <el-switch v-model="all" v-if="submitable" active-text="完成所有承诺">
          </el-switch>
          <el-checkbox-group
            v-if="submitable"
            style="text-align: left"
            v-model="type"
          >
            <el-checkbox
              label="不对外宣传和公开学术外联及 APP 相关事宜。"
              name="type"
              :disabled="!submitable"
            ></el-checkbox>
            <el-checkbox
              label="不利用学术外联 APP 进行危害国家安全、泄露国家秘密。"
              name="type"
              :disabled="!submitable"
            ></el-checkbox>
            <el-checkbox
              label="不利用学术外联 APP 进行颠覆国家政权、破坏国家统一。"
              name="type"
              :disabled="!submitable"
            ></el-checkbox>
            <el-checkbox
              label="不利用学术外联 APP 进行损害国家、社会、集体和第三方的荣誉和利益。"
              name="type"
              :disabled="!submitable"
            ></el-checkbox>
            <el-checkbox
              label="不利用学术外联 APP 进行煽动民族仇恨、民族歧视，破坏民族团结。"
              name="type"
              :disabled="!submitable"
            ></el-checkbox>
            <el-checkbox
              label="不利用学术外联 APP 进行侮辱或者诽谤他人，侵害他人合法权益。"
              name="type"
              :disabled="!submitable"
            ></el-checkbox>
            <el-checkbox
              label="不利用学术外联 APP 进行散布谣言，扰乱社会秩序，破坏社会稳定。"
              name="type"
              :disabled="!submitable"
            ></el-checkbox>
            <el-checkbox
              label="不利用学术外联 APP 进行破坏国家宗教政策，宣扬邪教和封建迷信。"
              name="type"
              :disabled="!submitable"
            ></el-checkbox>
            <el-checkbox
              label="不利用学术外联 APP 制作、复制、查阅和传播法律、行政法规禁止的内容。"
              name="type"
              :disabled="!submitable"
            ></el-checkbox>
            <el-checkbox
              label="自觉健康上网、文明上网。"
              name="type"
              :disabled="!submitable"
            ></el-checkbox>
          </el-checkbox-group>
          <div class="p-commit" v-else>
            <p v-for="(e, i) in type" :key="i">{{ e }}</p>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align: center">
      <el-button
        v-if="submitable"
        :loading="onSubmit"
        @click="submit"
        type="primary"
        >确定</el-button
      >
      <el-alert
        v-else
        :closable="false"
        :title="`申请已经于 ${time} 提交。无法重复提交`"
        type="success"
        effect="dark"
      >
      </el-alert>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";
import { Message } from "element-ui";
export default {
  data() {
    return {
      type: [],
      all: false,
      submitable: true,
      time: "",
      onSubmit: false,
      idCardFront: null,
      idCardBack: null,
      user: {
        organization_topLevel: "",
        organization_secondLevel: "",
        mobile: "",
        career: "",
        username: "",
        note: "",
        idCard: "",
      },
      usernameEditable: true,
    };
  },
  methods: {
    onFileSelectedFront(event) {
      const reader = new FileReader();
      reader.onload = () => {
        this.$refs.front.src = reader.result;
      };
      if (!event.target.files[0]) {
        return;
      }

      let format = event.target.files[0].name.split(".").pop();
      if (format != "png" && format != "jpg" && format != "jpeg") {
        Message({
          type: "warning",
          message: "请身份证正面图片",
        });
        return;
      }
      if (event.target.files[0].size > 1024 * 1024) {
        Message({
          type: "warning",
          message: "图片大小不得超过1M",
        });
        return;
      }
      this.idCardFront = event.target.files[0];

      reader.readAsDataURL(this.idCardFront);
    },
    onFileSelectedBack(event) {
      const reader = new FileReader();
      reader.onload = () => {
        this.$refs.back.src = reader.result;
      };
      if (!event.target.files[0]) {
        return;
      }
      if (this.type.length < 10) {
        alert("请勾选所有的承诺");
        return;
      }
      if (!this.user.note) {
        alert("请填写申请理由");
        return;
      }
      if (!this.user.organization_topLevel) {
        alert("请填写所在单位");
        return;
      }
      if (!this.user.organization_secondLevel) {
        alert("请填写所在部门");
        return;
      }
      if (!this.user.career) {
        alert("请填写职务或岗位");
        return;
      }
      let format = event.target.files[0].name.split(".").pop();
      if (format != "png" && format != "jpg" && format != "jpeg") {
        Message({
          type: "warning",
          message: "请身份证背面图片",
        });
        return;
      }
      if (event.target.files[0].size > 1024 * 1024) {
        Message({
          type: "warning",
          message: "图片大小不得超过1M",
        });
        return;
      }
      this.idCardBack = event.target.files[0];

      reader.readAsDataURL(this.idCardBack);
    },
    backClick() {
      if (this.type.length < 10) {
        alert("请勾选所有的承诺");
        return;
      }
      if (!this.user.note) {
        alert("请填写申请理由");
        return;
      }
      if (!this.user.organization_topLevel) {
        alert("请填写所在单位");
        return;
      }
      if (!this.user.organization_secondLevel) {
        alert("请填写所在部门");
        return;
      }
      if (!this.user.career) {
        alert("请填写职务或岗位");
        return;
      }
      if (this.submitable) {
        this.$refs.uploadBack.click();
      }
    },
    frontClick() {
      if (this.type.length < 10) {
        alert("请勾选所有的承诺");
        return;
      }
      if (!this.user.note) {
        alert("请填写申请理由");
        return;
      }
      if (!this.user.organization_topLevel) {
        alert("请填写所在单位");
        return;
      }
      if (!this.user.organization_secondLevel) {
        alert("请填写所在部门");
        return;
      }
      if (!this.user.career) {
        alert("请填写职务或岗位");
        return;
      }
      if (this.submitable) {
        this.$refs.uploadFront.click();
      }
    },
    getUserInfo() {
      request({
        url: "/api/GetUserInfo/",
        method: "get",
      })
        .then((res) => {
          this.user = res.data;
          this.$cookies.set("user", res.data, "1h");
          this.$emit("setTitle");
          if (res.data.idCard) {
            this.submitable = false;
            this.$refs.front.src = res.data.idCardImg_1;
            this.$refs.back.src = res.data.idCardImg_2;
          }
        })
        .catch(() => {});
    },
    async submit() {
      const fd = new FormData();
      fd.append("workOrderType", 1);
      fd.append("idCard", this.user.idCard);
      fd.append("username", this.user.username);
      fd.append("career", this.user.career);
      fd.append("organization_name", this.user.organization_topLevel);
      fd.append("organization_topLevel", this.user.organization_topLevel);
      fd.append("organization_secondLevel", this.user.organization_secondLevel);
      fd.append("note", this.user.note);
      fd.append("idCardImg_1", this.idCardFront);
      fd.append("idCardImg_2", this.idCardBack);

      if (this.type.length < 10) {
        alert("请勾选所有的承诺");
        return;
      }
      if (!this.user.note) {
        alert("请填写申请理由");
        return;
      }
      if (!this.user.organization_topLevel) {
        alert("请填写所在单位");
        return;
      }
      if (!this.user.organization_secondLevel) {
        alert("请填写所在部门");
        return;
      }
      if (!this.user.career) {
        alert("请填写职务或岗位");
        return;
      }
      if (!this.idCardFront) {
        alert("请填写身份证正面图片");
        return;
      }
      if (!this.idCardBack) {
        alert("请填写身份证背面图片");
        return;
      }

      if (this.submitable) {
        this.onSubmit = true;
        await request({
          url: "/api/CreateWorkOrder/",
          method: "post",
          data: fd,
        })
          .then(() => {
            this.onSubmit = false;
            this.getUserInfo();
          })
          .catch((error) => {
            this.onSubmit = false;
            if (error.response) {
              if (error.response.status) {
                if (error.response.status == 406) {
                  Message({
                    message: "请重新上传身份证照片",
                    type: "warning",
                  });
                } else {
                  Message({
                    message: "服务器出错",
                    type: "warning",
                  });
                }
              }
            } else if (error.message.includes("timeout")) {
              Message({
                message: "网络超时",
                type: "warning",
              });
            } else {
              Message({
                message: "未知的错误发生了",
                type: "warning",
              });
            }
          });
      } else {
        alert("不能重复提交");
      }
    },
    getCreateTime() {
      request({
        url: "/api/QueryWorkOrder/",
        method: "get",
      })
        .then((res) => {
          return res.data.pop().id;
        })
        .then((id) => {
          return request({
            url: "/api/QueryWorkOrder/" + id + "/",
            method: "get",
          });
        })
        .then((res) => {
          try {
            this.time = res.data.createTime.slice(0, 10);
          } catch (error) {
            this.time = "之前";
          }
        });
    },
  },
  created() {
    this.getUserInfo();
  },
  watch: {
    submitable: function () {
      if (!this.submitable) {
        this.type = [
          "不对外宣传和公开学术外联及 APP 相关事宜。",
          "不利用学术外联 APP 进行危害国家安全、泄露国家秘密。",
          "不利用学术外联 APP 进行颠覆国家政权、破坏国家统一。",
          "不利用学术外联 APP 进行损害国家、社会、集体和第三方的荣誉和利益。",
          "不利用学术外联 APP 进行煽动民族仇恨、民族歧视，破坏民族团结。",
          "不利用学术外联 APP 进行侮辱或者诽谤他人，侵害他人合法权益。",
          "不利用学术外联 APP 进行散布谣言，扰乱社会秩序，破坏社会稳定。",
          "不利用学术外联 APP 进行破坏国家宗教政策，宣扬邪教和封建迷信。",
          "不利用学术外联 APP 制作、复制、查阅和传播法律、行政法规禁止的内容。",
          "自觉健康上网、文明上网。",
        ];
        this.getCreateTime();
      }
    },
    all: function () {
      if (this.all) {
        this.type = [
          "不对外宣传和公开学术外联及 APP 相关事宜。",
          "不利用学术外联 APP 进行危害国家安全、泄露国家秘密。",
          "不利用学术外联 APP 进行颠覆国家政权、破坏国家统一。",
          "不利用学术外联 APP 进行损害国家、社会、集体和第三方的荣誉和利益。",
          "不利用学术外联 APP 进行煽动民族仇恨、民族歧视，破坏民族团结。",
          "不利用学术外联 APP 进行侮辱或者诽谤他人，侵害他人合法权益。",
          "不利用学术外联 APP 进行散布谣言，扰乱社会秩序，破坏社会稳定。",
          "不利用学术外联 APP 进行破坏国家宗教政策，宣扬邪教和封建迷信。",
          "不利用学术外联 APP 制作、复制、查阅和传播法律、行政法规禁止的内容。",
          "自觉健康上网、文明上网。",
        ];
      } else {
        this.type = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.form {
  text-align: center;

  .form-item {
    display: flex;
    justify-content: space-between;
    .form-label {
      width: 100px;
    }
  }
}
.id-card {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  img {
    margin: 20px;
    display: block;
    height: 200px;
    width: 350px;
    border-radius: 8px;
    border: dashed black 1px;
    &:hover {
      cursor: pointer;
    }
  }
}
.p-hint {
  p {
    margin: 12px;
  }
  font-size: 0.8em;
  color: gray;
}
.p-commit {
  text-align: left;
  p {
    color: gray;
    font-weight: bold;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
}
</style>
