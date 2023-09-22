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
  Cookies.set('showNotifyBar', newVal, {maxAge: 60 * 60 * 24 * 7});
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
  </v-alert>
</template>

<style scoped>

</style>
