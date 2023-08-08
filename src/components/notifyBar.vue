<script setup>
import {ref, onMounted, watch} from "vue";
import Cookies from "js-cookie";

const showNotifyBar = ref(false);

onMounted(() => {
  const hostName = window.document.location.hostname;
  if (Cookies.get('showNotifyBar') === undefined) {
    if (hostName !== 'chu.3kn.jp') {
      showNotifyBar.value = true;
    } else {
      showNotifyBar.value = false;
    }
  } else if (Cookies.get('showNotifyBar') === 'true') {
    showNotifyBar.value = true;
  } else {
    showNotifyBar.value = false;
  }
});

watch(showNotifyBar, (newVal) => {
  Cookies.set('showNotifyBar', newVal);
});

</script>

<template>
  <v-alert
      v-model="showNotifyBar"
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
