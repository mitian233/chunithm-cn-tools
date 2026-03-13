<template>
  <n-card class="card-hover-lift">
    <n-space vertical align="center" justify="center" style="padding: 40px 0">
      <img
        src="../assets/logo.png"
        alt="logo"
        class="animate-fade-in-scale opacity-0"
        style="width: 300px"
      />
      <n-h1 class="animate-fade-in-up opacity-0 stagger-2" style="margin-top: 40px">
        国服工具箱
      </n-h1>
      <n-button
        type="primary"
        size="large"
        class="animate-fade-in-up opacity-0 stagger-3 btn-hover-lift"
        style="margin-top: 30px"
        @click="goToSong"
      >
        <template #icon>
          <n-icon :component="ArrowForwardOutline" />
        </template>
        开始使用
      </n-button>
    </n-space>
  </n-card>
</template>

<script setup>
import { onMounted } from 'vue';
import { ArrowForwardOutline } from '@vicons/ionicons5';

function goToSong() {
  window.location.href = '/song';
}

onMounted(() => {
  setTimeout(() => {
    const img = document.querySelector('.animate-fade-in-scale');
    if (img) img.classList.remove('opacity-0');

    const title = document.querySelector('.animate-fade-in-up.stagger-2');
    if (title) title.classList.remove('opacity-0');

    const btn = document.querySelector('.animate-fade-in-up.stagger-3');
    if (btn) btn.classList.remove('opacity-0');
  }, 50);
});
</script>
