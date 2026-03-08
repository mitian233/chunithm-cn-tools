<template>
  <n-data-table
    :columns="columns"
    :data="titleList || []"
    :loading="loading"
    :pagination="false"
    striped
  />
</template>

<script setup>
import { h, computed } from 'vue';
import { NTag } from 'naive-ui';

const props = defineProps({
  search: {
    type: String,
    default: '',
  },
  titleList: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  headers: {
    type: Array,
    default: () => [],
  },
});

const columns = computed(() => {
  return props.headers.map((header) => ({
    title: header.title,
    key: header.value,
    ellipsis: { tooltip: true },
    render(row) {
      const value = row[header.value];
      if (header.value === 'color' && value) {
        return h(NTag, { color: { color: value }, size: 'small' }, { default: () => value });
      }
      return value;
    },
  }));
});
</script>
