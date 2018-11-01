<template>
  <div>
    <span>{{ rank }}</span>
  </div>
</template>

<script>
export default {
  props: {
    rank: {
      type: Number,
      required: true
    }
  }
}
</script>
