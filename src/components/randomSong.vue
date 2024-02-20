<script setup>
import {onMounted, ref} from "vue";
import {useMusicDataStore} from '../store';
import {is} from "immutable";
const store = useMusicDataStore()

const tab = ref('randall')
const randResult = ref(null)
const isLoading = ref(true)

const randomSongfromAll = () => {
  const rand = Math.floor(Math.random() * store.chuni_data.length)
  randResult.value = store.chuni_data[rand]
}

onMounted(async () => {
  await store.fetchChuniData()
  isLoading.value = false
})
</script>

<template>
  <v-container v-if="isLoading">
    <v-progress-linear indeterminate></v-progress-linear>
  </v-container>
  <v-container v-else>
    <v-tabs v-model="tab" grow>
      <v-tab label="手气不错" value="randall">手气不错</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="randall" class="p-2 text-center">
        <v-btn color="primary" class="inline-block" v-on:click="randomSongfromAll">试试手气</v-btn>
      </v-window-item>
    </v-window>
    {{randResult}}
  </v-container>
</template>

<style scoped>

</style>
