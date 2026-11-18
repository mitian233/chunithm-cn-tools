<script setup>
import { ref } from 'vue';
import { CloseOutline, SearchOutline } from '@vicons/ionicons5';

const query = defineModel({ type: String, default: '' });
defineProps({ placeholder: { type: String, required: true } });
const input = ref(null);

function clear() {
  query.value = '';
  input.value?.focus();
}
</script>

<template>
  <div class="catalog-search">
    <SearchOutline class="h-4 w-4 shrink-0" aria-hidden="true" />
    <input
      ref="input"
      v-model="query"
      type="text"
      :placeholder="placeholder"
      :aria-label="placeholder"
    />
    <button
      v-if="query"
      type="button"
      class="grid shrink-0 place-items-center rounded p-1"
      aria-label="清空搜索"
      @click="clear"
    >
      <CloseOutline class="h-4 w-4" aria-hidden="true" />
    </button>
  </div>
</template>

<style scoped>
.catalog-search {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.5rem;
  padding: 0 0.625rem;
  border: 1px solid var(--ui-border);
  border-radius: 0.375rem;
  color: var(--ui-muted);
}
.catalog-search:focus-within {
  border-color: var(--ui-primary);
}
.catalog-search input {
  width: 100%;
  min-width: 0;
  color: var(--ui-text);
  background: transparent;
  outline: none;
}
.catalog-search input::placeholder {
  color: var(--ui-muted);
}
</style>
