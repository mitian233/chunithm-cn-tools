<template>
  <n-card title="实验室">
    <n-tabs v-model:value="labTab" type="line" animated>
      <n-tab-pane name="randomSong" tab="随机歌曲">
        <random-song />
      </n-tab-pane>
      <n-tab-pane name="more" tab="更多功能">
        <n-space vertical align="center" justify="center" style="height: 50vh">
          <n-text style="font-size: 1.5em">Work in progress...</n-text>
        </n-space>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup>
import { ref } from 'vue';
import RandomSong from '../components/randomSong.vue';

const labTab = ref('randomSong');
</script>
