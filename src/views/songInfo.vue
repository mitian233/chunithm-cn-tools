<template>
  <n-card title="歌曲信息">
    <template #header-extra>
      <n-text depth="3">数据来源：diving fish api</n-text>
    </template>
    <n-spin :show="isLoading">
      <n-space vertical v-if="!isLoading">
        <n-grid :cols="2" :x-cols="1" responsive="screen">
          <n-gi>
            <n-space vertical align="center">
              <n-image
                :src="getImageUrl(songID)"
                :img-props="{ style: { maxWidth: '100%' } }"
                fallback-src="https://via.placeholder.com/200x200?text=No+Image"
              />
            </n-space>
          </n-gi>
          <n-gi>
            <n-space vertical>
              <n-text v-if="isWE" type="error">该谱面为 World's End 谱面</n-text>
              <n-descriptions :column="1" label-placement="left">
                <n-descriptions-item label="歌曲名称">
                  {{ song_data.basic_info?.title }}
                </n-descriptions-item>
                <n-descriptions-item label="曲师">
                  {{ song_data.basic_info?.artist }}
                </n-descriptions-item>
                <n-descriptions-item label="分类">
                  {{ song_data.basic_info?.genre }}
                </n-descriptions-item>
                <n-descriptions-item label="版本">
                  {{ song_data.basic_info?.from }}
                </n-descriptions-item>
                <n-descriptions-item label="BPM">
                  {{ song_data.basic_info?.bpm }}
                </n-descriptions-item>
              </n-descriptions>
              <n-text v-if="haveUltima" type="info">有 Ultima 谱面</n-text>
              <n-button @click="$router.go(-1)">回到上一页</n-button>
            </n-space>
          </n-gi>
        </n-grid>

        <n-card style="margin-top: 20px">
          <n-tabs v-model:value="tab" type="line">
            <n-tab-pane
              v-for="(level, index) in song_data.levelLabel"
              :key="index"
              :name="level"
              :tab="level"
            >
              <n-card v-if="level !== 'World\'s End'">
                <n-descriptions :column="1" label-placement="left">
                  <n-descriptions-item label="定数">
                    {{ song_data.ds[index] }}
                  </n-descriptions-item>
                  <n-descriptions-item label="最大连击数量">
                    {{ song_data.charts[index]?.combo }}
                  </n-descriptions-item>
                  <n-descriptions-item label="谱师">
                    {{ song_data.charts[index]?.charter }}
                  </n-descriptions-item>
                </n-descriptions>
                <n-collapse style="margin-top: 10px">
                  <n-collapse-item title="快捷填入计算器" name="calc">
                    <n-space>
                      <n-button @click="gotoDsCalc(song_data.ds[index])">谱面Rating计算</n-button>
                      <n-button @click="gotoLineCalc(song_data.charts[index]?.combo)">
                        分数线计算
                      </n-button>
                    </n-space>
                  </n-collapse-item>
                </n-collapse>
              </n-card>
              <n-card v-else>
                <n-descriptions :column="1" label-placement="left">
                  <n-descriptions-item label="谱面标签">
                    {{ song_data.level[5] }}
                  </n-descriptions-item>
                  <n-descriptions-item label="最大连击数量">
                    {{ song_data.charts[5]?.combo }}
                  </n-descriptions-item>
                  <n-descriptions-item label="谱师">
                    {{ song_data.charts[5]?.charter }}
                  </n-descriptions-item>
                </n-descriptions>
              </n-card>
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </n-space>
    </n-spin>
  </n-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMusicDataStore } from '../store';

const route = useRoute();
const router = useRouter();
const store = useMusicDataStore();

const songID = ref(0);
const isLoading = ref(true);
const chuni_data = ref([]);
const id_data_target = ref({});
const song_data = ref({});

const haveUltima = ref(false);
const isWE = ref(false);

const tab = ref(null);

const fetchMusicData = async () => {
  await store.fetchChuniData();
  chuni_data.value = store.chuni_data;
  let i = 0;
  chuni_data.value.forEach((elem) => {
    id_data_target.value[elem.id] = i++;
  });
  song_data.value = chuni_data.value[id_data_target.value[songID.value]];
  song_data.value.levelLabel = [];
  i = 0;
  song_data.value.level.forEach((elem) => {
    song_data.value.levelLabel.push(
      ['Basic', 'Advanced', 'Expert', 'Master', 'Ultima', "World's End"][i++] + ' ' + elem
    );
  });
  if (song_data.value.ds.length === 5) {
    haveUltima.value = true;
  } else if (song_data.value.ds.length === 6) {
    isWE.value = true;
    song_data.value.levelLabel = ["World's End"];
    tab.value = "World's End";
  }
  isLoading.value = false;
};

const gotoDsCalc = (ds) => {
  router.push({
    path: '/rating',
    query: {
      mode: 'from_achievements',
      ds: ds,
    },
  });
};

const gotoLineCalc = (combo) => {
  router.push({
    path: '/rating',
    query: {
      mode: 'from_line',
      combo: combo,
    },
  });
};

const getImageUrl = (str) => {
  return `https://cdn.jsdelivr.net/gh/mitian233/chunicover@cached/covers/${str}.jpg`;
};

onMounted(() => {
  songID.value = route.params.id;
  isLoading.value = true;
  fetchMusicData();
});
</script>
