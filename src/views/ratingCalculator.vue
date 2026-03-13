<template>
  <n-card title="中二 Rating 线计算工具" class="card-hover-lift">
    <n-tabs v-model:value="ratingMode" type="line" animated>
      <n-tab-pane name="from_achievements" tab="按分数计算">
        <achievement-calc :ds="dsInUrl" />
      </n-tab-pane>
      <n-tab-pane name="from_ds" tab="按定数计算">
        <ds-calc />
      </n-tab-pane>
      <n-tab-pane name="from_rating" tab="按Rating计算">
        <ra-calc />
      </n-tab-pane>
      <n-tab-pane name="from_line" tab="计算分数线" :disabled="!isFromLine">
        <div v-if="!isFromLine" style="text-align: center; padding: 40px">
          <n-text style="font-size: 100px">⚠️</n-text>
          <n-p>该功能必须从歌曲列表访问</n-p>
          <n-button type="primary" @click="$router.push('/song')">点此跳转</n-button>
        </div>
        <line-calc v-else :combo="comboInUrl" />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import RaCalc from '../components/raCalc.vue';
import AchievementCalc from '../components/achievementCalc.vue';
import DsCalc from '../components/dsCalc.vue';
import LineCalc from '../components/lineCalc.vue';

const route = useRoute();

const ratingMode = ref('from_achievements');
const dsInUrl = ref(null);
const comboInUrl = ref(null);

const isFromLine = computed(() => route.query.mode === 'from_line');

watch(
  () => route.query,
  (query) => {
    ratingMode.value = query.mode || 'from_achievements';

    const ds = Number(query.ds);
    dsInUrl.value = Number.isFinite(ds) ? ds : null;

    const combo = Number(query.combo);
    comboInUrl.value = Number.isFinite(combo) ? combo : null;
  },
  { immediate: true }
);
</script>
