<template>
  <div class="team-container">
    <div class="team-search">
      <van-search v-model="value" shape="round" placeholder="请输入队伍名称" @search="onSearch"/>
    </div>
    <div class="setWay-container">
      <div class="setWay">
                <span class="way-title">
                    <img src="./images/modul.png" alt="">
                    <span>请选择队伍模式</span>
                </span>
        <div class="public-private">
          <span :class="isChangeColor ? 'pub-pri-Bgc' : `public`" @click="changeBgc(true)">公开</span>
          <span :class="isChangeColor ? 'private' : 'pub-pri-Bgc'" @click="changeBgc(false)">加密</span>
        </div>
      </div>
      <div class="team-content">
        <div class="team" v-for="(item, index) in isChangeColor ? publicList : privateList" :key="index">
          <div class="team-left">
            <div class="team-left-top">
              <div class="team-l-l">
                <img :src="item.teamAvatar" alt=""/>
              </div>
              <div class="team-l-r">
                <div class="team-title">
                  <img src="./images/team-title.png" alt="">
                  <span>{{ item.teamName }}</span>
                </div>
                <div class="team-comment">
                  <img src="./images/comment.png" alt="">
                  <i>{{ item.teamComment }}</i>
                </div>
              </div>
            </div>
            <div class="team-left-bottom">
              <div>截止时间: {{ item.endTime }}</div>
              <div>创建时间: {{ item.createTime }}</div>
              <div class="team-status">
                <span>{{ item.isPrivate ? "加密" : "公开" }}</span>
                <span>队伍人数:{{ item.teamNowTotal + "/" + item.teamTotal }}</span>
              </div>
            </div>
          </div>
          <div class="team-right">
            <div class="team-control">
              <div class="update-team">
                <img src="./images/updateTeam.png" alt="">
                <span>更新队伍</span>
              </div>
              <div class="clear-team">
                <img src="./images/usergroup-clear.png" alt="">
                <span>解散队伍</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="new-team">
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";

interface Team {
  teamAvatar: string;
  teamName: string;
  teamComment: string;
  isPrivate: boolean;
  teamTotal: number;
  teamNowTotal: number;
  endTime: string;
  createTime: string;
}

let teamList = [
  {
    teamAvatar: "/src/assets/blueDog.png",
    teamName: "蓝狗军团",
    teamComment: "继承了蓝狗和军官的意志--威斯blue克--军人的意志",
    isPrivate: true,
    teamTotal: 5,
    teamNowTotal: 1,
    endTime: "2022-12-31 23:27:50",
    createTime: "2022-09-04 23:27:50"
  },
  {
    teamAvatar: "/src/assets/kunkun.png",
    teamName: "ikun后援团",
    teamComment: "守护最好的坤坤",
    isPrivate: false,
    teamTotal: 5,
    teamNowTotal: 1,
    endTime: "2022-12-31 23:27:50",
    createTime: "2022-09-04 23:27:50"
  }
]
// 公开房间列表
let publicList: Team[] = reactive(teamList.filter(item => {
  return !item.isPrivate
}))
// 隐私房间列表
let privateList: Team[] = reactive(teamList.filter(item => {
  return item.isPrivate
}))

// 控制元素类名
let isChangeColor: any = ref(true);

// 点击公开or私密按钮触发事件
const changeBgc = (condition: boolean) => {
  isChangeColor.value = condition
}

// ==============vant====================
const value = ref('');
const onSearch = () => {

}
</script>

<style scoped>
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
  width: 120px;
  height: 30px;
  background-color: #fff;
  border-radius: 100px;
  font-size: 14px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.078);
  overflow: hidden;
  user-select: none;
}

.pub-pri-Bgc {
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

.team-left-bottom > div {
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
.clear-team {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 10px;
  white-space: nowrap;
}

.team-control > div > img {
  margin-bottom: 5px;
}
</style>