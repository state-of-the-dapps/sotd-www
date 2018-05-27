<template>
<div class="component-DappDetailBodyContentModulesAuthors">
  <h4 class="author-title">Author<span v-if="authors.length > 1">s</span></h4>
  <p class="author-data"><span v-for="(author, index) in authors" :key="index">{{ author }}<span v-if="index !== authors.length - 1">, </span></span></p>
</div>
</template>

<script>
export default {
  props: {
    authors: {
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.author-data {
  margin: 0;
}

.author-title {
  margin: 0;
}
</style>
