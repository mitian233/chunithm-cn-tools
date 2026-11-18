<template>
  <DialogRoot v-model:open="open">
    <DialogTrigger as-child>
      <button
        type="button"
        class="cover-trigger"
        :class="{ thumbnail }"
        :aria-label="`预览封面：${title}`"
      >
        <img
          v-if="displaySrc"
          :src="displaySrc"
          :alt="`${title}的封面`"
          :loading="thumbnail ? 'lazy' : undefined"
          @error="handleError"
        />
        <span v-else class="cover-placeholder">暂无封面</span>
      </button>
    </DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="cover-overlay" />
      <DialogContent class="cover-dialog" @keydown="onKeydown">
        <DialogTitle class="cover-title">{{ title }}的封面</DialogTitle>
        <DialogDescription class="cover-description">
          滚轮或方向键缩放，拖动图片可移动位置。
        </DialogDescription>
        <div
          class="cover-stage"
          @click.self="open = false"
          @wheel.prevent="zoom($event.deltaY < 0 ? 1 : -1)"
          @pointerdown="startDrag"
          @pointermove="moveDrag"
          @pointerup="endDrag"
          @pointercancel="endDrag"
        >
          <img
            v-if="displaySrc"
            ref="previewImage"
            class="cover-image"
            :src="displaySrc"
            :alt="`${title}的封面`"
            :style="imageStyle"
            draggable="false"
            @error="handleError"
            @dblclick="toggleOriginal"
          />
          <span v-else class="cover-placeholder">暂无封面</span>
        </div>
        <div class="cover-controls">
          <button type="button" class="ui-button" @click="zoom(-1)">缩小</button>
          <button type="button" class="ui-button" @click="zoom(1)">放大</button>
          <button type="button" class="ui-button" @click="rotation -= 90">向左旋转</button>
          <button type="button" class="ui-button" @click="rotation += 90">向右旋转</button>
          <button type="button" class="ui-button" @click="toggleOriginal">原始大小</button>
          <button type="button" class="ui-button" :disabled="!displaySrc" @click="download">
            下载
          </button>
          <DialogClose class="ui-button">关闭</DialogClose>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from 'reka-ui';

const props = defineProps({
  src: { type: String, required: true },
  title: { type: String, required: true },
  thumbnail: { type: Boolean, default: false },
  fallbackSrc: { type: String, default: '' },
});

const open = ref(false);
const displaySrc = ref(props.src);
const previewImage = ref(null);
const scale = ref(1);
const rotation = ref(0);
const offset = ref({ x: 0, y: 0 });
const drag = ref(null);
const original = ref(false);
const imageStyle = computed(() => ({
  transform: `translate(${offset.value.x}px, ${offset.value.y}px) rotate(${rotation.value}deg) scale(${scale.value})`,
}));

watch(
  () => [props.src, props.fallbackSrc],
  () => {
    displaySrc.value = props.src;
  }
);
watch(open, (value) => {
  if (value) {
    scale.value = 1;
    rotation.value = 0;
    offset.value = { x: 0, y: 0 };
    original.value = false;
    drag.value = null;
  }
});
function handleError(event) {
  // Ignore a late error from an image whose source has already changed.
  if (event.target.getAttribute('src') !== displaySrc.value) return;
  displaySrc.value =
    displaySrc.value !== props.fallbackSrc && props.fallbackSrc ? props.fallbackSrc : '';
}
function zoom(direction) {
  scale.value = Math.min(8, Math.max(0.1, scale.value * (direction > 0 ? 1.2 : 1 / 1.2)));
  original.value = false;
}
function onKeydown(event) {
  if (['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(event.key)) {
    event.preventDefault();
    zoom(event.key === 'ArrowUp' || event.key === 'ArrowRight' ? 1 : -1);
  }
}
function toggleOriginal() {
  const image = previewImage.value;
  if (!image?.naturalWidth || !image.clientWidth) return;
  scale.value = original.value ? 1 : image.naturalWidth / image.clientWidth;
  offset.value = { x: 0, y: 0 };
  original.value = !original.value;
}
function startDrag(event) {
  if (event.button !== 0 || event.target !== previewImage.value) return;
  drag.value = { startX: event.clientX, startY: event.clientY, ...offset.value };
  previewImage.value.setPointerCapture(event.pointerId);
}
function moveDrag(event) {
  if (!drag.value) return;
  offset.value = {
    x: drag.value.x + event.clientX - drag.value.startX,
    y: drag.value.y + event.clientY - drag.value.startY,
  };
}
function endDrag() {
  drag.value = null;
}
async function download() {
  if (!displaySrc.value) return;
  try {
    const response = await fetch(displaySrc.value);
    if (!response.ok) throw new Error('Download failed');
    const url = URL.createObjectURL(await response.blob());
    const link = document.createElement('a');
    link.href = url;
    link.download = `${props.title || 'cover'}.jpg`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } catch {
    window.open(displaySrc.value, '_blank', 'noopener,noreferrer');
  }
}
</script>

<style scoped>
.cover-trigger {
  display: inline-flex;
  max-width: 100%;
  cursor: zoom-in;
  border-radius: 0.375rem;
  overflow: hidden;
}
.cover-trigger:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: 3px;
}
.cover-trigger img {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
.cover-trigger.thumbnail {
  width: 40px;
  height: 40px;
  flex: none;
}
.cover-trigger.thumbnail img {
  width: 100%;
  height: 100%;
}
.cover-placeholder {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  min-height: 40px;
  padding: 0.25rem;
  background: var(--ui-tag-bg);
  color: var(--ui-muted);
  font-size: 0.75rem;
}
.cover-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
}
.cover-dialog {
  position: fixed;
  inset: 0;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  color: white;
}
.cover-title {
  font-size: 1.125rem;
  font-weight: 600;
}
.cover-description {
  font-size: 0.875rem;
  color: #ddd;
}
.cover-stage {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  touch-action: none;
  cursor: grab;
}
.cover-stage:active {
  cursor: grabbing;
}
.cover-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
}
.cover-controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}
.cover-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
