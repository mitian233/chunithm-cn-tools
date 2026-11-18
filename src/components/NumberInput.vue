<script setup>
import { useId } from 'vue';
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from 'reka-ui';

const props = defineProps({
  label: { type: String, required: true },
  placeholder: { type: String, default: '' },
  min: { type: Number, default: 0 },
  max: { type: Number, required: true },
  step: { type: Number, default: 1 },
});

const value = defineModel({ type: Number, default: null });
const inputId = useId();
const formatOptions = { useGrouping: false, maximumFractionDigits: 20 };

function updateValue(next) {
  value.value = next ?? null;
}

function updateWhileTyping(event) {
  if (event.isComposing) return;
  const text = event.target.value;
  if (text === '') {
    updateValue(null);
    return;
  }
  // NumberField normally commits on blur or Enter. Preview complete, in-range numbers as typed.
  if (!/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(text)) return;
  const number = Number(text);
  if (number >= props.min && number <= props.max) updateValue(number);
}
</script>

<template>
  <div class="min-w-0">
    <label :for="inputId" class="mb-1 block text-sm font-medium">{{ label }}</label>
    <NumberFieldRoot
      :id="inputId"
      :model-value="value"
      :min="min"
      :max="max"
      :step="step"
      :step-snapping="false"
      :format-options="formatOptions"
      disable-wheel-change
      class="number-input input-focus-glow"
      @update:model-value="updateValue"
    >
      <NumberFieldInput
        :placeholder="placeholder"
        class="number-input__field"
        @input="updateWhileTyping"
      />
      <NumberFieldDecrement class="number-input__step" :aria-label="'减小' + label">
        −
      </NumberFieldDecrement>
      <NumberFieldIncrement class="number-input__step" :aria-label="'增大' + label">
        +
      </NumberFieldIncrement>
    </NumberFieldRoot>
  </div>
</template>

<style scoped>
.number-input {
  display: flex;
  min-height: 2.5rem;
  border: 1px solid var(--ui-border);
  border-radius: 0.375rem;
  background: var(--ui-surface);
}

.number-input:focus-within {
  border-color: var(--ui-primary);
}

.number-input__field {
  flex: 1;
  min-width: 0;
  padding: 0.375rem 0.625rem;
  background: transparent;
  outline: none;
}

.number-input__field::placeholder {
  color: var(--ui-muted);
}

.number-input__step {
  min-width: 2.5rem;
  border-inline-start: 1px solid var(--ui-border);
  color: var(--ui-text);
}

.number-input__step:enabled:hover {
  background: var(--ui-tag-bg);
  color: var(--ui-primary);
}

.number-input__step:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: -2px;
}

.number-input__step:disabled {
  opacity: 0.45;
}
</style>
