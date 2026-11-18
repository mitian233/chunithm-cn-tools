<script setup>
import { RouterLink } from 'vue-router';
import {
  CalculatorOutline,
  FlaskOutline,
  HomeOutline,
  InformationCircleOutline,
  MusicalNotesOutline,
} from '@vicons/ionicons5';

defineProps({
  activePath: { type: String, required: true },
  collapsed: Boolean,
});
const emit = defineEmits(['navigate']);
const links = [
  { label: '主页', path: '/', icon: HomeOutline },
  { label: '歌曲列表', path: '/song', icon: MusicalNotesOutline },
  { label: 'OP 计算器', path: '/op', icon: CalculatorOutline },
  { label: 'Rating 计算器', path: '/rating', icon: CalculatorOutline },
  { label: '实验室', path: '/labs', icon: FlaskOutline },
  { label: '关于', path: '/about', icon: InformationCircleOutline },
];

function activate(event, navigate) {
  if (event.button !== 0 || event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
    return;
  navigate(event);
  emit('navigate');
}
</script>

<template>
  <nav aria-label="主导航" class="app-nav" :class="{ 'app-nav--collapsed': collapsed }">
    <ul class="space-y-1">
      <li v-for="link in links" :key="link.path">
        <RouterLink :to="link.path" custom v-slot="{ href, navigate }">
          <a
            :href="href"
            :aria-current="
              activePath === link.path
                ? activePath === $route.path
                  ? 'page'
                  : 'location'
                : undefined
            "
            :aria-label="collapsed ? link.label : undefined"
            :title="collapsed ? link.label : undefined"
            @click="activate($event, navigate)"
          >
            <component :is="link.icon" class="h-5 w-5 shrink-0" aria-hidden="true" />
            <span v-if="!collapsed">{{ link.label }}</span>
          </a>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.app-nav a {
  display: flex;
  min-height: 2.75rem;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
}
.app-nav--collapsed a {
  justify-content: center;
  padding-inline: 0;
}
.app-nav a:hover {
  background: var(--ui-bg);
}
.app-nav a[aria-current] {
  background: var(--ui-tag-bg);
  color: var(--ui-primary);
}
.app-nav a:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: -2px;
}
</style>
