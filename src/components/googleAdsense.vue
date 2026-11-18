<template>
  <div v-if="showAd" class="ui-card ad-container">
    <ins
      class="adsbygoogle"
      style="display: block"
      data-ad-client="ca-pub-9004116390026603"
      data-ad-slot="5964842462"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';

const showAd = ref(false);

onMounted(async () => {
  showAd.value = true;
  await nextTick();
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {
    // push throws when AdSense tries to re-render an already-filled slot;
    // that's expected on route changes — silently ignore.
  }
});
</script>

<style scoped>
.ad-container {
  margin-top: 24px;
}
</style>
