<template>
  <Transition name="notice">
    <div v-if="visible && !isHidden" class="notice-wrap">
      <div class="notice-content">
        <section class="notify-bar" aria-labelledby="notice-title">
          <div>
            <div id="notice-title" class="notice-title">域名变更通知</div>
            <p>
              本站已迁移到新域名
              <a
                class="ui-link"
                href="https://chu.3kn.jp"
                target="_blank"
                rel="noopener noreferrer"
              >
                chu.3kn.jp
              </a>
              ，请收藏新地址。
            </p>
          </div>
          <button type="button" class="notice-close" aria-label="关闭公告" @click="handleClose">
            ×
          </button>
        </section>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const visible = ref(localStorage.getItem('notifyBarClosed') !== 'true');
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
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* Keep layout adjustments from counting as upward scroll during the notice transition. */
:global(html:has(.notice-enter-active, .notice-leave-active)) {
  overflow-anchor: none;
}

.notice-wrap {
  display: grid;
  grid-template-rows: 1fr;
  opacity: 1;
  transition:
    grid-template-rows 200ms ease,
    opacity 200ms ease;
}

.notice-enter-from,
.notice-leave-to {
  grid-template-rows: 0fr;
  opacity: 0;
}

.notice-content {
  min-height: 0;
  overflow: hidden;
}

.notify-bar {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--ui-tag-bg);
  color: var(--ui-text);
  border-bottom: 1px solid var(--ui-border);
}

.notice-title {
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.notice-close {
  flex: none;
  color: var(--ui-muted);
  font-size: 1.5rem;
  line-height: 1;
}

.notice-close:hover {
  color: var(--ui-text);
}

.notice-close:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .notice-wrap {
    transition-duration: 0.01ms;
  }
}
</style>
