<template>
  <div class="space-y-4">
    <div class="grid gap-4 sm:grid-cols-2">
      <NumberInput v-model="dsInput" label="定数" placeholder="请输入定数" :max="16" :step="0.1" />
      <NumberInput
        v-model="achievementsInput"
        label="分数"
        placeholder="请输入分数"
        :max="1010000"
      />
    </div>
    <dl>
      <dt class="text-sm text-[var(--ui-muted)]">计算Rating</dt>
      <dd
        :key="ratingResult"
        class="text-3xl font-semibold tabular-nums"
        :class="{ 'animate-number-reveal': ratingResult > 0 }"
        role="status"
      >
        {{ ratingResult.toFixed(2) }}
      </dd>
    </dl>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import NumberInput from './NumberInput.vue';

const props = defineProps({
  ds: {
    type: Number,
    default: null,
  },
});

const dsInput = ref(null);
const achievementsInput = ref(null);

const getRa = (ds, score) => {
  if (!ds || !score) return 0;

  if (score >= 1009000) return ds + 2.15;
  if (score >= 1007500) return ds + 2 + Math.floor((score - 1007500) / 100) * 0.01;
  if (score >= 1005000) return ds + 1.5 + Math.floor((score - 1005000) / 500) * 0.1;
  if (score >= 1000000) return ds + 1 + Math.floor((score - 1000000) / 1000) * 0.1;
  if (score >= 975000) return ds + Math.floor((score - 975000) / 2500) * 0.1;
  if (score >= 925000) return ds - 3;
  if (score >= 900000) return ds - 5;
  if (score >= 800000) return (ds - 5) / 2;
  return 0;
};

const ratingResult = computed(() => getRa(dsInput.value, achievementsInput.value));

watch(
  () => props.ds,
  (value) => {
    dsInput.value = value ?? null;
  },
  { immediate: true }
);
</script>
