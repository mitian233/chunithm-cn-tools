<template>
  <section class="ui-card flex min-w-0 flex-col gap-3">
    <header class="flex flex-wrap items-baseline justify-between gap-x-3">
      <h1 class="text-xl font-semibold">称号列表</h1>
      <p class="text-sm text-[var(--ui-muted)]">
        数据来源：
        <a
          class="ui-link"
          href="https://space.bilibili.com/32772298/article"
          target="_blank"
          rel="noopener noreferrer"
        >
          losffa
        </a>
      </p>
    </header>
    <p v-if="loadFailed" role="alert" class="text-[var(--ui-expert)]">
      称号资料加载失败，请刷新后重试。
    </p>
    <TabsRoot v-else :model-value="listTab" @update:model-value="updateQuery">
      <TabsList class="ui-tabs mb-3" aria-label="称号类型">
        <TabsTrigger class="ui-tab" value="music">乐曲称号</TabsTrigger>
        <TabsTrigger class="ui-tab" value="nonmusic">非乐曲称号</TabsTrigger>
      </TabsList>
      <CatalogSearch
        v-model="searchKey"
        class="mb-3"
        placeholder="查找名称"
        @update:model-value="() => updateQuery(listTab)"
      />
      <TabsContent value="music">
        <TitleTable :title-list="filteredMusicList" :loading="isLoading" :headers="headersMusic" />
      </TabsContent>
      <TabsContent value="nonmusic">
        <TitleTable
          :title-list="filteredNonMusicList"
          :loading="isLoading"
          :headers="headersNonMusic"
        />
      </TabsContent>
    </TabsRoot>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from 'reka-ui';
import CatalogSearch from '../components/CatalogSearch.vue';
import TitleTable from '../components/titleTable.vue';
import { useTitleDataStore } from '../store';

const router = useRouter();
const route = useRoute();
const store = useTitleDataStore();
const listTab = computed(() => (route.query.tab === 'nonmusic' ? 'nonmusic' : 'music'));
const searchKey = ref('');
const isLoading = ref(true);
const loadFailed = ref(false);

const headersNonMusic = [
  { label: '标题', key: 'title' },
  { label: '颜色', key: 'color', width: '5rem' },
  { label: '获取条件', key: 'obtain' },
];
const headersMusic = [
  ...headersNonMusic.slice(0, 2),
  { label: '关联乐曲', key: 'music' },
  headersNonMusic[2],
];

function filterTitles(rows, keys) {
  if (!searchKey.value) return rows;
  const search = searchKey.value.toLowerCase();
  return rows.filter((item) => keys.some((key) => item[key]?.toLowerCase().includes(search)));
}

const filteredMusicList = computed(() =>
  filterTitles(store.listItemMusic, ['title', 'obtain', 'music'])
);
const filteredNonMusicList = computed(() =>
  filterTitles(store.listItemNonMusic, ['title', 'obtain'])
);

watch(
  () => route.fullPath,
  () => {
    if (['/title', '/title/:search'].includes(route.matched.at(-1)?.path))
      searchKey.value = route.query.search ?? route.params.search ?? '';
  },
  { immediate: true }
);

function updateQuery(tab) {
  router.push({ query: { tab, search: searchKey.value } });
}

onMounted(async () => {
  try {
    await store.fetchTitleData();
  } catch {
    loadFailed.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>
