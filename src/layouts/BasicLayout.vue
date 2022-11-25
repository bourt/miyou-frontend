<template>
    <van-nav-bar title="miyou" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
        <template #right>
            <van-icon name="search" size="18" color="#fbc002" />
        </template>
    </van-nav-bar>
    <div class="content" :style="contentHeight">
        <router-view></router-view>
    </div>
    <van-tabbar v-model="active" active-color="#fbc002">
        <van-tabbar-item to="/" icon="home-o" name="home">主页</van-tabbar-item>
        <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
        <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
    </van-tabbar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import router from "../router/index"

const onClickLeft = () => history.back();
const onClickRight = () => {
    router.push({
        name: 'search'
    })
};
const active = ref("home");
let contentHeight = ref("height:" + (document.documentElement?.clientHeight - 96) + "px");


</script>
    
<style scoped>

</style>