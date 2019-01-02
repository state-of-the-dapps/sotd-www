<template>
  <div class="component-DappDetailBodyContentModulesAuthors">
    <h4 class="author-title">{{ $tc(namespace('author'), authors ? authors.length: 0) }}</h4>
    <p 
      v-if="authors" 
      class="author-data"><span 
        v-for="(author, index) in authors" 
        :key="index">{{ author }}<span v-if="index !== authors.length - 1">, </span></span></p>
    <p 
      v-else 
      class="author-data">{{ $t(namespace('unknownAuthor')) }}</p>
  </div>
</template>

<script>
import { componentNamespace } from '@/helpers/mixins'
export default {
  mixins: [componentNamespace],
  props: {
    authors: {
      type: Array,
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
