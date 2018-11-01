<template>
  <div>
    <span>{{ Math.ceil(score * 100) }}%</span>
  </div>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      required: true
    }
  }
}
</script>
