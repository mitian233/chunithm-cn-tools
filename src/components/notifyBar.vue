<template>
  <n-collapse-transition :show="visible && !isHidden">
    <n-alert type="info" title="域名变更通知" closable @close="handleClose" class="notify-bar">
      本站已迁移到新域名
      <n-a href="https://chu.3kn.jp" target="_blank">chu.3kn.jp</n-a>
      ，请收藏新地址。
    </n-alert>
  </n-collapse-transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const visible = ref(true);
const isHidden = ref(false);
const lastScrollY = ref(0);

function handleClose() {
  visible.value = false;
  localStorage.setItem('notifyBarClosed', 'true');
}

function handleScroll() {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY.value && currentScrollY > 60) {
    isHidden.value = true;
  } else if (currentScrollY < lastScrollY.value - 10) {
    isHidden.value = false;
  }

  lastScrollY.value = currentScrollY;
}

onMounted(() => {
  const closed = localStorage.getItem('notifyBarClosed');
  if (closed === 'true') {
    visible.value = false;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.notify-bar {
  position: sticky;
  top: 0;
  z-index: 1000;
  border-radius: 0;
}
</style>
