<script setup>
import {ref, onMounted, watch, markRaw} from "vue";
import {useRoute} from "vue-router";
import axios from "axios";
import {useMusicDataStore} from '../store';
import router from "../router";
const store = useMusicDataStore()

const songID = ref(0);
const isLoading = ref(true);
const chuni_data = ref([]);
const id_data_target = ref({});
const song_data = ref({});

const haveUltima = ref(false);
const isWE = ref(false);

const tab = ref(null);

const fetchMusicData = async () => {
  await store.fetchChuniData()
  chuni_data.value = store.chuni_data;
  let i = 0;
  chuni_data.value.forEach((elem) => {
    id_data_target.value[elem.id] = i++;
  });
  song_data.value = chuni_data.value[id_data_target.value[songID.value]];
  song_data.value.levelLabel = [];
  i = 0;
  song_data.value.level.forEach((elem) => {
    song_data.value.levelLabel.push(["Basic", "Advanced", "Expert", "Master", "Ultima", "World's End"][i++] + " " + elem);
  });
  if(song_data.value.ds.length === 5) {
    haveUltima.value = true;
  }else if(song_data.value.ds.length === 6) {
    isWE.value = true;
    song_data.value.levelLabel = ["World's End"];
    tab.value = "World's End";
  }
  isLoading.value = false;
}

const gotoDsCalc = (ds) => {
  router.push({
    path: "/rating",
    query: {
      mode: "from_achievements",
      ds: ds,
    },
  });
};

const gotoLineCalc = (combo) => {
  router.push({
    path: "/rating",
    query: {
      mode: "from_line",
      combo: combo,
    },
  });
};

const getImageUrl =  (str) => {
  return "https://api-mfl.bangdream.moe/chuni/cover/"+str+".jpg";
}

onMounted(() => {
  songID.value = useRoute().params.id;
  isLoading.value = true;
  fetchMusicData();
});
</script>

<template>
<v-card>
  <v-card-title>歌曲信息</v-card-title>
  <v-card-subtitle>数据来源：diving fish api</v-card-subtitle>
  <v-container v-if="isLoading">
    <v-progress-linear indeterminate></v-progress-linear>
  </v-container>
  <v-container v-else>
    <div class="md:grid md:grid-cols-2">
      <div class="text-center">
        <img class="inline" :src="getImageUrl(songID)" />
      </div>
      <div>
        <p v-if="isWE" style="color: red">该谱面为 World's End 谱面</p>
        <p>歌曲名称：{{song_data.basic_info.title}}</p>
        <p>曲师：{{song_data.basic_info.artist}}</p>
        <p>分类：{{song_data.basic_info.genre}}</p>
        <p>版本：{{song_data.basic_info.from}}</p>
        <p>BPM：{{song_data.basic_info.bpm}}</p>
        <p v-if="haveUltima">有 Ultima 谱面</p>
        <v-btn v-on:click="$router.go(-1)">回到上一页</v-btn>
      </div>
    </div>
    <v-card style="margin-top: 20px">
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab v-for="level in song_data.levelLabel" :value="level">{{level}}</v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item v-for="(value, key) in song_data.levelLabel" :value="value">
            <v-card v-if="value !== 'World\'s End'">
              <p>定数：{{song_data.ds[key]}}</p>
              <p>最大连击数量：{{song_data.charts[key].combo}}</p>
              <p>谱师：{{song_data.charts[key].charter}}</p>
              <v-expansion-panels style="margin-top: 10px">
                <v-expansion-panel title="快捷填入计算器">
                  <v-expansion-panel-text>
                    <v-row style="padding-top: 10px;">
                      <v-col>
                        <v-btn v-on:click="gotoDsCalc(song_data.ds[key])">谱面Rating计算</v-btn>
                      </v-col>
                      <v-col>
                        <v-btn v-on:click="gotoLineCalc(song_data.charts[key].combo)">分数线计算</v-btn>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
            <v-card v-else>
              <p>谱面标签：{{song_data.level[5]}}</p>
              <p>最大连击数量：{{song_data.charts[5].combo}}</p>
              <p>谱师：{{song_data.charts[5].charter}}</p>
            </v-card>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</v-card>
</template>

<style scoped>

</style>
