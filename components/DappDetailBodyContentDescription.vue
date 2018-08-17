<template>
  <div class="component-DappDetailBodyContentDescription">
    <div class="description">
      <p v-for="(paragraph, index) in formattedDescription" :key="index" class="paragraph">{{ paragraph }}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    formattedDescription () {
      const value = this.description || []
      const formattedValue = value.split('\n\n')
      return formattedValue
    }
  },
  props: {
    description: {
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.description {
  word-break: break-all;
  text-align: center;
  padding: 20px 10px 5px 10px;
  font-size: 1.2rem;
  line-height: 1.4;
  margin-top: 0;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
    padding: 0 10px 5px 10px;
  }
}

.paragraph {
  margin: 0;
  margin-bottom: 1rem;
}
</style>
