<template>
  <label
    :for="field"
    class="component-base-label">{{ label }}
    <span
      v-if="required"
      class="required">(required)</span>
  </label>
</template>

<script>
export default {
  props: {
    field: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    }
  }
}
</script>
