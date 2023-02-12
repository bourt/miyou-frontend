<template>
  <div class="btn-container">
    <div class="placeholder"></div>
    <div class="confirm-btn">
      <button>{{ title }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String
})
</script>

<style scoped>
.placeholder {
  width: 100%;
  height: 40px;
}

.confirm-btn {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 50px;
  padding: 0 20px;
  width: 100%;
  height: 40px;
}

.confirm-btn>button {
  width: 100%;
  height: 35px;
  background-color: var(--main-color);
  color: #fff;
  border: 0;
  border-radius: 35px;
  letter-spacing: 0.1rem;
}
</style>