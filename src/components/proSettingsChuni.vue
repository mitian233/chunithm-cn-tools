<template>
  <n-card size="small" style="margin-bottom: 16px">
    <n-space vertical>
      <n-space align="center" justify="space-between">
        <n-text>按难度筛选</n-text>
        <n-button size="small" @click="toggleAllLevels">
          {{ levelFilter.length === levelFilterItems.length ? '取消全选' : '全选' }}
        </n-button>
      </n-space>
      <n-space>
        <n-tag
          v-for="item in levelFilterItems"
          :key="item.value"
          :type="levelFilter.includes(item.value) ? getLevelType(item.value) : 'default'"
          :checked="levelFilter.includes(item.value)"
          checkable
          @update:checked="toggleLevel(item.value)"
        >
          {{ item.text }}
        </n-tag>
      </n-space>
      <n-grid :cols="2" :x-gap="16">
        <n-gi>
          <n-select
            v-model:value="version"
            :options="versionOptions"
            placeholder="选择版本"
            clearable
          />
        </n-gi>
        <n-gi>
          <n-select
            v-model:value="genre"
            :options="genreOptions"
            placeholder="选择歌曲类别"
            clearable
          />
        </n-gi>
      </n-grid>
    </n-space>
  </n-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

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

const emit = defineEmits(['filter']);

const levelFilter = ref([]);
const version = ref(null);
const genre = ref(null);

const levelFilterItems = [
  { text: 'Basic', value: 0 },
  { text: 'Advanced', value: 1 },
  { text: 'Expert', value: 2 },
  { text: 'Master', value: 3 },
  { text: 'Ultima', value: 4 },
  { text: "World's End", value: 5 },
];

const levelTypes = {
  0: 'success',
  1: 'warning',
  2: 'error',
  3: 'default',
  4: 'default',
  5: 'info',
};

const versionOptions = computed(() => {
  if (!props.musicData) return [];
  const versions = [...new Set(props.musicData.map((elem) => elem.basic_info?.from))];
  return versions.map((v) => ({ label: v, value: v }));
});

const genreOptions = computed(() => {
  if (!props.musicData) return [];
  const genres = [...new Set(props.musicData.map((elem) => elem.basic_info?.genre))];
  return genres.map((g) => ({ label: g, value: g }));
});

function getLevelType(index) {
  return levelTypes[index] || 'default';
}

function toggleLevel(value) {
  const index = levelFilter.value.indexOf(value);
  if (index === -1) {
    levelFilter.value.push(value);
  } else {
    levelFilter.value.splice(index, 1);
  }
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
