<template>
  <label
    :for="field"
    class="component-base-label">
    <span class="label-text">{{ label }}</span>
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

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-base-label {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.required {
  color: $color--light-purple;
}
</style>
