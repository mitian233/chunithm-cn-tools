<template>
  <n-spin :show="isLoading">
    <n-space vertical>
      <n-radio-group v-model:value="mode" @update:value="clearResult">
        <n-radio-button value="randall">手气不错</n-radio-button>
        <n-radio-button value="randdsrange">定数范围随机</n-radio-button>
        <n-radio-button value="randgenre">流派随机</n-radio-button>
      </n-radio-group>

      <n-space vertical>
        <n-slider
          v-model:value="dsrangeSelected"
          range
          :min="1"
          :max="15.5"
          :step="0.1"
          :disabled="mode !== 'randdsrange'"
          :format-tooltip="(value) => value.toFixed(1)"
        />
        <n-text v-if="mode === 'randdsrange'">
          定数范围: {{ dsrangeSelected[0].toFixed(1) }} - {{ dsrangeSelected[1].toFixed(1) }}
        </n-text>

        <n-select
          v-model:value="genreSelected"
          :options="genreOptions"
          :disabled="mode !== 'randgenre'"
          placeholder="选择流派"
        />

        <n-space>
          <n-button type="primary" @click="randomSongHandler">试试手气</n-button>
          <n-button @click="clearResult">清空结果</n-button>
        </n-space>
      </n-space>

      <n-card v-if="randResult" style="margin-top: 16px">
        <n-grid :cols="2" :x-cols="1" responsive="screen">
          <n-gi>
            <n-space vertical align="center">
              <n-image
                :src="getImageUrl(randResult.id)"
                :img-props="{ style: { maxWidth: '100%' } }"
                fallback-src="https://via.placeholder.com/200x200?text=No+Image"
              />
            </n-space>
          </n-gi>
          <n-gi>
            <n-descriptions :column="1" label-placement="left">
              <n-descriptions-item label="歌曲名称">
                {{ randResult.basic_info?.title }}
              </n-descriptions-item>
              <n-descriptions-item label="艺人">
                {{ randResult.basic_info?.artist }}
              </n-descriptions-item>
              <n-descriptions-item label="分类">
                {{ randResult.basic_info?.genre }}
              </n-descriptions-item>
              <n-descriptions-item label="版本">
                {{ randResult.basic_info?.from }}
              </n-descriptions-item>
              <n-descriptions-item label="BPM">
                {{ randResult.basic_info?.bpm }}
              </n-descriptions-item>
              <n-descriptions-item label="等级">
                {{ randResult.level?.join(', ') }}
              </n-descriptions-item>
              <n-descriptions-item label="定数">
                {{ randResult.ds?.join(', ') }}
              </n-descriptions-item>
            </n-descriptions>
          </n-gi>
        </n-grid>
      </n-card>
    </n-space>
  </n-spin>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import { useMusicDataStore } from '../store';

const store = useMusicDataStore();

const mode = ref('randall');
const randResult = ref(null);
const isLoading = ref(true);
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
  switch (mode.value) {
    case 'randall':
      randomSongfromAll();
      break;
    case 'randdsrange':
      randInDsRange();
      break;
    case 'randgenre':
      randInGenre();
      break;
  }
};

const randomSongfromAll = () => {
  randResult.value = store.chuni_data[Math.floor(Math.random() * store.chuni_data.length)];
};

const randInDsRange = () => {
  const [min, max] = dsrangeSelected.value;
  const songsTargetArray = [];
  for (const song of store.chuni_data) {
    if (song.ds) {
      for (let i = 0; i < song.ds.length; i++) {
        if (song.ds[i] >= min && song.ds[i] <= max) {
          songsTargetArray.push(song);
          break;
        }
      }
    }
  }
  randResult.value = songsTargetArray[Math.floor(Math.random() * songsTargetArray.length)];
};

const randInGenre = () => {
  const songsTargetArray = [];
  for (const song of store.chuni_data) {
    if (song.basic_info.genre === genreSelected.value) {
      songsTargetArray.push(song);
    }
  }
  randResult.value = songsTargetArray[Math.floor(Math.random() * songsTargetArray.length)];
};

const clearResult = () => {
  randResult.value = null;
};

const getImageUrl = (str) => {
  return `https://cdn.jsdelivr.net/gh/mitian233/chunicover@cached/covers/${str}.jpg`;
};

onMounted(async () => {
  await store.fetchChuniData();
  isLoading.value = false;
});
</script>
