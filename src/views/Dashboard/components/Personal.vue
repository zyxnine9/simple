<template>
  <div class="dashboard-container">
    <div class="form">
      <h1>学术外联试用申请</h1>
      <el-form label-position="left" label-width="100px">
        <el-form-item label="申请人">
          <el-input v-model="user.username" :disabled="!submitable"></el-input>
        </el-form-item>
        <el-form-item label="所在单位">
          <el-input
            v-model="user.organization_topLevel"
            :disabled="!submitable"
          ></el-input>
        </el-form-item>
        <el-form-item label="所在部门">
          <el-input
            v-model="user.organization_secondLevel"
            :disabled="!submitable"
          ></el-input>
        </el-form-item>
        <el-form-item label="职务或岗位">
          <el-input v-model="user.career" :disabled="!submitable"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="user.mobile" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="user.idCard" :disabled="!submitable"></el-input>
        </el-form-item>
        <el-form-item label="申请理由">
          <el-input
            type="textarea"
            v-model="user.note"
            :disabled="!submitable"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="submitable" label="本人承诺" prop="type">
          <el-switch
            v-model="all"
            active-text="完成承诺"
          >
          </el-switch>
          <el-checkbox-group style="text-align: left" v-model="type">
            <el-checkbox
              label="不对外宣传和公开学术外联及 APP 相关事宜。"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="不利用学术外联 APP 进行危害国家安全、泄露国家秘密。"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="不利用学术外联 APP 进行颠覆国家政权、破坏国家统一。"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="不利用学术外联 APP 进行损害国家、社会、集体和第三方的荣誉和利益。"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="不利用学术外联 APP 进行煽动民族仇恨、民族歧视，破坏民族团结。"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="不利用学术外联 APP 进行侮辱或者诽谤他人，侵害他人合法权益。"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="不利用学术外联 APP 进行散布谣言，扰乱社会秩序，破坏社会稳定。"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="不利用学术外联 APP 进行破坏国家宗教政策，宣扬邪教和封建迷信。"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="不利用学术外联 APP 制作、复制、查阅和传播法律、行政法规禁止的内容。"
              name="type"
            ></el-checkbox>
            <el-checkbox
              label="自觉健康上网、文明上网。"
              name="type"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-button v-if="submitable" @click="submit" type="primary"
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
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      type: [],
      all: false,
      submitable: true,
      time: "",
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

  /**

 */
  methods: {
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
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async submit() {
      const data = {
        workOrderType: "1",
        idCard: this.user.idCard,
        username: this.user.username,
        career: this.user.career,
        organization_name: this.user.organization_topLevel,
        organization_topLevel: this.user.organization_topLevel,
        organization_secondLevel: this.user.organization_secondLevel,
        note: this.user.note,
      };
      if (this.type.length < 10) {
        alert("请勾选所有的承诺");
        return;
      }
      if (!this.user.idCard) {
        alert("请填写身份证号码");
        return;
      }
      if (this.submitable) {
        await request({
          url: "/api/CreateWorkOrder/",
          method: "post",
          data: data,
        })
          .then(() => {
            this.getUserInfo();
          })
          .catch((error) => {
            console.log(error);
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
      if (!this.submitable) this.getCreateTime();
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
</style>
