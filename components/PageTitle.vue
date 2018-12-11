<template>
  <h1 class="component-page-title">{{ title }}</h1>
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

.component-page-title {
  @include title-1;
  text-align: center;
  font-size: 3.2rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
</style>
