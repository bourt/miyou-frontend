<template>
  <div class="homeContainer">
    <div class="user" v-for="(item, index) in userList" :key="index">
      <div class="user-bgc">
        <img :src="item.avatarUrl" alt="">
      </div>
      <h2 class="username">{{ item.username || item.userAccount }}</h2>
      <div class="user-info">
        <div class="tags">
          <span v-for="tag in item.tags">{{ tag }}</span>
        </div>
        <div class="contact-me">
          <img src="./images/phone.png" alt="">
          <span>联系我</span>
          <img src="./images/right.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, onMounted, reactive } from 'vue';
import axios from '@/utils/axios';
import { type UserInfo} from "@/api/user";

let userList: Array<UserInfo> = reactive([]);

onMounted(async() => {
  try {
    let tempUserList = await axios.get('/user/match?num=10') as Array<UserInfo>
    tempUserList.filter((item)=> {
      item.tags = eval(item.tags!)
      userList.push(item);
    })
  } catch (e: any) {
    throw new Error(e)
  }
})
</script>

<style scoped>
.homeContainer {
  padding: 0 10px;
  height: 100%;
  overflow-y: auto;
}

.homeContainer::-webkit-scrollbar {
  display: none;
}

.user {
  position: relative;
  box-sizing: border-box;
  display: flex;
  margin: 10px 0 0;
  padding: 10px;
  width: 100%;
  height: 110px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 5px #eee;
  overflow: hidden;
}

.user:last-child {
  margin-bottom: 10px;
}

.user-bgc {
  box-sizing: border-box;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.user-bgc img {
  width: inherit;
  height: inherit;
}

.username {
  margin: 10px 0 0 10px;
  color: #512c0a;
  font-size: 16px;
  font-weight: 700;
}

.user-info {
  position: absolute;
  right: 0;
  bottom: 0;
  width: calc(100% - 110px);
  height: 55%;
  /* background-image: linear-gradient(to bottom, transparent, #fcc021); */
  border-radius: 5px;
}

.tags {
  box-sizing: border-box;
  padding: 10px;
  width: calc(100% - 80px);
  height: 100%;
  overflow: hidden;
}

.tags span {
  float: left;
  margin: 0 5px 5px 0;
  padding: 0 4px;
  font-size: 12px;
  color: #e67811;
  border: 2px solid #e67811;
}

.contact-me {
  box-sizing: border-box;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: 0 3px;
  width: 80px;
  height: 35px;
  font-size: 12px;
  font-weight: 700;
  color: #512c0a;
  background-color: #fdd633;
  border-radius: 50px 0 0 50px;
  box-shadow: 2px 2px 4px #512c0a20
}

.contact-me img {
  width: 14px;
  font-size: 0;
}

.contact-me img:last-child {
  width: 10px;
}
</style>