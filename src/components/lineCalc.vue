<template>
  <div class="flex justify-center">
    <section class="ui-card w-full max-w-[400px] space-y-4">
      <div>
        <p class="text-sm text-[var(--ui-muted)]">该乐曲总Combo数</p>
        <p class="text-2xl">{{ combo }}</p>
      </div>
      <NumberInput
        v-model="targetScore"
        label="输入目标分数线"
        placeholder="请输入分数"
        :max="1010000"
        :step="1"
      />
      <hr class="border-[var(--ui-border)]" />
      <transition name="fade">
        <dl v-if="showResult" class="space-y-3">
          <div>
            <dt class="text-sm text-[var(--ui-muted)]">允许的最多Justice数</dt>
            <dd class="text-2xl">{{ justiceCount }}</dd>
          </div>
          <div>
            <dt class="text-sm text-[var(--ui-muted)]">等效的最多Attack数</dt>
            <dd class="text-2xl">{{ attackCount }}</dd>
          </div>
          <div>
            <dt class="text-sm text-[var(--ui-muted)]">等效的最多Miss数</dt>
            <dd class="text-2xl">{{ missCount }}</dd>
          </div>
        </dl>
      </transition>
      <p v-if="!showResult" class="text-[var(--ui-muted)]">未输入数据或数据不合法！请检查输入！</p>
      <button type="button" class="ui-button" @click="$router.back()">回到上一页</button>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import NumberInput from './NumberInput.vue';

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

watch([targetScore, () => props.combo], ([val, combo]) => {
  if (val !== null && val >= 0 && val <= 1010000 && combo > 0) {
    showResult.value = true;
    calcByCombo(val, combo);
  } else {
    showResult.value = false;
  }
});
</script>
