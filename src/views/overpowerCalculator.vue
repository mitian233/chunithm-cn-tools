<template>
  <section class="ui-card space-y-4">
    <div class="flex flex-wrap items-baseline justify-between gap-2">
      <h1 class="text-xl font-semibold">单曲 OVER POWER 计算器</h1>
      <p class="text-xs text-[var(--ui-muted)]">若分数为 1010000 自动判定为 AJC</p>
    </div>
    <form class="space-y-4" @submit.prevent="calculateOP">
      <NumberInput
        v-model="formData.ds"
        label="定数"
        placeholder="请输入定数"
        :max="15.5"
        :step="0.1"
      />
      <NumberInput
        v-model="formData.score"
        label="分数"
        placeholder="请输入分数"
        :max="1010000"
        :step="1"
      />
      <fieldset class="space-y-2">
        <legend>状态</legend>
        <RadioGroupRoot
          v-model="formData.comboStatus"
          aria-label="状态"
          class="flex flex-wrap gap-2"
        >
          <RadioGroupItem value="finished" class="ui-button ui-button--outline op-radio">
            已完成
          </RadioGroupItem>
          <RadioGroupItem value="full_combo" class="ui-button ui-button--outline op-radio">
            FULL COMBO
          </RadioGroupItem>
          <RadioGroupItem value="all_justice" class="ui-button ui-button--outline op-radio">
            ALL JUSTICE
          </RadioGroupItem>
          <RadioGroupItem
            value="all_justice_critical"
            :disabled="formData.score !== 1010000"
            class="ui-button ui-button--outline op-radio"
          >
            AJC
          </RadioGroupItem>
        </RadioGroupRoot>
      </fieldset>
      <div class="flex gap-2">
        <button type="submit" class="ui-button">计算</button>
        <button type="button" class="ui-button ui-button--outline" @click="clear">清空</button>
      </div>
    </form>
    <hr class="border-[var(--ui-border)]" />
    <div>
      <p class="text-sm text-[var(--ui-muted)]">结果</p>
      <p class="text-2xl">
        {{ result }}
        <span class="text-sm text-[var(--ui-muted)]">OP</span>
      </p>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue';
import { RadioGroupItem, RadioGroupRoot } from 'reka-ui';
import NumberInput from '../components/NumberInput.vue';

const formData = ref({
  ds: null,
  score: null,
  comboStatus: 'finished',
});

const result = ref(0);

watch(
  () => formData.value.score,
  (newScore) => {
    if (newScore === 1010000) {
      formData.value.comboStatus = 'all_justice_critical';
    } else if (formData.value.comboStatus === 'all_justice_critical') {
      formData.value.comboStatus = 'finished';
    }
  },
  { flush: 'sync' }
);

function clear() {
  formData.value = {
    ds: null,
    score: null,
    comboStatus: 'finished',
  };
  result.value = 0;
}

function raCalculate(ds, score) {
  if (score >= 1009000) return ds + 2.15;
  if (score >= 1007500) return ds + 2 + Math.floor((score - 1007500) / 100) * 0.01;
  if (score >= 1005000) return ds + 1.5 + Math.floor((score - 1005000) / 500) * 0.1;
  if (score >= 1000000) return ds + 1 + Math.floor((score - 1000000) / 1000) * 0.1;
  if (score >= 975000) return ds + Math.floor((score - 975000) / 2500) * 0.1;
  if (score >= 925000) return ds - 3;
  if (score >= 900000) return ds - 5;
  if (score >= 800000) return (ds - 5) / 2;
  return 0;
}

function calculateOP() {
  const { ds, score, comboStatus } = formData.value;
  if (ds === null || score === null) return;

  let op = 0;

  if (score >= 1007500) {
    op = (ds + 2) * 5 + (score - 1007500) * 0.0015;
    if (comboStatus === 'full_combo') op += 0.5;
    if (comboStatus === 'all_justice') op += 1;
    if (comboStatus === 'all_justice_critical') op += 1.25;
  } else if (score >= 975000) {
    op = raCalculate(ds, score) * 5;
  }

  result.value = op.toFixed(2);
}
</script>

<style scoped>
.op-radio[data-state='checked'] {
  box-shadow: inset 0 0 0 1px var(--ui-primary);
  background-color: var(--ui-tag-bg);
  color: var(--ui-primary);
}
.op-radio:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
