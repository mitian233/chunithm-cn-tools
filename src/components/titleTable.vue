<template>
  <CatalogTable
    label="称号"
    :columns="headers"
    :rows="titleList"
    :loading="loading"
    :min-width="400"
  >
    <template #color="{ value }">
      <span v-if="value" class="ui-tag justify-self-start">{{ value }}</span>
    </template>
    <template #title="{ value }"><CatalogText :text="value" /></template>
    <template #music="{ value }"><CatalogText :text="value" /></template>
    <template #obtain="{ value }"><CatalogText :text="value" /></template>
  </CatalogTable>
</template>

<script setup>
import CatalogTable from './CatalogTable.vue';
import CatalogText from './CatalogText.vue';

defineProps({
  titleList: { type: Array, required: true },
  headers: { type: Array, required: true },
  loading: Boolean,
});
</script>
