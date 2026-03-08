<template>
  <n-card title="称号列表">
    <template #header-extra>
      <n-text depth="3">
        数据来源：
        <n-a href="https://space.bilibili.com/32772298/article" target="_blank">losffa</n-a>
      </n-text>
    </template>
    <n-tabs v-model:value="listTab" type="line" animated @update:value="handleTabChange">
      <n-tab-pane name="music" tab="乐曲称号">
        <n-space vertical>
          <n-input v-model:value="searchKey" placeholder="查找名称" clearable>
            <template #prefix>
              <n-icon :component="SearchOutline" />
            </template>
          </n-input>
          <title-table
            :search="searchKey"
            :title-list="filteredMusicList"
            :loading="isLoading"
            :headers="headersMusic"
          />
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="nonmusic" tab="非乐曲称号">
        <n-space vertical>
          <n-input v-model:value="searchKey" placeholder="查找名称" clearable>
            <template #prefix>
              <n-icon :component="SearchOutline" />
            </template>
          </n-input>
          <title-table
            :search="searchKey"
            :title-list="filteredNonMusicList"
            :loading="isLoading"
            :headers="headersNonMusic"
          />
        </n-space>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { SearchOutline } from '@vicons/ionicons5';
import titleTable from '../components/titleTable.vue';
import { useTitleDataStore } from '../store';

const router = useRouter();
const route = useRoute();
const store = useTitleDataStore();

const listTab = ref('music');
const searchKey = ref('');
const isLoading = ref(true);

const headersMusic = [
  { title: '标题', value: 'title' },
  { title: '颜色', value: 'color' },
  { title: '关联乐曲', value: 'music' },
  { title: '获取条件', value: 'obtain' },
];

const headersNonMusic = [
  { title: '标题', value: 'title' },
  { title: '颜色', value: 'color' },
  { title: '获取条件', value: 'obtain' },
];

const filteredMusicList = computed(() => {
  if (!searchKey.value || !store.listItemMusic) return store.listItemMusic;
  const search = searchKey.value.toLowerCase();
  return store.listItemMusic.filter(
    (item) =>
      item.title?.toLowerCase().includes(search) ||
      item.obtain?.toLowerCase().includes(search) ||
      item.music?.toLowerCase().includes(search)
  );
});

const filteredNonMusicList = computed(() => {
  if (!searchKey.value || !store.listItemNonMusic) return store.listItemNonMusic;
  const search = searchKey.value.toLowerCase();
  return store.listItemNonMusic.filter(
    (item) =>
      item.title?.toLowerCase().includes(search) || item.obtain?.toLowerCase().includes(search)
  );
});

function handleTabChange(val) {
  router.push({ query: { tab: val, search: searchKey.value } });
}

onMounted(async () => {
  await store.fetchTitleData();
  isLoading.value = false;
  listTab.value = route.query.tab || 'music';
  searchKey.value = route.query.search || '';
});

watch(searchKey, (val) => {
  router.push({ query: { tab: listTab.value, search: val } });
});
</script>
