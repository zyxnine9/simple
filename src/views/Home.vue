<template>
  <div class="home">
    <login id="login"></login>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from "@/components/Login.vue";

export default {
  name: "Home",
  components: {
    login: Login,
  },
};
</script>

<style lang="scss" scoped>
.home {
  background-image: url("../assets/login_bg1.jpg");
  background-size: cover;
  background-position: center center;
  height: 100%;
}
#login{
  position: relative;
  top: 20%;
  left: 50%;
  right: 10%;
  overflow: hidden;
  width: 40%;
}
</style>