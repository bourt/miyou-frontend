<template>
  <header class="login-header">
    <div class="avatar-border">
      <div class="avatar-container">
        <img alt="" src="/src/pages/images/avatar-default.png">
      </div>
    </div>
    <div class="login">
      <button class="login-btn">登录/注册</button>
      <span class="login-msg">登录即可为您匹配用户啦</span>
    </div>
  </header>
  <section>

  </section>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.login-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fff;
}

.avatar-border {
  box-sizing: border-box;
  padding: 4px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid var(--main-color);
}

.avatar-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
}

.avatar-container>img {
  width: 100%;
}

.login {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.login .login-btn {
  margin-bottom: 5px;
  padding: 7px 14px 5px;
  width: 90px;
  background-color: var(--main-color);
  font-size: 14px;
  border: 0;
  border-radius: 50px;
}

.login .login-msg {
  font-size: 12px;
  color: #999;
}
</style>