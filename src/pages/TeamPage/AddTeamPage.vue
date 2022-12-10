
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

  .select-max-people>input {
    margin: 0 5px;
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

  .team-status div:nth-child(1) {
    border: 2px solid var(--main-color);
    font-weight: bold;
  }

  .confirm-create-team {
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 50px;
    padding: 0 20px;
    width: 100%;
    height: 40px;
  }

  .confirm-create-team>button {
    width: 100%;
    height: 35px;
    background-color: var(--main-color);
    color: #fff;
    border: 0;
    border-radius: 35px;
    letter-spacing: 0.1rem;
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
        <input type="text" placeholder="* 请输入队伍名">
      </div>
      <div class="team-comment team-input">
        <input type="text" placeholder="* 请输入队伍描述">
      </div>
      <div class="bar-txt">
        <div class="bar"></div>
        <div class="txt">OTHER</div>
      </div>
      <div class="create-time-other">
        <span class="other-head">过期时间</span>
        <div class="select-expire-time">
          <div class="expire-time" @click="show = true" >{{ date }}</div>
          <van-calendar color="#fbc002" v-model:show="show" @confirm="onConfirm" />
        </div>
        <span class="other-head">最大人数</span>
        <div class="select-max-people">
          <button></button>
          <input type="text" value="0">
          <button></button>
        </div>
        <span class="other-head">队伍状态</span>
        <div class="team-status">
          <div>公开</div>
          <div>私有</div>
          <div>加密</div>
        </div>
      </div>
    </div>
    <div class="confirm-create-team">
      <button>创建队伍</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const date = ref('请选择过期时间');
const show = ref(false);

const formatDate = (date: Date) => `${date.getMonth() + 1}/${date.getDate()}`;
const onConfirm = (value: Date) => {
  show.value = false;
  date.value = formatDate(value);
};
</script>