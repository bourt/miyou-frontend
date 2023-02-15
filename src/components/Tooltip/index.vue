<style scoped>
  .warn-box-container {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 25px;
    z-index: 9;
  }

  .warn-box {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -40px;
    width: 100%;
    height: 100%;
    background-color: rgba(251, 192, 2, 0.99);
    border-radius: 4px;
    opacity: 0;
  }

  .animate {
    animation: animate 1.5s ease-out;
  }

  @keyframes animate {
    0% {
      top: -40px;
      opacity: 0;
    }

    20% {
      top: 20px;
      opacity: 1;
    }

    80% {
      top: 20px;
      opacity: 1;
    }

    100% {
      top: -40px;
      opacity: 0;
    }
  }
</style>

<template>
  <div class="warn-box-container" @click="handlerClick">
    <div :class="aaa">
      <i class="icon"><van-icon name="warning" size="20" color="#EE0A0AFF"/></i>
      <span class="title">登录密码错误</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let aaa = ref('warn-box')
function handlerClick () {
  aaa.value = 'warn-box animate'
}
</script>