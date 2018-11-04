<template>
  <div class="component-DappDetailBodyContentDescription">
    <div class="description" v-html="$md.render(description)">
    </div>
  </div>
</template>

<script>
export default {
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
  word-break: break-word;
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

</style>
