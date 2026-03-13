<template>
  <n-space vertical>
    <n-card title="关于工具箱" class="card-hover-lift animate-fade-in-up">
      <n-descriptions label-placement="left" :column="1">
        <n-descriptions-item label="版本">
          <n-text>0.1.21</n-text>
        </n-descriptions-item>
        <n-descriptions-item label="更新日期">
          <n-text>2026年3月8日</n-text>
        </n-descriptions-item>
        <n-descriptions-item label="更新内容">
          <n-text>优化界面和性能，升级依赖</n-text>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>

    <n-card title="贡献" class="card-hover-lift animate-fade-in-up stagger-2">
      <n-descriptions label-placement="left" :column="1">
        <n-descriptions-item label="开发者">
          <n-text>Mikan</n-text>
        </n-descriptions-item>
        <n-descriptions-item label="称号数据">
          <n-text>losffa</n-text>
        </n-descriptions-item>
        <n-descriptions-item label="歌曲数据">
          <n-text>Diving-Fish 查分器 API</n-text>
        </n-descriptions-item>
        <n-descriptions-item label="还有……">
          <n-text>您</n-text>
        </n-descriptions-item>
        <n-descriptions-item label="项目地址">
          <n-a href="https://github.com/mitian233/chunithm-cn-tools" target="_blank">
            https://github.com/mitian233/chunithm-cn-tools
          </n-a>
        </n-descriptions-item>
      </n-descriptions>
    </n-card>
  </n-space>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  setTimeout(() => {
    document.querySelectorAll('.animate-fade-in-up').forEach((el) => {
      el.classList.remove('opacity-0');
    });
  }, 50);
});
</script>
