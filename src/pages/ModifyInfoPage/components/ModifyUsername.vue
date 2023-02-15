<template>
  <van-field
      v-model="value"
      label="昵称"
      :placeholder="userData.username || userData.userAccount"
      right-icon="edit"
      input-align="right"
  />
</template>

<script setup>
</script>

<style scoped>

</style>