<template>
  <div class="user-modify-container">
    <van-cell-group inset>
      <div class="modify-data-item avatar">
        <div class="item-name">头像</div>
        <div class="modify-avatar-content">
          <div class="avatar">
            <img src="../../assets/default-avatar.png" alt="">
          </div>
          <div class="van-field__right-icon"><van-icon name="arrow" /></div>
        </div>
      </div>
      <van-field
          v-model="modifyValue.usename"
          label="昵称"
          :placeholder="userData.username || userData.userAccount"
          right-icon="edit"
          input-align="right"
      />
      <van-field
          v-model="modifyValue.sex"
          label="性别"
          :placeholder="userData.gender || '未设置'"
          right-icon="edit"
          input-align="right"
      />
      <van-field
          v-model="modifyValue.phoneNum"
          label="手机号"
          :placeholder="userData.phone || '未设置'"
          right-icon="edit"
          input-align="right"
      />
      <van-field
          v-model="modifyValue.email"
          label="邮箱"
          :placeholder="userData.email || '未设置'"
          right-icon="edit"
          input-align="right"
      />
      <van-field
          label="编号"
          :placeholder="`${userData.id}` || '未设置'"
          right-icon="edit"
          input-align="right"
      />
      <van-cell title="退出登录" @click="logout">
        <template #right-icon>
          <van-icon name="share" class="share-icon" />
        </template>
      </van-cell>
    </van-cell-group>

  </div>
  <SaveBtn title="保存" @click="saveData"/>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { useStore } from '@/store';
import axios from '@/utils/axios';
import { useRouter } from 'vue-router';

const store = useStore()
const router = useRouter()

let userData = reactive(store.userData!)

// 收集修改数据
const modifyValue = reactive({
  username: '',
  sex: '',
  phoneNum: '',
  email: ''
})

// 退出登录
const logout = () => {
  axios.post('/user/logout')
      .then(() => {
        store.deleteUser();
        router.push('/login')
      })
      .catch(error => {
        throw new Error(error)
      })
}

// 保存修改数据
const saveData = async () => {
  try {
    let data = await axios.post('/user/update', {
      ...modifyValue
    });
  } catch(e: any) {
    throw new Error(e)
  }
}
</script>
<style>
  .modify-data-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
    overflow: hidden;
    color: var(--van-cell-text-color);
    font-size: var(--van-cell-font-size);
    line-height: var(--van-cell-line-height);
    background: var(--van-cell-background-color);
  }

  .modify-data-item::after {
    position: absolute;
    box-sizing: border-box;
    content: " ";
    pointer-events: none;
    right: var(--van-padding-md);
    bottom: 0;
    left: var(--van-padding-md);
    border-bottom: 1px solid var(--van-cell-border-color);
    transform: scaleY(.5);
  }

  .modify-avatar-content {
    display: flex;
    align-items: center;
  }

  .share-icon {
    font-size: 20px;
    line-height: inherit;
    color: #bbbbbb;
  }
</style>