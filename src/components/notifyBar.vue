<script setup>
import {ref, onMounted} from "vue";

const showNotifyBar = ref(false);

onMounted(() => {
  const hostName = window.document.location.hostname;
  if (hostName !== 'chu.3kn.jp') {
    showNotifyBar.value = true;
  }
});
</script>

<template>
  <v-alert
      v-if="showNotifyBar"
      type="info"
      title="域名变更通知"
      class="mb-2"
      closable>
    <p>本站将于近期搬迁到新的域名<a href="https://chu.3kn.jp">chu.3kn.jp</a>，请窒息。</p>
    <p>该域名下网站无广告，但是可能会有一些不稳定，如果有问题请联系开发者。</p>
  </v-alert>
</template>

<style scoped>

</style>
