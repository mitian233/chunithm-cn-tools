<template>
  <ConfigProvider locale="zh-CN">
    <div class="app-shell">
      <aside class="app-sidebar" :class="{ 'app-sidebar--collapsed': collapsed }">
        <div class="app-brand" :title="collapsed ? 'CHUNITHM CN Tools' : undefined">
          {{ collapsed ? 'CN' : 'CHUNITHM CN Tools' }}
        </div>
        <AppNavigation
          id="desktop-navigation"
          :active-path="activePath"
          :collapsed="collapsed"
          class="p-2"
        />
        <button
          type="button"
          class="sidebar-toggle"
          :aria-label="collapsed ? '展开侧栏' : '收起侧栏'"
          :aria-expanded="!collapsed"
          aria-controls="desktop-navigation"
          @click="collapsed = !collapsed"
        >
          <ChevronForwardOutline v-if="collapsed" class="h-4 w-4" aria-hidden="true" />
          <ChevronBackOutline v-else class="h-4 w-4" aria-hidden="true" />
        </button>
      </aside>

      <div class="app-column">
        <NotifyBar />
        <header class="header">
          <div class="flex min-w-0 items-center gap-2">
            <DialogRoot v-if="isMobile" v-model:open="drawerVisible">
              <DialogTrigger type="button" aria-label="打开导航" class="header-action">
                <MenuOutline class="h-5 w-5" aria-hidden="true" />
              </DialogTrigger>
              <DialogPortal>
                <DialogOverlay class="nav-overlay" />
                <DialogContent class="nav-drawer">
                  <div class="drawer-heading">
                    <DialogTitle class="font-semibold">CHUNITHM CN Tools</DialogTitle>
                    <DialogClose type="button" class="header-action" aria-label="关闭导航">
                      <CloseOutline class="h-5 w-5" aria-hidden="true" />
                    </DialogClose>
                  </div>
                  <DialogDescription class="sr-only">选择要打开的页面</DialogDescription>
                  <AppNavigation
                    :active-path="activePath"
                    class="p-2"
                    @navigate="drawerVisible = false"
                  />
                </DialogContent>
              </DialogPortal>
            </DialogRoot>
            <span class="header-title">{{ route.meta.title }}</span>
          </div>
          <div class="flex shrink-0 items-center gap-1 sm:gap-2">
            <a
              class="header-action"
              href="https://www.diving-fish.com/maimaidx/prober/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="水鱼查分器"
            >
              <FishOutline class="h-5 w-5" aria-hidden="true" />
              <span class="header-action-label">水鱼查分器</span>
            </a>
            <button
              type="button"
              class="header-action"
              :aria-label="isDark ? '浅色模式' : '深色模式'"
              @click="toggleTheme"
            >
              <SunnyOutline v-if="isDark" class="h-5 w-5" aria-hidden="true" />
              <MoonOutline v-else class="h-5 w-5" aria-hidden="true" />
              <span class="header-action-label">
                {{ isDark ? '浅色模式' : '深色模式' }}
              </span>
            </button>
          </div>
        </header>
        <main class="app-content">
          <GoogleAdsense />
          <RouterView v-slot="{ Component }">
            <Transition name="slide-fade" mode="out-in">
              <component :is="Component" />
            </Transition>
          </RouterView>
        </main>
      </div>
    </div>
  </ConfigProvider>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import {
  ConfigProvider,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui';
import {
  ChevronBackOutline,
  ChevronForwardOutline,
  CloseOutline,
  FishOutline,
  MenuOutline,
  MoonOutline,
  SunnyOutline,
} from '@vicons/ionicons5';
import AppNavigation from './components/AppNavigation.vue';
import GoogleAdsense from './components/googleAdsense.vue';
import NotifyBar from './components/notifyBar.vue';

const route = useRoute();
const collapsed = ref(false);
const isDark = ref(localStorage.getItem('darkMode') === 'true');
const mobileQuery = window.matchMedia('(width < 768px)');
const isMobile = ref(mobileQuery.matches);
const drawerVisible = ref(false);
const activePath = computed(() => (route.path.startsWith('/song/') ? '/song' : route.path));

watchEffect(() => {
  document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light';
});

function toggleTheme() {
  isDark.value = !isDark.value;
  localStorage.setItem('darkMode', String(isDark.value));
}

function updateMobile(event) {
  isMobile.value = event.matches;
  if (!event.matches) drawerVisible.value = false;
}

onMounted(() => mobileQuery.addEventListener('change', updateMobile));
onUnmounted(() => mobileQuery.removeEventListener('change', updateMobile));
</script>

<style scoped>
.app-shell {
  display: flex;
  min-height: 100vh;
}
.app-column {
  flex: 1;
  min-width: 0;
}
.app-sidebar {
  position: sticky;
  top: 0;
  display: none;
  flex: 0 0 240px;
  height: 100dvh;
  border-inline-end: 1px solid var(--ui-border);
  background: var(--ui-surface);
}
.app-sidebar--collapsed {
  flex-basis: 64px;
}
.app-sidebar nav {
  overflow: auto;
}
.app-brand {
  display: grid;
  height: 64px;
  flex: none;
  place-items: center;
  border-bottom: 1px solid var(--ui-border);
  white-space: nowrap;
  font-weight: 600;
}
.sidebar-toggle {
  position: absolute;
  z-index: 101;
  top: 50%;
  inset-inline-end: -0.875rem;
  display: grid;
  width: 1.75rem;
  height: 1.75rem;
  place-items: center;
  border: 1px solid var(--ui-border);
  border-radius: 9999px;
  background: var(--ui-surface);
}
.header {
  position: sticky;
  z-index: 100;
  top: 0;
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-inline: 1rem;
  border-bottom: 1px solid var(--ui-border);
  background: var(--ui-surface);
}
.header-title {
  overflow: hidden;
  font-size: 0.875rem;
  font-weight: 500;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.header-action {
  display: inline-flex;
  min-width: 2.5rem;
  min-height: 2.5rem;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  border-radius: 0.375rem;
  padding-inline: 0.5rem;
  font-size: 0.875rem;
}
.header-action:hover,
.sidebar-toggle:hover {
  color: var(--ui-primary);
  background: var(--ui-tag-bg);
}
.header-action:focus-visible,
.sidebar-toggle:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: 2px;
}
.header-action-label {
  display: none;
}
.app-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--ui-bg);
}
.nav-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgb(0 0 0 / 0.5);
}
.nav-drawer {
  position: fixed;
  z-index: 201;
  inset: 0 auto 0 0;
  width: min(240px, calc(100vw - 2rem));
  overflow: auto;
  background: var(--ui-surface);
  color: var(--ui-text);
}
.nav-drawer[data-state='open'] {
  animation: nav-enter 180ms ease-out;
}
.nav-drawer[data-state='closed'] {
  animation: nav-exit 150ms ease-in;
}
.nav-overlay[data-state='open'] {
  animation: nav-fade-in 180ms ease-out;
}
.nav-overlay[data-state='closed'] {
  animation: nav-fade-out 150ms ease-in;
}
.drawer-heading {
  display: flex;
  min-height: 64px;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--ui-border);
}
@keyframes nav-enter {
  from {
    transform: translateX(-100%);
  }
}
@keyframes nav-exit {
  to {
    transform: translateX(-100%);
  }
}
@keyframes nav-fade-in {
  from {
    opacity: 0;
  }
}
@keyframes nav-fade-out {
  to {
    opacity: 0;
  }
}
@media (min-width: 768px) {
  .app-sidebar {
    display: flex;
    flex-direction: column;
  }
  .header,
  .app-content {
    padding-inline: 1.5rem;
  }
  .header-title {
    font-size: 1rem;
  }
  .header-action-label {
    display: inline;
  }
  .app-content {
    padding-block: 1.5rem;
  }
}
</style>
