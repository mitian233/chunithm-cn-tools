<template>
  <div class="flex flex-col gap-4">
    <NumberInput v-model="dsInput" label="定数" placeholder="请输入定数" :max="15.5" :step="0.1" />
    <CatalogTable label="定数计算结果" :columns="columns" :rows="tableData">
      <template #achievements="{ value }">
        <span class="ui-tag justify-self-start" :style="{ color: scoreColor(value) }">
          {{ value.toLocaleString() }}
        </span>
      </template>
      <template #rating="{ value }">{{ value.toFixed(2) }}</template>
    </CatalogTable>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import CatalogTable from './CatalogTable.vue';
import NumberInput from './NumberInput.vue';

const achievementsList = [
  1010000, 1008500, 1008000, 1007750, 1007500, 1007000, 1006000, 1005000, 1003000, 1001000, 1000000,
  997500, 995000, 992500, 990000, 985000, 980000, 975000,
];

const dsInput = ref(null);
const tableData = ref([]);

const columns = [
  { label: '定数', key: 'ds' },
  { label: '分数', key: 'achievements' },
  { label: 'Rating', key: 'rating' },
];

function scoreColor(score) {
  if (score >= 1009000) return 'var(--ui-basic)';
  if (score >= 1007500) return 'var(--ui-worlds-end)';
  if (score >= 1000000) return 'var(--ui-advanced)';
}

const getRa = (ds, score) => {
  if (!ds) return 0;

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

watch(dsInput, (val) => {
  tableData.value = achievementsList.map((score) => ({
    id: score,
    ds: val,
    achievements: score,
    rating: getRa(val, score),
  }));
});
</script>
