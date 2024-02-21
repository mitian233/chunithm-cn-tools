<script setup>
import {onMounted, ref, watch} from "vue";
import {useMusicDataStore} from '../store';
const store = useMusicDataStore()

const mode = ref('randall')
const randResult = ref(null)
const isLoading = ref(true)
const dsrange_selected = ref([1,15.5])
const genre_selected = ref('POPS & ANIME')
const level_selected = ref('Master')

const randomSongHandler = () => {
  switch (mode.value) {
    case 'randall':
      randomSongfromAll()
      break
    case 'randdsrange':
      randInDsRange()
      break
    case 'randgenre':
      randInGenre()
      break
  }
}

const randomSongfromAll = () => {
  randResult.value = store.chuni_data[Math.floor(Math.random() * store.chuni_data.length)]
}

const randInDsRange = () => {
  const [min, max] = dsrange_selected.value
  let songsTargetArray = []
  for(let i = 0; i < store.chuni_data.length; i++) {
    const song = store.chuni_data[i]
    if(song.ds){
      for(let i = 0; i < song.ds.length; i++){
        if(song.ds[i] >= min && song.ds[i] <= max){
          songsTargetArray.push(song)
          break
        }
      }
    }
  }
  randResult.value = songsTargetArray[Math.floor(Math.random() * songsTargetArray.length)]
}

const randInGenre = () => {
  let songsTargetArray = []
  for(let i = 0; i < store.chuni_data.length; i++) {
    const song = store.chuni_data[i]
    if(song.basic_info.genre === genre_selected.value){
      songsTargetArray.push(song)
    }
  }
  randResult.value = songsTargetArray[Math.floor(Math.random() * songsTargetArray.length)]
}

const clearResult = () => {
  randResult.value = null
}

const getImageUrl =  (str) => {
  return "https://api-mfl.bangdream.moe/chuni/cover/"+str+".jpg";
}

onMounted(async () => {
  await store.fetchChuniData()
  isLoading.value = false
})

watch(() => mode.value, () => {
  clearResult()
})
</script>

<template>
  <v-container v-if="isLoading">
    <v-progress-linear indeterminate></v-progress-linear>
  </v-container>
  <v-container v-else>
    <v-radio-group inline v-model="mode" grow>
      <v-radio label="手气不错" value="randall" />
      <v-radio label="定数范围随机" value="randdsrange" />
      <v-radio label="流派随机" value="randgenre" />
    </v-radio-group>
    <v-container>
      <v-range-slider
          color="primary"
          v-model="dsrange_selected"
          :max="15.5"
          :min="1"
          :step="0.1"
          strict
          :disabled="mode !== 'randdsrange'" >
        <template v-slot:prepend>
          <p style="width: 35px;text-align: right">{{dsrange_selected[0]}}</p>
        </template>
        <template v-slot:append>
          <p style="width: 35px;text-align: left">{{dsrange_selected[1]}}</p>
        </template>
      </v-range-slider>
      <v-select
          v-model="genre_selected"
          label="流派选择器"
          :items="['POPS & ANIME', 'niconico', '東方Project', 'VARIETY', 'ゲキマイ', 'イロドリミドリ', 'ORIGINAL']"
          :disabled="mode !== 'randgenre'"
      />
      <div class="flex justify-center gap-3">
        <v-btn color="primary" class="inline-block" v-on:click="randomSongHandler">试试手气</v-btn>
        <v-btn v-on:click="clearResult">清空结果</v-btn>
      </div>
    </v-container>
    <v-container v-if="randResult">
      <table>
        <tr>
          <td style="border: 5px">
            <img :src="getImageUrl(randResult.id)" />
          </td>
        </tr>
        <tr>
          <td style="border: 5px">
            <p>歌曲名称：{{randResult.basic_info.title}}</p>
            <p>艺人：{{randResult.basic_info.artist}}</p>
            <p>分类：{{randResult.basic_info.genre}}</p>
            <p>版本：{{randResult.basic_info.from}}</p>
            <p>BPM：{{randResult.basic_info.bpm}}</p>
            <p>等级：{{randResult.level}}</p>
            <p>定数：{{randResult.ds}}</p>
          </td>
        </tr>
      </table>
    </v-container>
  </v-container>
</template>

<style scoped>

</style>
