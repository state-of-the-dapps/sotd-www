<template>
  <div class="component-ranking-table-rank">
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
