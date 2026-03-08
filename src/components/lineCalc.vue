<template>
  <n-space vertical align="center">
    <n-card style="max-width: 400px">
      <n-space vertical>
        <n-statistic label="该乐曲总Combo数" :value="combo" />
        <n-form-item label="输入目标分数线">
          <n-input-number
            v-model:value="targetScore"
            :min="0"
            :max="1010000"
            placeholder="请输入分数"
            style="width: 100%"
          />
        </n-form-item>
        <n-divider />
        <template v-if="showResult">
          <n-statistic label="允许的最多Justice数" :value="justiceCount" />
          <n-statistic label="等效的最多Attack数" :value="attackCount" />
          <n-statistic label="等效的最多Miss数" :value="missCount" />
        </template>
        <n-text v-else depth="3">未输入数据或数据不合法！请检查输入！</n-text>
        <n-button type="primary" @click="$router.back()" style="margin-top: 16px">
          回到上一页
        </n-button>
      </n-space>
    </n-card>
  </n-space>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  combo: {
    type: Number,
    default: 0,
  },
});

const justiceCount = ref(0);
const attackCount = ref(0);
const missCount = ref(0);
const targetScore = ref(null);
const showResult = ref(false);

const calcByCombo = (target, fullCombo) => {
  const basic = 1000000 / fullCombo;
  const justice = 101 * fullCombo - (100 * target) / basic;
  const attack = (101 * fullCombo - (100 * target) / basic) / 51;
  const miss = fullCombo - target / basic / 1.01;
  justiceCount.value = Math.floor(justice * 100) / 100;
  attackCount.value = Math.floor(attack * 100) / 100;
  missCount.value = Math.floor(miss * 100) / 100;
};

watch(targetScore, (val) => {
  if (val === null) {
    showResult.value = false;
  } else if (val >= 0 && val <= 1010000) {
    showResult.value = true;
    calcByCombo(val, props.combo);
  } else {
    showResult.value = false;
  }
});
</script>
