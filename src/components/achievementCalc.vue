<template>
  <n-space vertical>
    <n-grid :cols="2" :x-cols="1" responsive="screen">
      <n-gi>
        <n-form-item label="定数">
          <n-input-number
            v-model:value="dsInput"
            :min="0"
            :max="15.5"
            :step="0.1"
            placeholder="请输入定数"
            style="width: 100%"
          />
        </n-form-item>
      </n-gi>
      <n-gi>
        <n-form-item label="分数">
          <n-input-number
            v-model:value="achievementsInput"
            :min="0"
            :max="1010000"
            placeholder="请输入分数"
            style="width: 100%"
          />
        </n-form-item>
      </n-gi>
    </n-grid>
    <n-statistic label="计算Rating" :value="ratingResult.toFixed(2)" />
  </n-space>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
  ds: {
    type: Number,
    default: null,
  },
});

const dsInput = ref(null);
const achievementsInput = ref(null);
const ratingResult = ref(0);

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

watch([dsInput, achievementsInput], () => {
  ratingResult.value = getRa(dsInput.value, achievementsInput.value);
});

onMounted(() => {
  if (props.ds != null) {
    dsInput.value = props.ds;
  }
});
</script>
