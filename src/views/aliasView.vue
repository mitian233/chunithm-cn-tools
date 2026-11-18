<template>
  <section class="ui-card flex min-w-0 flex-col gap-3">
    <header class="flex flex-wrap items-baseline justify-between gap-x-3">
      <h1 class="text-xl font-semibold">别名速查</h1>
      <p class="text-sm text-[var(--ui-muted)]">
        数据来源
        <a
          class="ui-link"
          href="https://docs.qq.com/sheet/DY3FoeWRLdERLRUxB"
          target="_blank"
          rel="noopener noreferrer"
        >
          腾讯文档
        </a>
      </p>
    </header>
    <CatalogSearch v-model="searchKey" placeholder="查找名称/别名" />
    <p v-if="loadFailed" role="alert" class="text-[var(--ui-expert)]">
      别名资料加载失败，请刷新后重试。
    </p>
    <CatalogTable
      v-else
      label="歌曲别名"
      :columns="columns"
      :rows="filteredData"
      :loading="isLoading"
      virtual
    >
      <template #id="{ row }">
        <RouterLink class="ui-link justify-self-start" :to="'/song/id/' + row.id">
          {{ row.id }}
        </RouterLink>
      </template>
      <template #song_name="{ row }">
        <RouterLink class="ui-link block min-w-0" :to="'/song/id/' + row.id">
          <CatalogText :text="row.song_name" />
        </RouterLink>
      </template>
      <template #alias="{ value }">
        <div v-if="Array.isArray(value)" class="flex flex-wrap gap-1">
          <span v-for="(alias, i) in value" :key="i" class="ui-tag">{{ alias }}</span>
        </div>
        <template v-else>{{ value }}</template>
      </template>
    </CatalogTable>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import CatalogSearch from '../components/CatalogSearch.vue';
import CatalogTable from '../components/CatalogTable.vue';
import CatalogText from '../components/CatalogText.vue';
import { useAliasDataStore } from '../store';

const store = useAliasDataStore();
const isLoading = ref(true);
const loadFailed = ref(false);
const searchKey = ref('');
const columns = [
  { label: 'ID', key: 'id', width: 'clamp(44px, 9vw, 100px)' },
  { label: '标题', key: 'song_name', width: 'minmax(0, 2fr)' },
  { label: '别名', key: 'alias', width: 'minmax(0, 3fr)' },
];

const filteredData = computed(() => {
  if (!searchKey.value) return store.alias_list;
  const search = searchKey.value.toLowerCase();
  return store.alias_list.filter((item) => {
    const matchId = String(item.id).toLowerCase().includes(search);
    const matchName = item.song_name?.toLowerCase().includes(search);
    const matchAlias = Array.isArray(item.alias)
      ? item.alias.some((alias) => alias.toLowerCase().includes(search))
      : String(item.alias).toLowerCase().includes(search);
    return matchId || matchName || matchAlias;
  });
});

onMounted(async () => {
  try {
    await store.fetchAliasData();
  } catch {
    loadFailed.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>
