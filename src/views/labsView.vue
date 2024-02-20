<script setup>
import { ref } from "vue";
import RandomSong from "../components/randomSong.vue";

const lab_tab = ref('randomSong');
</script>

<template>
  <v-card>
    <v-card-title>实验室</v-card-title>
    <v-container>
      <v-spacer/>
      <v-container class="pa-1">
        <v-tabs v-model="lab_tab" grow>
          <v-tab label="随机歌曲" value="randomSong">随机歌曲</v-tab>
          <v-tab label="更多功能" value="more">更多功能</v-tab>
        </v-tabs>
        <v-window v-model="lab_tab">
          <v-window-item value="randomSong">
            <random-song />
          </v-window-item>
          <v-window-item value="more">
            <div class="flex flex-row justify-center items-center h-[50svh]">
              <p style="font-size: 1.5em">Work in progress...</p>
            </div>
          </v-window-item>
        </v-window>
      </v-container>
    </v-container>
  </v-card>
</template>

<style scoped>

</style>
