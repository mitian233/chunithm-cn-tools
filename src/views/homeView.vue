<template>
  <n-card>
    <n-space vertical align="center" justify="center" style="padding: 40px 0">
      <img src="../assets/logo.png" alt="logo" style="width: 300px" />
      <n-h1 style="margin-top: 40px">国服工具箱</n-h1>
      <n-button type="primary" size="large" @click="goToSong" style="margin-top: 30px">
        <template #icon>
          <n-icon :component="ArrowForwardOutline" />
        </template>
        开始使用
      </n-button>
    </n-space>
  </n-card>
</template>

<script setup>
import { ArrowForwardOutline } from '@vicons/ionicons5';

function goToSong() {
  window.location.href = '/song';
}
</script>
