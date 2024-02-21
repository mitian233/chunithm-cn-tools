<script setup>
import titleTable from "../components/titleTable.vue";
import axios from "axios";
import {useTitleDataStore} from "../store";
import {onMounted, ref, watch} from "vue";
import router from "../router";
const store = useTitleDataStore();

const listTab = ref("music");
const searchKey = ref("");
const headersMusic = [
  {text:"标题",value:"title"},
  {text:"颜色",value:"color"},
  {text:"关联乐曲",value:"music"},
  {text:"获取条件",value:"obtain"},
]
const headersNonMusic = [
  {text:"标题",value:"title"},
  {text:"颜色",value:"color"},
  {text:"获取条件",value:"obtain"},
]
const isLoading = ref(true)

onMounted(async () => {
  router.push({query: {tab: listTab.value, search: searchKey.value}})
  await store.fetchTitleData();
  isLoading.value = false;
  listTab.value = router.currentRoute.value.query.tab
  searchKey.value = router.currentRoute.value.query.search
})

watch(() => listTab.value, (val) => {
  router.push({query: {tab: val, search: searchKey.value}})
})
watch(() => searchKey.value, (val) => {
  router.push({query: {tab: listTab.value, search: val}})
})
</script>

<template>
  <v-card>
    <v-card-title>称号列表</v-card-title>
    <v-card-subtitle>数据来源：<a href="https://space.bilibili.com/32772298/article" >losffa</a></v-card-subtitle>
    <v-container>
      <v-tabs v-model="listTab" grow>
        <v-tab value="music">
          乐曲称号
        </v-tab>
        <v-tab value="nonmusic">
          非乐曲称号
        </v-tab>
      </v-tabs>
      <v-spacer />
      <v-card-text>
        <v-window v-model="listTab">
          <v-window-item value="music">
            <v-text-field v-model="searchKey" prepend-icon="mdi-magnify" label="查找名称" single-line hide-details class="mb-4"/>
            <title-table :search="searchKey" :title-list="store.listItemMusic" :loading="isLoading" :headers="headersMusic"/>
          </v-window-item>
          <v-window-item value="nonmusic">
            <v-text-field v-model="searchKey" prepend-icon="mdi-magnify" label="查找名称" single-line hide-details class="mb-4"/>
            <title-table :search="searchKey" :title-list="store.listItemNonMusic" :loading="isLoading" :headers="headersNonMusic"/>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<style scoped>

</style>
