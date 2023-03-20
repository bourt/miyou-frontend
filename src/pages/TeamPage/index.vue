<template>
  <div class="team-container">
    <router-link class="add-team" to="/add-team">
      <img src="./images/addteam.png" alt="">
    </router-link>
    <div class="team-search">
      <van-search v-model="value" shape="round" placeholder="请输入队伍名称" @search="onSearch" />
    </div>
    <div class="setWay-container">
      <div class="setWay">
        <span class="way-title">
          <img src="./images/modul.png" alt="">
          <span>请选择队伍模式</span>
        </span>
        <div class="public-private">
          <span @click="changeBgc(0, $event)">我的</span>
          <span :class="oldStatus ? '' : 'active-bgc'" @click="changeBgc(1, $event)">公开</span>
          <span @click="changeBgc(2, $event)">加密</span>
        </div>
      </div>
      <div class="team-content">
        <div class="team" v-for="(item, index) in currentList" :key="index">
          <div class="team-left">
            <div class="team-left-top">
              <div class="team-l-l">
                <img src="@/assets/avatar1.png" alt="" />
              </div>
              <div class="team-l-r">
                <div class="team-title">
                  <img src="./images/team-title.png" alt="">
                  <span>{{ item.name }}</span>
                </div>
                <div class="team-comment">
                  <img src="./images/comment.png" alt="">
                  <i>{{ item.description }}</i>
                </div>
              </div>
            </div>
            <div class="team-left-bottom">
              <div>截止时间: {{ item.expireTime }}</div>
B              <div class="team-status">
                <span>{{ item.status === 0 ? "公开" : "加密" }}</span>
                <span>队伍人数:{{ '1' + "/" + item.maxNum }}</span>
              </div>
            </div>
          </div>
          <div class="team-right">
            <div class="team-control" v-if="isMineTeam">
              <div class="update-team">
                <img src="./images/updateTeam.png" alt="">
                <span>更新队伍</span>
              </div>
              <div class="clear-team">
                <img src="./images/usergroup-clear.png" alt="">
                <span>解散队伍</span>
              </div>
            </div>
            <div class="team-control" v-else>
              <div class="join-team">
                <img src="./images/加入.png" alt="">
                <span>加入队伍</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, Ref, onMounted } from "vue";
import axios from '@/utils/axios';
import { type Team } from '@/api/team';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';

const store = useStore();
const { publicTeam, privateTeam, mineTeam } = storeToRefs(store);

// 当前状态房间
let currentList: Ref<Array<Team>> = reactive(publicTeam);

onMounted(async () => {
  try {
    let team = (await axios.get('/team/list/page')).records
    store.privateTeam = team.filter((item: any) => {
      if(item.status === 1) {
        return item
      }
    })
    store.publicTeam = team.filter((item: any) => {
      if(item.status === 0) {
        return item
      }
    })
    store.mineTeam = await axios.get('/team/list/my/create')
  } catch (e) {
    console.warn(e)
  }
})

let isMineTeam = ref(false);

// 点击公开or私密按钮触发事件
let oldStatus: Ref<HTMLElement | null> = ref(null)
const changeBgc = (status: number, event: MouseEvent) => {
  status === 0 ? isMineTeam.value = true : isMineTeam.value = false;
  if(oldStatus.value) {
    oldStatus.value.className = ''
  }
  let span = event.target as HTMLElement
  span.className = 'active-bgc'
  oldStatus.value = span

  switch (status) {
    case 0:
      currentList = mineTeam
      break
    case 1:
      currentList = publicTeam
      break
    case 2:
      currentList = privateTeam
      break
    default:
      console.warn('获取错误')
  }
}

// ==============vant====================
const value = ref('');
const onSearch = async () => {
  let searchResult = await axios.get(`/team/get${value}`)
}
</script>

<style scoped>
.add-team {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0;
  bottom: 50px;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 4px #ddd;
  z-index: 999;
}

.setWay-container {
  margin-top: 10px;
  padding: 0 10px;
}

.setWay {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 0 10px;
  width: 100%;
  height: 40px;
  background-color: #fff;
  border-radius: 10px;
}

.way-title {
  font-size: 14px;
  color: rgb(62, 62, 62);
}

.way-title img {
  margin-right: 5px;
  width: 16px;
  vertical-align: text-bottom;
}

.public-private {
  box-sizing: border-box;
  display: flex;
  margin-left: auto;
  padding: 2px;
  width: 180px;
  height: 30px;
  background-color: #fff;
  border-radius: 100px;
  font-size: 14px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.078);
  overflow: hidden;
  user-select: none;
}

.active-bgc {
  background-color: var(--main-color);
  color: #fff;
}

.public-private span {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 100px;
}

.team-content {
  box-sizing: border-box;
  width: 100%;
}

.team {
  box-sizing: border-box;
  display: flex;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}

.team-left {
  box-sizing: border-box;
  padding-right: 5px;
  width: 100%;
}

.team-left-top {
  display: flex;
}

.team-left .team-l-l img {
  width: 60px;
  border-radius: 10px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.195);
}

.team-left .team-l-r {
  margin-left: 8px;
  padding: 5px 0 0 5px;
}

.team-title img {
  margin-right: 5px;
  width: 18px;
  vertical-align: text-bottom;
}

.team-l-r .team-title {
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  color: var(--main-font-color);
}

.team-comment {
  height: 30px;
  font-size: 12px;
  line-height: 16px;
  overflow: hidden;
}

.team-comment img {
  margin-right: 5px;
  width: 12px;
  vertical-align: middle;
}

.team-left-bottom {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-flow: column;
  font-size: 12px;
}

.team-left-bottom>div {
  margin-top: 4px;
}

.team-left-bottom .team-status {
  margin-top: 10px;
}

.team-status {
  padding: 0 20px 0 0;
}

.team-status span {
  box-sizing: border-box;
  padding: 2px 4px;
  float: left;
  display: block;
  border: 2px solid var(--main-color);
}

.team-status span:first-child {
  margin-right: 6px;
  color: var(--main-color);
}

.team-status span:last-child {
  background-color: var(--main-color);
  color: #fff;
}

.team-right {
  position: relative;
  box-sizing: border-box;
  padding: 0 10px 0 20px;
  height: inherit;
}

.team-right::before {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: block;
  content: "";
  width: 2px;
  height: 100px;
  background-color: #eee;
}

.team-control {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.update-team,
.clear-team,
.join-team {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 12px;
  color: #888;
  white-space: nowrap;
}

.team-control>div>img {
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
}
</style>