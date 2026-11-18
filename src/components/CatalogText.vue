<script setup>
import { ref } from 'vue';
import { TooltipContent, TooltipPortal, TooltipRoot, TooltipTrigger } from 'reka-ui';

defineProps({ text: { type: [String, Number], default: '' } });
const element = ref(null);
const open = ref(false);
function updateOpen(next) {
  open.value = next && element.value.scrollWidth > element.value.clientWidth;
}
</script>

<template>
  <TooltipRoot :open="open" @update:open="updateOpen">
    <TooltipTrigger as-child>
      <span ref="element" class="block truncate">{{ text }}</span>
    </TooltipTrigger>
    <TooltipPortal>
      <TooltipContent class="catalog-tooltip" :side-offset="4">{{ text }}</TooltipContent>
    </TooltipPortal>
  </TooltipRoot>
</template>

<style scoped>
.catalog-tooltip {
  z-index: 120;
  max-width: min(28rem, calc(100vw - 2rem));
  overflow-wrap: anywhere;
  border: 1px solid var(--ui-border);
  border-radius: 0.375rem;
  padding: 0.375rem 0.625rem;
  background: var(--ui-surface);
  color: var(--ui-text);
}
</style>
