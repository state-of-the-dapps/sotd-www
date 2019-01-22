<template>
  <div class="PageHeading">
    <h1 class="title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  @include title-1;
  text-align: center;
  font-size: 3.5rem;
  margin-bottom: 0.5rem;
}
</style>
