<template>
  <section class="ui-card">
    <header class="detail-header">
      <h1>歌曲信息</h1>
      <span>数据来源：diving fish api</span>
    </header>

    <p v-if="isLoading" role="status">正在加载歌曲信息…</p>
    <div v-else-if="error" role="alert">
      <p>{{ error }}</p>
      <button type="button" class="ui-button" @click="router.go(-1)">回到上一页</button>
    </div>
    <template v-else-if="song">
      <div class="song-summary">
        <div class="song-cover">
          <CoverPreview
            :src="coverUrl"
            :title="song.basic_info?.title || '歌曲'"
            fallback-src="https://via.placeholder.com/200x200?text=No+Image"
          />
        </div>
        <div class="song-meta">
          <p v-if="isWE" class="worlds-end">该谱面为 World's End 谱面</p>
          <dl class="details">
            <dt>歌曲名称</dt>
            <dd>{{ song.basic_info?.title }}</dd>
            <dt>曲师</dt>
            <dd>{{ song.basic_info?.artist }}</dd>
            <dt>分类</dt>
            <dd>{{ song.basic_info?.genre }}</dd>
            <dt>版本</dt>
            <dd>{{ song.basic_info?.from }}</dd>
            <dt>BPM</dt>
            <dd>{{ song.basic_info?.bpm }}</dd>
          </dl>
          <p v-if="haveUltima" class="ultima">有 Ultima 谱面</p>
          <button type="button" class="ui-button" @click="router.go(-1)">回到上一页</button>
        </div>
      </div>

      <div class="ui-card chart-card">
        <TabsRoot v-if="levels.length" v-model="tab" :unmount-on-hide="false">
          <TabsList class="ui-tabs" aria-label="谱面难度">
            <TabsTrigger
              v-for="level in levels"
              :key="level.label"
              class="ui-tab"
              :value="level.label"
            >
              {{ level.label }}
            </TabsTrigger>
          </TabsList>
          <TabsContent
            v-for="level in levels"
            :key="level.label"
            :value="level.label"
            class="tab-content"
          >
            <div class="ui-card">
              <dl class="details">
                <template v-if="isWE">
                  <dt>谱面标签</dt>
                  <dd>{{ song.level?.[level.index] }}</dd>
                </template>
                <template v-else>
                  <dt>定数</dt>
                  <dd>{{ song.ds?.[level.index] }}</dd>
                </template>
                <dt>最大连击数量</dt>
                <dd>{{ song.charts?.[level.index]?.combo }}</dd>
                <dt>谱师</dt>
                <dd>{{ song.charts?.[level.index]?.charter }}</dd>
              </dl>
              <CollapsibleRoot v-if="!isWE" class="calculator-shortcuts">
                <CollapsibleTrigger class="collapse-trigger">
                  快捷填入计算器
                  <span aria-hidden="true">▾</span>
                </CollapsibleTrigger>
                <CollapsibleContent class="shortcut-buttons">
                  <button
                    type="button"
                    class="ui-button"
                    @click="gotoDsCalc(song.ds?.[level.index])"
                  >
                    谱面Rating计算
                  </button>
                  <button
                    type="button"
                    class="ui-button"
                    @click="gotoLineCalc(song.charts?.[level.index]?.combo)"
                  >
                    分数线计算
                  </button>
                </CollapsibleContent>
              </CollapsibleRoot>
            </div>
          </TabsContent>
        </TabsRoot>
        <p v-else>暂无谱面信息。</p>
      </div>
    </template>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  CollapsibleContent,
} from 'reka-ui';
import CoverPreview from '../components/CoverPreview.vue';
import { useMusicDataStore } from '../store';

const route = useRoute();
const router = useRouter();
const store = useMusicDataStore();
const isLoading = ref(true);
const error = ref('');
const tab = ref('');
const song = computed(() =>
  store.chuni_data.find((item) => String(item.id) === String(route.params.id))
);
const isWE = computed(() => song.value?.ds?.length === 6);
const haveUltima = computed(() => song.value?.ds?.length === 5);
const coverUrl = computed(
  () => `https://cdn.jsdelivr.net/gh/mitian233/chunicover@cached/covers/${route.params.id}.jpg`
);
const levels = computed(() => {
  if (!song.value) return [];
  if (isWE.value) return [{ label: "World's End", index: 5 }];
  const names = ['Basic', 'Advanced', 'Expert', 'Master', 'Ultima', "World's End"];
  return (song.value.level || []).map((level, index) => ({
    label: `${names[index]} ${level}`,
    index,
  }));
});

watch(
  levels,
  (items) => {
    tab.value = items[0]?.label || '';
  },
  { immediate: true }
);
watch(
  () => route.params.id,
  async (id, previousId, onCleanup) => {
    let active = true;
    onCleanup(() => {
      active = false;
    });
    isLoading.value = true;
    error.value = '';
    if (!id || Array.isArray(id) || !/^\d+$/.test(String(id))) {
      error.value = '歌曲编号无效，请返回歌曲列表重试。';
      isLoading.value = false;
      return;
    }
    try {
      await store.fetchChuniData();
      if (!active) return;
      if (!song.value) error.value = '没有找到这首歌曲，请返回歌曲列表重试。';
    } catch {
      if (!active) return;
      error.value = '歌曲信息加载失败，请稍后重试。';
    } finally {
      if (active) isLoading.value = false;
    }
  },
  { immediate: true }
);

function gotoDsCalc(ds) {
  router.push({ path: '/rating', query: { mode: 'from_achievements', ds } });
}
function gotoLineCalc(combo) {
  router.push({ path: '/rating', query: { mode: 'from_line', combo } });
}
</script>

<style scoped>
.detail-header {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.detail-header h1 {
  font-size: 1.25rem;
  font-weight: 600;
}
.detail-header span {
  color: var(--ui-muted);
  font-size: 0.875rem;
}
.song-summary {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}
.song-cover {
  display: flex;
  justify-content: center;
  align-items: start;
}
.song-meta {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.75rem;
}
.details {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  gap: 0.5rem 1.25rem;
}
.details dt {
  color: var(--ui-muted);
}
.details dd {
  overflow-wrap: anywhere;
}
.worlds-end {
  color: var(--ui-expert);
}
.ultima {
  color: var(--ui-primary);
}
.chart-card {
  margin-top: 1.25rem;
}
.collapse-trigger:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: -2px;
}
.tab-content {
  padding-top: 1rem;
}
.calculator-shortcuts {
  margin-top: 1rem;
  border-top: 1px solid var(--ui-border);
}
.collapse-trigger {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.75rem 0;
  text-align: left;
}
.shortcut-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
@media (max-width: 639px) {
  .song-summary {
    grid-template-columns: 1fr;
  }
}
</style>
