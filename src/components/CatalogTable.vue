<script setup>
import { computed, ref, watch } from 'vue';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { TooltipProvider } from 'reka-ui';

const props = defineProps({
  label: { type: String, required: true },
  columns: { type: Array, required: true },
  rows: { type: Array, required: true },
  loading: Boolean,
  virtual: Boolean,
  estimateSize: { type: Number, default: 44 },
  minWidth: { type: Number, default: 0 },
});

const viewport = ref(null);
const sort = ref(null);
const columnTracks = computed(() =>
  props.columns.map((column) => column.width ?? 'minmax(0, 1fr)').join(' ')
);
const sortedRows = computed(() => {
  if (!sort.value) return props.rows;
  const { key, direction } = sort.value;
  return props.rows.slice().sort((a, b) => {
    const left = a[key];
    const right = b[key];
    if (left == null) return right == null ? 0 : -direction;
    if (right == null) return direction;
    if (typeof left === 'number' && typeof right === 'number') return (left - right) * direction;
    if (typeof left === 'string' && typeof right === 'string')
      return left.localeCompare(right) * direction;
    return 0;
  });
});

const virtualizer = useVirtualizer(
  computed(() => {
    const rows = sortedRows.value;
    return {
      enabled: props.virtual,
      count: props.virtual ? rows.length : 0,
      getScrollElement: () => viewport.value,
      getItemKey: (index) => rows[index].id,
      estimateSize: () => props.estimateSize,
      overscan: 5,
      // The sticky header is a fixed 40px above the body in the scroll container.
      scrollMargin: 40,
    };
  })
);

const visibleRows = computed(() =>
  props.virtual
    ? virtualizer.value
        .getVirtualItems()
        .map(({ index, start, key }) => ({
          row: sortedRows.value[index],
          index,
          start: start - 40,
          key,
        }))
    : sortedRows.value.map((row, index) => ({ row, key: row.id, index }))
);

watch(
  sortedRows,
  () => {
    if (viewport.value) viewport.value.scrollTop = 0;
  },
  { flush: 'post' }
);

function toggleSort(key) {
  if (sort.value?.key !== key) sort.value = { key, direction: 1 };
  else if (sort.value.direction === 1) sort.value = { key, direction: -1 };
  else sort.value = null;
}

function measureRow(element) {
  if (props.virtual) virtualizer.value.measureElement(element);
}
</script>

<template>
  <div
    ref="viewport"
    class="catalog-scroll"
    :class="{ 'catalog-scroll--virtual': virtual }"
    :aria-label="label"
    tabindex="0"
    role="region"
  >
    <TooltipProvider :delay-duration="300">
      <table
        role="table"
        :aria-label="label"
        :aria-busy="loading"
        :aria-rowcount="rows.length + 1"
        class="catalog-table"
        :style="{ '--catalog-columns': columnTracks, minWidth: minWidth + 'px' }"
      >
        <thead role="rowgroup">
          <tr role="row" aria-rowindex="1">
            <th
              v-for="column in columns"
              :key="column.key"
              scope="col"
              role="columnheader"
              :aria-sort="
                column.sortable
                  ? sort?.key !== column.key
                    ? 'none'
                    : sort.direction === 1
                      ? 'ascending'
                      : 'descending'
                  : undefined
              "
            >
              <button
                v-if="column.sortable"
                class="catalog-sort"
                type="button"
                @click="toggleSort(column.key)"
              >
                {{ column.label }}
                <span aria-hidden="true">
                  {{ sort?.key !== column.key ? '↕' : sort.direction === 1 ? '↑' : '↓' }}
                </span>
              </button>
              <template v-else>{{ column.label }}</template>
            </th>
          </tr>
        </thead>
        <tbody
          role="rowgroup"
          :style="virtual ? { height: virtualizer.getTotalSize() + 'px' } : undefined"
        >
          <tr
            v-for="{ row, key, index, start } in visibleRows"
            :key="key"
            :ref="measureRow"
            role="row"
            :aria-rowindex="index + 2"
            :data-index="index"
            :class="{ 'catalog-virtual-row': virtual, 'catalog-stripe': index % 2 === 1 }"
            :style="virtual ? { transform: 'translateY(' + start + 'px)' } : undefined"
          >
            <td v-for="column in columns" :key="column.key" role="cell">
              <slot :name="column.key" :row="row" :value="row[column.key]">
                {{ row[column.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </TooltipProvider>
    <p v-if="loading || rows.length === 0" class="catalog-status" role="status">
      {{ loading ? '正在加载…' : '没有找到结果' }}
    </p>
  </div>
</template>

<style scoped>
.catalog-scroll {
  overflow: auto;
  border: 1px solid var(--ui-border);
  border-radius: 0.5rem;
}
.catalog-scroll--virtual {
  max-height: 600px;
}
.catalog-table {
  display: grid;
  width: 100%;
}
.catalog-table thead {
  position: sticky;
  z-index: 1;
  top: 0;
  background: var(--ui-surface);
  box-shadow: inset 0 -1px var(--ui-border);
}
.catalog-table thead tr {
  height: 40px;
}
.catalog-table tbody {
  position: relative;
}
.catalog-table tr {
  display: grid;
  grid-template-columns: var(--catalog-columns);
  align-items: stretch;
}
.catalog-table th,
.catalog-table td {
  display: grid;
  align-items: center;
  min-width: 0;
  padding: 0.375rem 0.625rem;
  text-align: left;
  overflow-wrap: anywhere;
}
.catalog-table td {
  border-bottom: 1px solid var(--ui-border);
}
.catalog-virtual-row {
  position: absolute;
  inset: 0 0 auto;
}
.catalog-stripe {
  background: var(--ui-bg);
}
.catalog-sort {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  white-space: nowrap;
  text-align: left;
}
.catalog-sort:hover {
  color: var(--ui-primary);
}
.catalog-sort span {
  color: var(--ui-muted);
}
.catalog-status {
  padding: 1.5rem 0.75rem;
  text-align: center;
  color: var(--ui-muted);
}
</style>
