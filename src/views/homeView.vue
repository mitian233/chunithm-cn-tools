<template>
  <section class="ui-card home-hero flex flex-col items-center py-10 text-center sm:py-12">
    <img
      src="../assets/logo.png"
      alt="中二节奏"
      width="300"
      class="animate-fade-in-scale max-w-full"
    />
    <h1 class="animate-fade-in-up stagger-2 mt-10 text-3xl font-bold">国服工具箱</h1>
    <RouterLink to="/song" class="ui-button animate-fade-in-up stagger-3 btn-hover-lift mt-8">
      <ArrowForwardOutline aria-hidden="true" class="h-5 w-5" />
      开始使用
    </RouterLink>
  </section>
</template>

<script setup>
import { ArrowForwardOutline } from '@vicons/ionicons5';
import { RouterLink } from 'vue-router';
</script>

<style scoped>
.home-hero > * {
  animation-fill-mode: both;
}
</style>
