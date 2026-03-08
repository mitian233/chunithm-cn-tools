<template>
  <n-card>
    <n-card-header>
      <n-card-header-content>
        <n-text strong style="font-size: 20px">歌曲列表</n-text>
        <n-text depth="3">数据来源：diving fish api</n-text>
      </n-card-header-content>
    </n-card-header>
    <n-space vertical>
      <n-space vertical>
        <n-text>查找范围</n-text>
        <n-space>
          <n-button @click="searchFieldList = []" secondary>清除筛选器</n-button>
          <n-button-group>
            <n-button
              v-for="field in searchFields"
              :key="field.value"
              :type="searchFieldList?.includes(field.value) ? 'primary' : 'default'"
              @click="toggleSearchField(field.value)"
            >
              {{ field.label }}
            </n-button>
          </n-button-group>
        </n-space>
      </n-space>
      <n-input
        v-model:value="searchKey"
        placeholder="查找乐曲"
        clearable
        @update:value="handleSearchUpdate"
      >
        <template #prefix>
          <n-icon :component="SearchOutline" />
        </template>
      </n-input>
      <chuni-table
        :filter-list="searchFieldList"
        :search="searchKey"
        :items="store.chuniRecordDisplay"
        :music_data_dict="store.chuni_data_dict"
        :loading="store.isLoading"
      />
    </n-space>
  </n-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { SearchOutline } from '@vicons/ionicons5';
import chuniTable from '../components/chuniTable.vue';
import { useMusicDataStore } from '../store';

const router = useRouter();
const route = useRoute();
const store = useMusicDataStore();

const searchKey = ref('');
const searchFieldList = ref(['title']);

const searchFields = [
  { label: '乐曲ID', value: '_id' },
  { label: '名称', value: 'title' },
  { label: '谱面作者', value: 'charter' },
  { label: '流派', value: 'genre' },
  { label: '版本', value: 'from' },
];

function toggleSearchField(field) {
  if (!searchFieldList.value) {
    searchFieldList.value = [];
  }
  const index = searchFieldList.value.indexOf(field);
  if (index === -1) {
    searchFieldList.value.push(field);
  } else {
    searchFieldList.value.splice(index, 1);
  }
  updateQuery();
}

function handleSearchUpdate() {
  updateQuery();
}

function updateQuery() {
  router.push({
    query: {
      search: searchKey.value,
      searchFieldList: searchFieldList.value,
    },
  });
}

onMounted(() => {
  history.replaceState('', '', window.location.pathname);
  store.fetchChuniData();
  if (route.query.search) {
    searchKey.value = route.query.search;
  }
  if (route.query.searchFieldList) {
    searchFieldList.value = Array.isArray(route.query.searchFieldList)
      ? route.query.searchFieldList
      : [route.query.searchFieldList];
  }
});
</script>

<style scoped></style>
