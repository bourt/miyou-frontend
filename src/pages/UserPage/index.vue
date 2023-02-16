<template>
  <header class="user-header">
    <div class="avatar-border">
      <div class="avatar-container">
        <img alt="" src="/src/assets/default-avatar.png">
      </div>
    </div>
    <div class="user-info" @click="handlerRevise(isLogin)">
      <div class="not-login" v-if="!isLogin">
        <router-link class="login-btn" to="/login">登录/注册</router-link>
        <span class="login-msg">登录即可为您匹配用户啦</span>
      </div>
      <div class="is-login" v-else>
        <h2 class="username">
          <i>Hi，</i>{{ userData.username || userData.userAccount }}<span class="edit-user-info"><van-icon name="edit" /></span>
        </h2>
      </div>
    </div>
  </header>
  <section class="user-info-container">
    <van-cell-group inset>
      <van-cell title="性别" :value="userData.gender || '未设置'" />
      <van-cell title="电话" :value="userData.phone || '未设置'" />
      <van-cell title="邮箱" :value="userData.email || '未设置'" />
      <van-cell title="编号" :value="userData.planetCode || '未设置'" />
    </van-cell-group>
  </section>
</template>

<script lang="ts" setup>
import { ref, reactive, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/index'

const router = useRouter()
const store = useStore()

let userData = reactive(store.userData)

let isLogin: Ref<boolean> = ref(false)

// 修改用户数据函数
const handlerRevise = (isLogin: boolean) => {
  if (!isLogin) {
    return
  }
  router.push({
    path: "/user-modify"
  })
}

if(Object.keys(userData).length) {
  isLogin.value = true;
}
</script>

<style scoped>
.user-header {
  display: flex;
  padding: 20px;
  margin-bottom: 10px;
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

.user-info {
  margin-left: 20px;
  height: 60px;
}

.user-info .not-login {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: inherit;
}

.user-info .is-login {
  margin-top: 15px;
  font-size: 16px;
}

.user-info .login-btn {
  box-sizing: border-box;
  display: block;
  margin-bottom: 5px;
  padding: 7px 14px 5px;
  width: 90px;
  background-color: var(--main-color);
  font-size: 14px;
  color: #fff;
  border: 0;
  border-radius: 50px;
}

.user-info .login-msg {
  font-size: 12px;
  color: #999;
}

.is-login .username {
  font-size: 18px;
  color: #000;
}

.is-login .username i {
  color: var(--main-color);
  font-weight: bold;
}

.is-login .username .edit-user-info {
  margin-left: 10px;
}
</style>