<template>
  <div class="component-page-heading">
    <h1 class="title">{{ title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.title {
  @include title-1;
  text-align: center;
  font-size: 3.5rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
</style>
