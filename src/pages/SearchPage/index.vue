<style scoped>
.tag-page-container {
  box-sizing: border-box;
  height: 100%;
  background-color: #f6f6f6;
  overflow-y: scroll;
}

.header {
  width: 100%;
}

.selected-tags,
.select-tags {
  box-sizing: border-box;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.selected-tags span,
.select-tags span {
  margin: 0 10px 10px;
  padding: 6px 10px;
  background-color: rgb(21, 101, 176);
  font-size: 12px;
  color: #fff;
  line-height: 1;
  font-weight: 700;
  border-radius: 100px;
  letter-spacing: 0.1em;
}

.select-tags-container {
  margin: 10px;
  padding: 10px 20px 0;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 5px #eee;
}

.select-tags-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
}

.select-tags-head>span {
  font-size: 12px;
  color: #888;
}

.refreshTag {
  float: right;
  height: 20px;
}

.refreshTag img {
  height: inherit;
}

.fixed-tags-parent {
  overflow: hidden;
  overflow-x: scroll;
}

.fixed-tags-parent::-webkit-scrollbar {
  display: none;
}

.fixed-tags-parent>ul {
  width: 400px;
  display: inline-block;
}

.fixed-tags-parent>ul>li {
  box-sizing: border-box;
  display: inline-block;
  margin-right: 8px;
  padding: 10px 12px;
  background-color: #fff;
  color: #444;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.fixed-tags-parent>ul>li:last-child {
  margin-right: 0;
}

.fixed-tags-parent>ul .activeParent {
  background-color: var(--main-color);
  color: #fff;
  border: 1px solid var(--main-color);
}

.all-tag {
  margin-bottom: 20px;
}
</style>

<template>
  <div class="tag-page-container">
    <div class="header">
      <van-search v-model="value" shape="round" placeholder="请输入要搜索的标签" @search="onSearch"/>
    </div>
    <div class="select-tags-container">
      <div class="select-tags-head">
        <span>选中标签</span>
      </div>
      <div class="selected-tags">
      <span :style="item.color" v-for="item in selectedTag" :key="item.id" @click="onDelTag(item.id)">{{
          item.text
        }}</span>
      </div>
    </div>
    <div class="select-tags-container">
      <div class="select-tags-head">
        <span>随机标签</span>
        <div class="refreshTag" @click="refTag">
          <img src="./images/refresh.png" alt="">
        </div>
      </div>
      <div class="select-tags">
        <span :style="item.color" :name="item.id" v-for="item in selectTag" :key="item.id"
              @click="onClickTags(item.id)">{{ item.text }}</span>
      </div>
    </div>
    <div class="select-tags-container">
      <div class="select-tags-head all-tag">
        <span>所有标签</span>
      </div>
      <div class="fixed-tags-parent">
        <ul>
          <li v-for="(item, index) in copyTagsList" :key="index" @click="changeSonList($event, index)" ref="parentTag">{{ item.text }}</li>
        </ul>
      </div>
      <div class="select-tags">
        <span :style="item.color" v-for="(item, index) in clickParentSon" :key="index">{{ item.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, onMounted} from "vue"

let tagsList = [
  {
    text: "语言",
    children: [
      {text: "java", id: "java", color: ""},
      {text: "css", id: "css", color: ""},
      {text: "javascript", id: "javascript", color: ""},
      {text: "html", id: "html", color: ""},
      {text: "sass", id: "sass", color: ""},
      {text: "webpack", id: "webpack", color: ""},
      {text: "react", id: "react", color: ""},
      {text: "vue", id: "vue", color: ""},
      {text: "springboot", id: "springboot", color: ""},
    ]
  },
  {
    text: "爱好",
    children: [
      {text: "篮球", id: "篮球", color: ""},
      {text: "足球", id: "足球", color: ""},
      {text: "乒乓球", id: "乒乓球", color: ""},
      {text: "网球", id: "网球", color: ""},
      {text: "排球", id: "排球", color: ""},
    ]
  },
  {
    text: "nba",
    children: [
      {text: "詹姆斯", id: "詹姆斯", color: ""},
      {text: "威斯布鲁克", id: "威斯布鲁克", color: ""},
      {text: "蔡徐坤", id: "蔡徐坤", color: ""},
      {text: "杜兰特", id: "杜兰特", color: ""},
      {text: "哈登", id: "哈登", color: ""},
      {text: "奥尼尔", id: "奥尼尔", color: ""},
      {text: "三球", id: "三球", color: ""},
      {text: "皮尔斯", id: "皮尔斯", color: ""},
      {text: "库里", id: "库里", color: ""},
    ]
  }
  ,{
    text: "美食",
    children: [
      {text: "汉堡包", id: "汉堡包", color: ""},
      {text: "薯片", id: "薯片", color: ""},
    ]
  },
  {
    text: "宠物",
    children: [
      {text: "加菲猫", id: "加菲猫", color: ""},
      {text: "机械狗", id: "机械狗", color: ""},
    ]
  },
  {
    text: "游戏",
    children: [
      {text: "明日方舟", id: "明日方舟", color: ""},
      {text: "穿越火线", id: "穿越火线", color: ""},
    ]
  }
]
// 存放随机颜色
const color: string[] = ["#e03997", "#00b5ad", "#f2711c", "#a333c8", "#21ba45", "#db2828"]
// 存放扁平化的tagsListSon
let copyTagsSon = reactive(tagsList.flatMap(p => p.children));

// 备份扁平化数组
let copyFlatList = reactive([...copyTagsSon]);
// 存放选中的标签
let selectedTag: any = reactive([]);
// 存放未选中的标签
let selectTag: any = reactive([]);
// 备份原数据
let copyTagsList = tagsList
// 当前点击的父标签的子标签
let clickParentSon = ref(copyTagsList[0].children);
// 存储parentTag
let parentTag = ref()
// 存放上一次点击的父标签
let lastParent: any;
// 点击其他父标签之后调用的函数
function changeSonList(e:any,index: number) {
  lastParent?.classList.remove("activeParent")
  lastParent = e.target
  e.target.classList.add("activeParent")
  clickParentSon.value = copyTagsList[index].children
}

// 设置随机颜色
function setRanColor() {
  copyTagsSon.forEach(item => {
    item.color = getRanColor()
  })
}

setRanColor();

// 获取随机颜色方法
function getRanColor() {
  let ranIndex = Math.floor(Math.random() * color.length);
  return `background-color: ${color[ranIndex]}`
}

// 设置随机10个标签
function ranTag() {
  let count: number = 10;
  if (copyFlatList.length < 10) {
    count = copyFlatList.length;
  }
  for (let i = 0; i < count; i++) {
    let ran = Math.floor(Math.random() * copyFlatList.length);
    selectTag.push(copyFlatList[ran]);
    copyFlatList.splice(ran, 1);
  }
}

ranTag()
// 点击刷新图标事件
const refTag = (() => {
  let temporaryStore = selectTag.filter((item: any) => item)
  selectTag.splice(0, selectTag.length);
  ranTag();
  temporaryStore.forEach((item: any) => {
    copyFlatList.push(item)
  })
  temporaryStore.splice(0, temporaryStore.length);
})

// 点击select标签事件
const onClickTags = (id: any) => {
  selectTag.forEach((item: any, i: number) => {
    if (item.id === id) {
      selectTag.splice(i, 1)
      selectedTag.push(item)
    }
  })
}
// 点击selected标签事件
const onDelTag = (id: any) => {
  selectedTag.forEach((item: any, i: number) => {
    if (item.id === id) {
      selectedTag.splice(i, 1)
      copyFlatList.push(item)
    }
  })
}

// ========================vant组件==========================
// 搜索框
const value = ref('');
const onSearch = () => {
  [...selectTag].map(item => {
    copyFlatList.push(item)
  })
  selectTag.splice(0, selectTag.length);
  let searchList = copyFlatList.filter((item) => {
    if (item.text.indexOf(value.value) !== -1) {
      return item
    }
  })
  console.log(searchList.length);

  let arr = searchList.concat(copyFlatList).filter(itemAll => {
    let searchListRes: number = 0
    for (let item of searchList) {
      searchListRes = item.text.indexOf(itemAll.text)
      if (item.text.indexOf(itemAll.text) !== -1) {
        break
      }
    }
    let copyFlatListRes: number = 0
    for (let item of copyFlatList) {
      copyFlatListRes = item.text.indexOf(itemAll.text)
      if (item.text.indexOf(itemAll.text) !== -1) {
        break
      }
    }
    if (searchListRes === -1 || copyFlatListRes === -1) {
      return itemAll
    }
  })
  copyFlatList.splice(0, copyFlatList.length);
  arr.map(item => {
    copyFlatList.push(item);
  })
  searchList.filter(item => {
    selectTag.push(item);
  })
}

// const show = ref(true);
// const close = () => {
//     show.value = false;
// };
// ======生命周期钩子=====
onMounted(() => {
  parentTag.value[0].click()
})
</script>