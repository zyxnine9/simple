<template>
  <div class="dashboard-container">
    <div class="form">
      <h1>学术外联试用申请</h1>
      <el-form label-position="left" label-width="100px">
        <el-form-item label="申请人">
          <el-input v-model="user.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所在部门">
          <el-input v-model="user.company" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="职务或岗位">
          <el-input v-model="user.career" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="user.mobile" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input
            v-model="user.idCard"
            :disabled="user.idCard ? true : false"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="原因说明">
          <el-input type="textarea" v-model="reason"></el-input>
        </el-form-item> -->
        <el-form-item label="本人承诺" prop="type">
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

        <el-button @click="submit" type="primary">确定</el-button>
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
      submitable: true,
      user: {
        company: "范德萨",
        mobile: 12321,
        career: "学术",
        username: "张三",
        idCard: "",
      },
    };
  },

  methods: {
    getUserInfo() {
      request({
        url: "/api/GetUserInfo/",
        method: "get",
      })
        .then((res) => {
          console.log(res);
          this.user = res.data;
          if (res.data.idCard) {
            this.submitable = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    submit() {
      const data = {
        workOrderType: "1",
        idCard: this.idCard,
      };
      if (this.submitable) {
        request({
          url: "/api/CreateWorkOrder/",
          method: "post",
          data: data,
        })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }else{
        alert("不能重复提交")
      }
    },
  },
  created() {
    this.getUserInfo();
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
