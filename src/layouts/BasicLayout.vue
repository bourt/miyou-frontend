<template>
    <van-nav-bar :title="miyouTitle" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
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
import { ref, Ref, watch } from "vue";
import router from "@/router/index";
import { useRoute, useRouter } from "vue-router";
import {getToken} from "@/utils/index";

let miyouTitle: Ref<string> = ref("miyou")

const route = useRoute()
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    // 如果要去路径是 /login 则正常执行
    next()
  } else {
    if(Boolean(getToken('token'))){
      next()
    }else {
      next()
    }
  }
})
// 监听路由变化
watch(() => route.path, () => {
  miyouTitle.value = route.meta.title as string
  switch (route.path) {
    case "/":
      active.value = "home";
      break;
    case "/team":
      active.value = "team";
      break;
    case "/user":
      active.value = "user";
      break;
    default:
      active.value = "";
  }
});

// 初始化内容区域的高度
let contentHeight = ref("height:" + (document.documentElement?.clientHeight - 96) + "px");

// navBar左右两边的按钮事件
const onClickLeft = () => history.back();
const onClickRight = () => {
    router.push({
        name: 'search'
    })
};
// 设置图标选中后的效果
let active = ref("home")
</script>
    
<style scoped>
  .content {
    position: relative;
    overflow-y: scroll;
  }
</style>