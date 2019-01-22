<template>
  <label
    :for="field"
    class="BaseLabel">
    <span class="label">{{ label }}</span>
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
      required: true,
      default: ''
    },
    label: {
      type: String,
      required: true,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseLabel {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.required {
  color: $color--medium-purple;
}
</style>
