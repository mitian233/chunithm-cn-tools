<template>
  <n-card v-if="showAd" class="ad-container">
    <ins
      class="adsbygoogle"
      style="display: block"
      data-ad-client="ca-pub-9004116390026603"
      data-ad-slot="5964842462"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </n-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const showAd = ref(false);

onMounted(() => {
  showAd.value = true;
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {
    console.warn('AdSense not loaded');
  }
});
</script>

<style scoped>
.ad-container {
  margin-top: 24px;
}
</style>
