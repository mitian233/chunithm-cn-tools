<template>
  <div class="space-y-4" :aria-busy="isLoading">
    <p v-if="isLoading" role="status">正在加载歌曲数据…</p>
    <RadioGroupRoot
      v-model="mode"
      aria-label="随机模式"
      class="flex flex-wrap gap-2"
      @update:model-value="clearResult"
    >
      <RadioGroupItem value="randall" class="ui-button ui-button--outline random-mode">
        手气不错
      </RadioGroupItem>
      <RadioGroupItem value="randdsrange" class="ui-button ui-button--outline random-mode">
        定数范围随机
      </RadioGroupItem>
      <RadioGroupItem value="randgenre" class="ui-button ui-button--outline random-mode">
        流派随机
      </RadioGroupItem>
    </RadioGroupRoot>

    <SliderRoot
      v-model="dsrangeSelected"
      class="random-slider"
      :min="1"
      :max="15.5"
      :step="0.1"
      :disabled="mode !== 'randdsrange'"
    >
      <SliderTrack class="random-slider-track">
        <SliderRange class="random-slider-range" />
      </SliderTrack>
      <SliderThumb class="random-slider-thumb" aria-label="最低定数" />
      <SliderThumb class="random-slider-thumb" aria-label="最高定数" />
    </SliderRoot>
    <p v-if="mode === 'randdsrange'">
      定数范围: {{ dsrangeSelected[0].toFixed(1) }} - {{ dsrangeSelected[1].toFixed(1) }}
    </p>

    <SelectRoot v-model="genreSelected" :disabled="mode !== 'randgenre'">
      <SelectTrigger
        class="ui-button ui-button--outline w-full justify-between"
        aria-label="选择流派"
      >
        <SelectValue placeholder="选择流派" />
        <SelectIcon aria-hidden="true">▾</SelectIcon>
      </SelectTrigger>
      <SelectPortal>
        <SelectContent class="random-select-content" position="popper" :side-offset="4">
          <SelectViewport>
            <SelectItem
              v-for="option in genreOptions"
              :key="option.value"
              :value="option.value"
              class="random-select-item"
            >
              <SelectItemText>{{ option.label }}</SelectItemText>
              <SelectItemIndicator aria-hidden="true">✓</SelectItemIndicator>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>

    <div class="flex flex-wrap gap-2">
      <button
        type="button"
        class="ui-button"
        :disabled="isLoading || loadFailed"
        @click="randomSongHandler"
      >
        试试手气
      </button>
      <button type="button" class="ui-button ui-button--outline" @click="clearResult">
        清空结果
      </button>
    </div>
    <p v-if="loadFailed" role="alert">歌曲数据加载失败，请刷新页面后重试。</p>
    <p v-else-if="noMatch" role="status">没有找到符合条件的歌曲，请调整条件后重试。</p>

    <div v-if="randResult" class="ui-card random-result">
      <div class="random-cover">
        <CoverPreview
          :src="getImageUrl(randResult.id)"
          :title="randResult.basic_info?.title || '歌曲'"
          fallback-src="https://via.placeholder.com/200x200?text=No+Image"
        />
      </div>
      <dl class="random-details">
        <dt>歌曲名称</dt>
        <dd>{{ randResult.basic_info?.title }}</dd>
        <dt>艺人</dt>
        <dd>{{ randResult.basic_info?.artist }}</dd>
        <dt>分类</dt>
        <dd>{{ randResult.basic_info?.genre }}</dd>
        <dt>版本</dt>
        <dd>{{ randResult.basic_info?.from }}</dd>
        <dt>BPM</dt>
        <dd>{{ randResult.basic_info?.bpm }}</dd>
        <dt>等级</dt>
        <dd>{{ randResult.level?.join(', ') }}</dd>
        <dt>定数</dt>
        <dd>{{ randResult.ds?.join(', ') }}</dd>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {
  RadioGroupRoot,
  RadioGroupItem,
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
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
import CoverPreview from './CoverPreview.vue';
import { useMusicDataStore } from '../store';

const store = useMusicDataStore();
const mode = ref('randall');
const randResult = ref(null);
const isLoading = ref(true);
const loadFailed = ref(false);
const noMatch = ref(false);
const dsrangeSelected = ref([1, 15.5]);
const genreSelected = ref('POPS & ANIME');

const genreOptions = [
  { label: 'POPS & ANIME', value: 'POPS & ANIME' },
  { label: 'niconico', value: 'niconico' },
  { label: '東方Project', value: '東方Project' },
  { label: 'VARIETY', value: 'VARIETY' },
  { label: 'ゲキマイ', value: 'ゲキマイ' },
  { label: 'イロドリミドリ', value: 'イロドリミドリ' },
  { label: 'ORIGINAL', value: 'ORIGINAL' },
];

const randomSongHandler = () => {
  let songs = store.chuni_data;
  if (mode.value === 'randdsrange') {
    const [min, max] = dsrangeSelected.value;
    songs = songs.filter((song) => song.ds?.some((ds) => ds >= min && ds <= max));
  } else if (mode.value === 'randgenre') {
    songs = songs.filter((song) => song.basic_info?.genre === genreSelected.value);
  }
  randResult.value = songs[Math.floor(Math.random() * songs.length)] || null;
  noMatch.value = !randResult.value;
};

const clearResult = () => {
  randResult.value = null;
  noMatch.value = false;
};

const getImageUrl = (str) => {
  return `https://cdn.jsdelivr.net/gh/mitian233/chunicover@cached/covers/${str}.jpg`;
};

onMounted(async () => {
  try {
    await store.fetchChuniData();
  } catch {
    loadFailed.value = true;
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.random-mode[data-state='checked'] {
  box-shadow: inset 0 0 0 1px var(--ui-primary);
  background: var(--ui-tag-bg);
  color: var(--ui-primary);
}
.random-slider {
  position: relative;
  display: flex;
  align-items: center;
  height: 24px;
  margin: 0 8px;
  touch-action: none;
  user-select: none;
}
.random-slider[data-disabled] {
  opacity: 0.5;
}
.random-slider-track {
  position: relative;
  flex: 1;
  height: 4px;
  border-radius: 9999px;
  background: var(--ui-border);
}
.random-slider-range {
  position: absolute;
  height: 100%;
  border-radius: inherit;
  background: var(--ui-primary);
}
.random-slider-thumb {
  display: block;
  width: 18px;
  height: 18px;
  border: 2px solid var(--ui-primary);
  border-radius: 50%;
  background: var(--ui-surface);
}
.random-slider-thumb:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: 3px;
}
.random-select-content {
  z-index: 150;
  min-width: var(--reka-select-trigger-width);
  max-height: var(--reka-select-content-available-height);
  overflow: auto;
  border: 1px solid var(--ui-border);
  border-radius: 6px;
  background: var(--ui-surface);
  color: var(--ui-text);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
.random-select-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  outline: none;
}
.random-select-item[data-highlighted] {
  background: var(--ui-tag-bg);
}
.random-result {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
.random-cover {
  display: flex;
  justify-content: center;
  align-items: start;
}
.random-details {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5rem 1rem;
}
.random-details dt {
  color: var(--ui-muted);
}
.random-details dd {
  min-width: 0;
  overflow-wrap: anywhere;
}
@media (max-width: 640px) {
  .random-result {
    grid-template-columns: 1fr;
  }
}
</style>
