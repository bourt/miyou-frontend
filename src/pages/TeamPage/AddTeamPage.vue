
<style scoped>
  .add-team-container {
    box-sizing: border-box;
    padding: 10px 20px 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }

  .add-team-form {
    display: flex;
    flex-direction: column;
    flex-display: inline-block;
    justify-content: center;
    align-items: center;
  }

  .bar-txt {
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: var(--main-color);
  }

  .bar-txt .bar {
    margin-bottom: -8px;
    width: 100%;
    height: 1px;
    background-color: var(--main-color);
    z-index: 0;
  }

  .bar-txt .txt {
    z-index: 1000;
    display: inline;
    padding: 0 10px;
    background-color: #fff;
  }

  .add-team-form>div {
    margin-top: 14px;
  }

  .add-team-form .select-team-avatar {
    box-sizing: border-box;
    padding: 4px;
    border: 2px solid var(--main-color);
    border-radius: 50%;
  }

  .team-input {
    box-sizing: border-box;
    width: 100%;
  }

  .team-input>input {
    padding: 10px 0;
    width: 100%;
    font-size: 14px;
    text-indent: 1em;
    border: 1px solid #ddd
  }

  .create-time-other {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    width: 100%;
  }

  .select-expire-time {
    box-sizing: border-box;
    width: 100%;
  }

  .other-head {
    display: block;
    margin: 10px 0;
    font-size: 12px;
    color: #888;
  }

  .expire-time {
    height: 35px;
    background-color: var(--main-color);
    text-align: center;
    line-height: 35px;
    font-weight: bold;
    letter-spacing: 0.1em;
    color: #fff;
  }

  .select-max-people {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 35px;
  }

  .select-max-people button{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 35px;
    border: 0;
  }

  .select-max-people button::before {
    display: block;
    content: "";
    width: 50%;
    height: 2px;
    background-color: #777;
  }

  .select-max-people button:last-child::after {
    position: absolute;
    display: block;
    content: "";
    width: 2px;
    height: 50%;
    background-color: #777;
  }

  .select-max-people>div {
    margin: 0 5px;
    padding: 10px 0;
    width: 100%;
    font-size: 12px;
    text-align: center;
    border: 1px solid #ddd;
  }

  .team-status {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 35px;
  }

  .team-status>div {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 35px;
    font-size: 12px;
    color: #000;
    border: 2px solid #ddd;
    border-radius: 5px;
  }

  .team-status>.activeStatus {
    border: 2px solid var(--main-color);
    font-weight: bold;
  }

  .team-password {
    margin-top: 14px;
  }
</style>
<template>
  <div class="add-team-container">
    <div class="add-team-form">
      <div class="select-team-avatar">
        <img src="/src/assets/default-avatar.png" alt="">
      </div>
      <div class="bar-txt">
        <div class="bar"></div>
        <div class="txt">MAIN</div>
      </div>
      <div class="team-name team-input">
        <input type="text" placeholder="* 请输入队伍名" v-model="addTeamForm.name">
      </div>
      <div class="team-comment team-input">
        <input type="text" placeholder="* 请输入队伍描述" v-model="addTeamForm.description">
      </div>
      <div class="bar-txt">
        <div class="bar"></div>
        <div class="txt">OTHER</div>
      </div>
      <div class="create-time-other">
        <span class="other-head">过期时间</span>
        <div class="select-expire-time">
          <div class="expire-time" @click="show = true" >{{ addTeamForm.expireTime }}</div>
          <van-calendar color="#fbc002" v-model:show="show" @confirm="onConfirm" />
        </div>
        <span class="other-head">最大人数</span>
        <div class="select-max-people">
          <button @click="reduceNum"></button>
          <div>{{ addTeamForm.maxNum }}</div>
          <button @click="addNum"></button>
        </div>
        <span class="other-head">队伍状态</span>
        <div class="team-status">
          <div :class="item[1]" v-for="(item, index) in teamStatus" @click="selectTeamStatus(index)">{{ item[0] }}</div>
        </div>
        <div class="team-password team-input" v-show="isEncryption">
          <input type="password" placeholder="* 请输入队伍密码" v-model="addTeamForm.password">
        </div>
      </div>
    </div>
    <SaveBtn title="创建队伍" @click="createTeam"/>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, reactive, watch } from "vue";
import axios from '@/utils/axios';
import {type AddTeam} from '@/api/team';
import {useStore} from "@/store";

const store = useStore();

// 增加最大人数事件处理函数
const addNum = () => {
  if(addTeamForm.maxNum < 5) {
    addTeamForm.maxNum++;
  } else {
    addTeamForm.maxNum = 5;
    alert("已达最大人数");
  }

}

// 减少最大人数事件处理函数
const reduceNum = () => {
  if(addTeamForm.maxNum > 1) {
    addTeamForm.maxNum--;
  }else {
    addTeamForm.maxNum = 1;
    alert("已达最小人数");
  }
}

// 状态列表
let teamStatus = reactive([
  ["私有", 'activeStatus'],
  ["公开", ''],
  ["加密", '']
])

// 确定是否为加密房间
let isEncryption: Ref<boolean> = ref(true);

// 选择房间状态
const selectTeamStatus = (status: number) => {
  addTeamForm.status = status;
  status === 1 ? isEncryption.value = false : isEncryption.value = true;
}

// vant选择日历
const show = ref(false);
const formatDate = (date: Date) => `${date.getMonth() + 1}/${date.getDate()}`;
const onConfirm = (value: Date) => {
  show.value = false;
  addTeamForm.expireTime = `2023/${formatDate(value)} 16:40:50`;
};

// 收集添加团队数据
const addTeamForm: AddTeam = reactive({
  "description": "",
  "expireTime": "请选择过期时间",
  "maxNum": 1,
  "name": "",
  "password": "",
  "status": 0,
  "userId": store.userData!.id
})

watch(
    () => addTeamForm.status,
    (newValue, oldValue) => {
        if(oldValue !== undefined) {
          teamStatus[oldValue][1] = '';
        }
        teamStatus[newValue][1] = 'activeStatus';
    },
    { deep: true , immediate: true }
)

// 创建团队按钮点击事件函数
const createTeam = async() => {
  console.log(addTeamForm)
  try {
    const team = await axios.post('/team/add',{
      ...addTeamForm
    })
  } catch(e) {
    console.log(e)
  }
}
</script>