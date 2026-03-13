<template>
  <n-space vertical>
    <n-form-item label="定数">
      <n-input-number
        v-model:value="dsInput"
        :min="0"
        :max="15.5"
        :step="0.1"
        placeholder="请输入定数"
        class="input-focus-glow"
        style="width: 100%"
      />
    </n-form-item>
    <n-data-table :columns="columns" :data="tableData" :pagination="false" />
  </n-space>
</template>

<script setup>
import { ref, watch, h } from 'vue';
import { NTag } from 'naive-ui';

const achievementsList = [
  1010000, 1008500, 1008000, 1007750, 1007500, 1007000, 1006000, 1005000, 1003000, 1001000, 1000000,
  997500, 995000, 992500, 990000, 985000, 980000, 975000,
];

const dsInput = ref(null);
const tableData = ref([]);

const columns = [
  {
    title: '定数',
    key: 'ds',
  },
  {
    title: '分数',
    key: 'achievements',
    render(row) {
      const score = row.achievements;
      let type = 'default';
      if (score >= 1009000) type = 'success';
      else if (score >= 1007500) type = 'info';
      else if (score >= 1000000) type = 'warning';
      return h(NTag, { type, size: 'small' }, { default: () => score.toLocaleString() });
    },
  },
  {
    title: 'Rating',
    key: 'rating',
    render(row) {
      return row.rating.toFixed(2);
    },
  },
];

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
    ds: val,
    achievements: score,
    rating: getRa(val, score),
  }));
});
</script>
