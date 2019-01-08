<template>
  <span class="BaseDelta">{{ value | formatDelta }}</span>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  }
}
</script>
