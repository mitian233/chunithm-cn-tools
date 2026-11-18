<template>
  <section class="ui-card">
    <h1 class="mb-4 text-xl font-semibold">中二 Rating 线计算工具</h1>
    <TabsRoot v-model="ratingMode" :unmount-on-hide="false">
      <TabsList class="ui-tabs" aria-label="Rating 计算方式">
        <TabsTrigger class="ui-tab" value="from_achievements">按分数计算</TabsTrigger>
        <TabsTrigger class="ui-tab" value="from_ds">按定数计算</TabsTrigger>
        <TabsTrigger class="ui-tab" value="from_rating">按Rating计算</TabsTrigger>
        <TabsTrigger class="ui-tab" value="from_line" :disabled="!isFromLine">
          计算分数线
        </TabsTrigger>
      </TabsList>
      <TabsContent value="from_achievements" class="pt-4">
        <AchievementCalc :ds="dsInUrl" />
      </TabsContent>
      <TabsContent value="from_ds" class="pt-4"><DsCalc /></TabsContent>
      <TabsContent value="from_rating" class="pt-4"><RaCalc /></TabsContent>
      <TabsContent value="from_line" class="pt-4">
        <div v-if="!isFromLine" class="p-10 text-center">
          <span class="text-8xl">⚠️</span>
          <p>该功能必须从歌曲列表访问</p>
          <RouterLink class="ui-button" to="/song">点此跳转</RouterLink>
        </div>
        <line-calc v-else :combo="comboInUrl" />
      </TabsContent>
    </TabsRoot>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { TabsRoot, TabsList, TabsTrigger, TabsContent } from 'reka-ui';
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
