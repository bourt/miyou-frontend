<style scoped>
  .warn-box-container {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9;
  }

  .warn-box {
    display: flex;
    position: relative;
    top: -40px;
    padding: 12px 20px;
    background-color: #fff;
    border-radius: 4px;
    opacity: 0;
    box-shadow: 0 0 5px #dddddd;
    animation: notice 2.5s ease-out;
  }

  .icon {
    display: inline-block;
    box-sizing: border-box;
    margin: -1px 6px 0 0;
  }

  @keyframes notice {
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
  <div class="warn-box-container" v-if="title">
    <div class="warn-box" ref="warnBox">
      <span class="icon"><van-icon name="warning" size="16" color="#EE0A0AFF"/></span>
      <span class="title">{{ title }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  title: String
})

const warnBox = ref<null | HTMLElement>(null);
</script>