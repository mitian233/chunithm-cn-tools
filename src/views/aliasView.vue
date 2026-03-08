<template>
  <n-card title="别名速查">
    <template #header-extra>
      <n-text depth="3">
        数据来源
        <n-a href="https://docs.qq.com/sheet/DY3FoeWRLdERLRUxB" target="_blank">腾讯文档</n-a>
      </n-text>
    </template>
    <n-space vertical>
      <n-input v-model:value="searchKey" placeholder="查找名称/别名" clearable>
        <template #prefix>
          <n-icon :component="SearchOutline" />
        </template>
      </n-input>
      <n-data-table
        :columns="columns"
        :data="filteredData"
        :loading="isLoading"
        :pagination="false"
        striped
        virtual-scroll
        :max-height="600"
      />
    </n-space>
  </n-card>
</template>

<script setup>
import { h, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { NTag } from 'naive-ui';
import { SearchOutline } from '@vicons/ionicons5';
import { useAliasDataStore } from '../store';

const router = useRouter();
const store = useAliasDataStore();
const isLoading = ref(true);
const searchKey = ref('');

const columns = [
  {
    title: 'ID',
    key: 'id',
    width: 100,
    render(row) {
      return h(
        'a',
        {
          style: { cursor: 'pointer', color: 'var(--n-text-color)' },
          onClick: () => router.push(`/song/id/${row.id}`),
        },
        row.id
      );
    },
  },
  {
    title: '标题',
    key: 'song_name',
    ellipsis: { tooltip: true },
    render(row) {
      return h(
        'a',
        {
          style: { cursor: 'pointer', color: 'var(--n-text-color)' },
          onClick: () => router.push(`/song/id/${row.id}`),
        },
        row.song_name
      );
    },
  },
  {
    title: '别名',
    key: 'alias',
    render(row) {
      if (Array.isArray(row.alias)) {
        return h(
          'div',
          { style: { display: 'flex', flexWrap: 'wrap', gap: '4px' } },
          row.alias.map((a) =>
            h(NTag, { size: 'small', style: { margin: '2px' } }, { default: () => a })
          )
        );
      }
      return row.alias;
    },
  },
];

const filteredData = computed(() => {
  if (!searchKey.value || !store.alias_list) return store.alias_list || [];
  const search = searchKey.value.toLowerCase();
  return store.alias_list.filter((item) => {
    const matchId = String(item.id).toLowerCase().includes(search);
    const matchName = item.song_name?.toLowerCase().includes(search);
    const matchAlias = Array.isArray(item.alias)
      ? item.alias.some((a) => a.toLowerCase().includes(search))
      : String(item.alias).toLowerCase().includes(search);
    return matchId || matchName || matchAlias;
  });
});

onMounted(async () => {
  await store.fetchAliasData();
  isLoading.value = false;
});
</script>
