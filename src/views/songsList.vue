<template>
  <section class="ui-card flex min-w-0 flex-col gap-3">
    <header class="flex flex-wrap items-baseline justify-between gap-x-3">
      <h1 class="text-xl font-semibold">歌曲列表</h1>
      <p class="text-sm text-[var(--ui-muted)]">数据来源：diving fish api</p>
    </header>
    <div>
      <p id="song-search-fields" class="mb-2">查找范围</p>
      <div class="flex flex-wrap gap-2" role="group" aria-labelledby="song-search-fields">
        <button class="ui-button ui-button--outline" type="button" @click="clearFields">
          清除筛选器
        </button>
        <button
          v-for="field in searchFields"
          :key="field.value"
          type="button"
          class="ui-button ui-button--outline"
          :aria-pressed="searchFieldList.includes(field.value)"
          @click="toggleSearchField(field.value)"
        >
          {{ field.label }}
        </button>
      </div>
    </div>
    <CatalogSearch v-model="searchKey" placeholder="查找乐曲" @update:model-value="updateQuery" />
    <p v-if="loadFailed" role="alert" class="text-[var(--ui-expert)]">
      歌曲资料加载失败，请刷新后重试。
    </p>
    <ChuniTable
      v-else
      :filter-list="searchFieldList"
      :search="searchKey"
      :items="store.chuniRecordDisplay"
      :loading="store.isLoading"
    />
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import CatalogSearch from '../components/CatalogSearch.vue';
import ChuniTable from '../components/chuniTable.vue';
import { useMusicDataStore } from '../store';

const router = useRouter();
const route = useRoute();
const store = useMusicDataStore();
const searchKey = ref('');
const searchFieldList = ref(['title']);
const loadFailed = ref(false);
const searchFields = [
  { label: '乐曲ID', value: '_id' },
  { label: '名称', value: 'title' },
  { label: '谱面作者', value: 'charter' },
  { label: '流派', value: 'genre' },
  { label: '版本', value: 'from' },
];

watch(
  () => route.fullPath,
  () => {
    if (!['/song', '/song/:search'].includes(route.matched.at(-1)?.path)) return;
    searchKey.value = route.query.search ?? route.params.search ?? '';
    const fields = route.query.searchFieldList;
    searchFieldList.value =
      fields === undefined ? ['title'] : [].concat(fields ?? []).filter(Boolean);
  },
  { immediate: true }
);

function toggleSearchField(field) {
  const index = searchFieldList.value.indexOf(field);
  if (index === -1) searchFieldList.value.push(field);
  else searchFieldList.value.splice(index, 1);
  updateQuery();
}

function clearFields() {
  searchFieldList.value = [];
  updateQuery();
}

function updateQuery() {
  router.push({
    query: {
      search: searchKey.value,
      searchFieldList: searchFieldList.value.length ? searchFieldList.value : null,
    },
  });
}

onMounted(async () => {
  try {
    await store.fetchChuniData();
  } catch {
    loadFailed.value = true;
  }
});
</script>
