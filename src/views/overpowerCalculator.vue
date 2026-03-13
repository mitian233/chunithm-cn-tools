<template>
  <n-card title="单曲 OVER POWER 计算器" class="card-hover-lift">
    <template #header-extra>
      <n-text depth="3" style="font-size: 12px">若分数为 1010000 自动判定为 AJC</n-text>
    </template>
    <n-space vertical>
      <n-form ref="formRef" :model="formData">
        <n-form-item label="定数" path="ds">
          <n-input-number
            v-model:value="formData.ds"
            :min="0"
            :max="15.5"
            :step="0.1"
            placeholder="请输入定数"
            class="input-focus-glow"
            style="width: 100%"
          />
        </n-form-item>
        <n-form-item label="分数" path="score">
          <n-input-number
            v-model:value="formData.score"
            :min="0"
            :max="1010000"
            placeholder="请输入分数"
            class="input-focus-glow"
            style="width: 100%"
          />
        </n-form-item>
        <n-form-item label="状态">
          <n-radio-group v-model:value="formData.comboStatus">
            <n-radio-button value="finished">已完成</n-radio-button>
            <n-radio-button value="full_combo">FULL COMBO</n-radio-button>
            <n-radio-button value="all_justice">ALL JUSTICE</n-radio-button>
            <n-radio-button value="all_justice_critical" :disabled="formData.score !== 1010000">
              AJC
            </n-radio-button>
          </n-radio-group>
        </n-form-item>
      </n-form>
      <n-space>
        <n-button type="primary" class="btn-hover-lift" @click="calculateOP">计算</n-button>
        <n-button class="btn-hover-lift" @click="clear">清空</n-button>
      </n-space>
      <n-divider />
      <n-statistic label="结果" :value="result" :class="{ 'animate-number-reveal': hasResult }">
        <template #suffix>
          <n-text depth="3">OP</n-text>
        </template>
      </n-statistic>
    </n-space>
  </n-card>
</template>

<script setup>
import { ref, watch } from 'vue';

const formData = ref({
  ds: null,
  score: null,
  comboStatus: 'finished',
});

const result = ref(0);
const hasResult = ref(false);

watch(
  () => formData.value.score,
  (newScore) => {
    if (newScore === 1010000) {
      formData.value.comboStatus = 'all_justice_critical';
    }
  }
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

  hasResult.value = false;
  setTimeout(() => {
    result.value = op.toFixed(2);
    hasResult.value = true;
  }, 50);
}
</script>
