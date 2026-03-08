<template>
  <n-data-table
    :columns="columns"
    :data="filteredData"
    :loading="loading"
    :pagination="pagination"
    :row-key="(row) => row.id"
    :scroll-x="1200"
    :max-height="600"
    striped
    virtual-scroll
  />
</template>

<script setup>
import { h, computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { NTag, NButton, NImage, NSpace } from 'naive-ui';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  search: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  music_data_dict: {
    type: Object,
    default: () => ({}),
  },
  filterList: {
    type: Array,
    default: () => ['title'],
  },
});

const router = useRouter();

const pagination = ref({
  pageSize: 50,
  showSizePicker: true,
  pageSizes: [25, 50, 100, 200],
});

const levelColors = {
  0: 'success',
  1: 'warning',
  2: 'error',
  3: 'default',
  4: 'default',
  5: 'info',
};

function getImageUrl(str) {
  return `https://cdn.jsdelivr.net/gh/mitian233/chunicover@cached/covers/${str}.jpg`;
}

function getLevelType(index) {
  return levelColors[index] || 'default';
}

const filteredData = computed(() => {
  if (!props.search || !props.items) return props.items || [];

  const searchLower = props.search.toLowerCase();
  const filterFields = props.filterList?.length > 0 ? props.filterList : ['title'];

  return props.items.filter((item) => {
    return filterFields.some((field) => {
      const value = item[field];
      if (value === undefined || value === null) return false;
      return String(value).toLowerCase().includes(searchLower);
    });
  });
});

const columns = [
  {
    title: '封面',
    key: '_id',
    width: 60,
    render(row) {
      return h(NImage, {
        width: 40,
        height: 40,
        src: getImageUrl(row._id),
        lazy: true,
        objectFit: 'cover',
        style: { borderRadius: '4px' },
      });
    },
  },
  {
    title: '乐曲ID',
    key: '_id',
    width: 80,
    sorter: 'default',
  },
  {
    title: '乐曲名',
    key: 'title',
    width: 200,
    ellipsis: { tooltip: true },
  },
  {
    title: '难度标签',
    key: 'level_label',
    width: 140,
    sorter: 'default',
    render(row) {
      return h(
        NTag,
        { type: getLevelType(row.level_index), size: 'small' },
        { default: () => row.level_label }
      );
    },
  },
  {
    title: '定数',
    key: 'ds',
    width: 80,
    sorter: 'default',
  },
  {
    title: '谱面作者',
    key: 'charter',
    width: 120,
    ellipsis: { tooltip: true },
  },
  {
    title: 'MAX COMBO',
    key: 'combo',
    width: 100,
    sorter: 'default',
  },
  {
    title: '流派',
    key: 'genre',
    width: 100,
    ellipsis: { tooltip: true },
  },
  {
    title: '版本',
    key: 'from',
    width: 100,
    ellipsis: { tooltip: true },
  },
  {
    title: '操作',
    key: 'action',
    width: 100,
    fixed: 'right',
    render(row) {
      return h(
        NButton,
        {
          size: 'small',
          type: 'primary',
          onClick: () => router.push(`/song/id/${row._id}`),
        },
        { default: () => '查看详细' }
      );
    },
  },
];
</script>
