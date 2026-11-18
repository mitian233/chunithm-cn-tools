<template>
  <div class="flex flex-col gap-3">
    <section class="ui-card">
      <h1 class="mb-4 text-xl font-semibold">关于工具箱</h1>
      <dl class="about-details">
        <dt>版本</dt>
        <dd><span class="ui-tag">0.1.21</span></dd>
        <dt>更新日期</dt>
        <dd>2026年3月8日</dd>
        <dt>更新内容</dt>
        <dd>优化界面和性能，升级依赖</dd>
      </dl>
    </section>

    <section class="ui-card">
      <h2 class="mb-4 text-xl font-semibold">贡献</h2>
      <dl class="about-details">
        <dt>开发者</dt>
        <dd>Mikan</dd>
        <dt>称号数据</dt>
        <dd>losffa</dd>
        <dt>歌曲数据</dt>
        <dd>Diving-Fish 查分器 API</dd>
        <dt>还有……</dt>
        <dd>您</dd>
        <dt>项目地址</dt>
        <dd>
          <a
            class="ui-link"
            href="https://github.com/mitian233/chunithm-cn-tools"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/mitian233/chunithm-cn-tools
          </a>
        </dd>
      </dl>
    </section>
  </div>
</template>

<style scoped>
.about-details {
  display: grid;
  grid-template-columns: minmax(5rem, max-content) minmax(0, 1fr);
  gap: 0.75rem 1rem;
}

.about-details dt {
  color: var(--ui-muted);
  font-weight: 500;
}

.about-details dd {
  overflow-wrap: anywhere;
}
</style>
