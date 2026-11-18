<template>
  <CatalogTable
    label="歌曲谱面"
    :columns="columns"
    :rows="filteredData"
    :loading="loading"
    virtual
    :estimate-size="53"
    :min-width="1200"
  >
    <template #cover="{ row }">
      <CoverPreview :src="getImageUrl(row._id)" :title="row.title" thumbnail />
    </template>
    <template #title="{ value }"><CatalogText :text="value" /></template>
    <template #level_label="{ row }">
      <span class="ui-tag catalog-level" :style="{ color: levelColors[row.level_index] }">
        {{ row.level_label }}
      </span>
    </template>
    <template #charter="{ value }"><CatalogText :text="value" /></template>
    <template #genre="{ value }"><CatalogText :text="value" /></template>
    <template #from="{ value }"><CatalogText :text="value" /></template>
    <template #action="{ row }">
      <RouterLink class="ui-link justify-self-start" :to="'/song/id/' + row._id">
        查看详细
      </RouterLink>
    </template>
  </CatalogTable>
</template>

<script setup>
import { computed } from 'vue';
import CatalogTable from './CatalogTable.vue';
import CatalogText from './CatalogText.vue';
import CoverPreview from './CoverPreview.vue';

const props = defineProps({
  items: { type: Array, default: () => [] },
  search: { type: String, default: '' },
  loading: Boolean,
  filterList: { type: Array, default: () => ['title'] },
});

const levelColors = [
  'var(--ui-basic)',
  'var(--ui-advanced)',
  'var(--ui-expert)',
  'var(--ui-master)',
  'var(--ui-ultima)',
  'var(--ui-worlds-end)',
];

function getImageUrl(id) {
  return 'https://cdn.jsdelivr.net/gh/mitian233/chunicover@cached/covers/' + id + '.jpg';
}

const filteredData = computed(() => {
  if (!props.search) return props.items;
  const search = props.search.toLowerCase();
  const fields = props.filterList.length ? props.filterList : ['title'];
  return props.items.filter((item) =>
    fields.some((field) =>
      String(item[field] ?? '')
        .toLowerCase()
        .includes(search)
    )
  );
});

const columns = [
  { label: '封面', key: 'cover', width: '64px' },
  { label: '乐曲ID', key: '_id', width: '96px', sortable: true },
  { label: '乐曲名', key: 'title', width: 'minmax(200px, 2fr)' },
  { label: '难度标签', key: 'level_label', width: '140px', sortable: true },
  { label: '定数', key: 'ds', width: '80px', sortable: true },
  { label: '谱面作者', key: 'charter', width: 'minmax(120px, 1fr)' },
  { label: 'MAX COMBO', key: 'combo', width: '144px', sortable: true },
  { label: '流派', key: 'genre', width: 'minmax(100px, 1fr)' },
  { label: '版本', key: 'from', width: 'minmax(100px, 1fr)' },
  { label: '操作', key: 'action', width: '100px' },
];
</script>

<style scoped>
.catalog-level {
  justify-self: start;
}
</style>
