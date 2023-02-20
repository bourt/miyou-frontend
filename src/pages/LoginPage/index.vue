<template>
  <div class="login-container-bg" @keydown="userLogin($event)">
    <div class="login-container">
      <div class="bg-pattern">
        <div></div>
        <div></div>
      </div>
      <h2 class="login-title">LOGIN</h2>
      <form class="my-login">
        <div class="my-username my-loginInput">
          <input type="text" placeholder="用户名" v-model="loginData.userAccount">
        </div>
        <div class="my-password my-loginInput">
          <input type="password" placeholder="密码" v-model="loginData.userPassword">
        </div>
      </form>
      <div class="my-btn">
        <button type="button" @click="userLogin">登录</button>
      </div>
      <div class="login-other">
        <router-link class="login-other-l" to="/register">没有账号?立即注册</router-link>
        <a class="login-other-r">忘记密码?</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/utils/axios";
import { useStore } from '@/store/index';
import { type UserInfo } from '@/api/user';

const route = useRoute()
const router = useRouter()
const store = useStore()

let loginData = reactive({
  userAccount: route.query.userAccount ? route.query.userAccount : "",
  userPassword: ""
})

function userLogin (event: any) {
  if(event.keyCode === 13 || event.type === 'click') {
    let { userAccount, userPassword } = loginData
    axios({
      method: "post",
      url: "/user/login",
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credentials':'true',
        'Content-Type': 'application/json'
      },
      data: {
        userAccount,
        userPassword
      }
    })
        .then(function(response) {
          store.addUser(response as unknown as UserInfo)
          router.push({
            path: "/",
            name: "home"
          })
        })
        .catch(function(error) {
          console.warn(error)
          loginData.userAccount = '';
          loginData.userPassword = '';
        })
  }
}
</script>

<style scoped>
.login-container-bg {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  width: 100%;
  min-height: 100%;
  background-color: #fff;
}

.login-container {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  height: 400px;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.08);
  border-top-right-radius: 50px;
  border-bottom-left-radius: 50px;
  overflow: hidden;
}

.bg-pattern {
  position: absolute;
  top: 0;
  right: -20px;
}

.bg-pattern>div{
  width: 120px;
  height: 50px;
  background-color: var(--main-color);
  border-radius: 100px;
  transform: rotate(-45deg);
}

.bg-pattern>div:first-child {
  background-color: rgba(251, 192, 2, 0.53);
}

.login-title {
  font-weight: 700;
  font-size: 24px;
  color: var(--main-color);
}

.my-loginInput {
  margin: 30px 0;
}

.my-loginInput input {
  width: 100%;
  text-indent: 0.5em;
  flex-grow: 1;
  font-size: 14px;
  border: 0;
  border-bottom: 2px solid #eee;
}

.my-loginInput input::-webkit-input-placeholder {
  color: #bbb;
}

.my-btn > button {
  padding: 8px;
  width: 100%;
  background-color: var(--main-color);
  color: #fff;
  border: 0;
  border-radius: 50px;
}

.login-other {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.login-other>a {
  color: #bbb;
}
</style>