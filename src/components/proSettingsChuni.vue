<template>
  <section class="ui-card mb-4 space-y-3">
    <div class="flex items-center justify-between gap-3">
      <span>按难度筛选</span>
      <button type="button" class="ui-button ui-button--outline" @click="toggleAllLevels">
        {{ levelFilter.length === levelFilterItems.length ? '取消全选' : '全选' }}
      </button>
    </div>
    <ToggleGroupRoot
      v-model="selectedLevels"
      type="multiple"
      class="flex flex-wrap gap-2"
      aria-label="按难度筛选"
    >
      <ToggleGroupItem
        v-for="item in levelFilterItems"
        :key="item.value"
        :value="String(item.value)"
        class="ui-button ui-button--outline difficulty-toggle"
        :style="{ '--difficulty-color': item.color }"
      >
        {{ item.text }}
      </ToggleGroupItem>
    </ToggleGroupRoot>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div v-for="selector in selectors" :key="selector.key" class="flex min-w-0 gap-2">
        <SelectRoot
          :model-value="selector.value ?? undefined"
          @update:model-value="setSelector(selector.key, $event)"
        >
          <SelectTrigger
            class="ui-button ui-button--outline min-w-0 flex-1 justify-between"
            :aria-label="selector.placeholder"
          >
            <SelectValue :placeholder="selector.placeholder" />
            <SelectIcon aria-hidden="true">▾</SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectContent class="filter-select-content" position="popper" :side-offset="4">
              <SelectViewport>
                <SelectItem
                  v-for="option in selector.options"
                  :key="option.value"
                  :value="option.value"
                  class="filter-select-item"
                >
                  <SelectItemText>{{ option.label }}</SelectItemText>
                  <SelectItemIndicator aria-hidden="true">✓</SelectItemIndicator>
                </SelectItem>
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
        <button
          type="button"
          class="ui-button ui-button--outline"
          :aria-label="`清空${selector.placeholder.slice(2)}`"
          @click="setSelector(selector.key, null)"
        >
          清空
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import {
  ToggleGroupRoot,
  ToggleGroupItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from 'reka-ui';

const props = defineProps({
  musicData: {
    type: Array,
    default: () => [],
  },
  musicDataDict: {
    type: Object,
    default: () => ({}),
  },
});

defineEmits(['filter']);

const levelFilter = ref([]);
const version = ref(null);
const genre = ref(null);

const levelFilterItems = [
  { text: 'Basic', value: 0, color: 'var(--ui-basic)' },
  { text: 'Advanced', value: 1, color: 'var(--ui-advanced)' },
  { text: 'Expert', value: 2, color: 'var(--ui-expert)' },
  { text: 'Master', value: 3, color: 'var(--ui-master)' },
  { text: 'Ultima', value: 4, color: 'var(--ui-ultima)' },
  { text: "World's End", value: 5, color: 'var(--ui-worlds-end)' },
];

const selectedLevels = computed({
  get: () => levelFilter.value.map(String),
  set: (values) => {
    levelFilter.value = values.map(Number);
  },
});

const versionOptions = computed(() => {
  if (!props.musicData) return [];
  const versions = [...new Set(props.musicData.map((elem) => elem.basic_info?.from))];
  return versions
    .filter((v) => typeof v === 'string' && v !== '')
    .map((v) => ({ label: v, value: v }));
});

const genreOptions = computed(() => {
  if (!props.musicData) return [];
  const genres = [...new Set(props.musicData.map((elem) => elem.basic_info?.genre))];
  return genres
    .filter((g) => typeof g === 'string' && g !== '')
    .map((g) => ({ label: g, value: g }));
});

const selectors = computed(() => [
  { key: 'version', value: version.value, options: versionOptions.value, placeholder: '选择版本' },
  { key: 'genre', value: genre.value, options: genreOptions.value, placeholder: '选择歌曲类别' },
]);

function setSelector(key, value) {
  if (key === 'version') version.value = value ?? null;
  else genre.value = value ?? null;
}

function toggleAllLevels() {
  if (levelFilter.value.length === levelFilterItems.length) {
    levelFilter.value = [];
  } else {
    levelFilter.value = levelFilterItems.map((i) => i.value);
  }
}

function filter(item) {
  return (
    levelFilter.value.includes(item.level_index) &&
    (!version.value ||
      (props.musicDataDict[item.mid] &&
        props.musicDataDict[item.mid].basic_info?.from === version.value)) &&
    (!genre.value ||
      (props.musicDataDict[item.mid] &&
        props.musicDataDict[item.mid].basic_info?.genre === genre.value))
  );
}

function reset() {
  levelFilter.value = [0, 1, 2, 3, 4, 5];
  version.value = null;
  genre.value = null;
}

onMounted(() => {
  reset();
});

defineExpose({
  filter,
  reset,
});
</script>

<style scoped>
.difficulty-toggle[data-state='on'] {
  color: var(--difficulty-color);
  box-shadow: inset 0 0 0 1px var(--difficulty-color);
  background-color: var(--ui-tag-bg);
}

.filter-select-content {
  z-index: 50;
  min-width: var(--reka-select-trigger-width);
  max-height: var(--reka-select-content-available-height);
  overflow: auto;
  border: 1px solid var(--ui-border);
  border-radius: 0.375rem;
  background: var(--ui-surface);
  color: var(--ui-text);
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);
}

.filter-select-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
}

.filter-select-item[data-highlighted] {
  outline: none;
  background: var(--ui-tag-bg);
}
</style>
