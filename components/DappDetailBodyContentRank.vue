<template>
  <div class="component-DappDetailBodyContentRank">
    <div class="wrapper">
      <p class="description"><strong>{{ $t(namespace('currentRank')) }}</strong> &nbsp;#{{ rank.toLocaleString() }}</p>
    </div>
  </div>
</template>

<script>
import { componentNamespace } from '@/helpers/mixins'
export default {
  mixins: [componentNamespace],
  props: {
    rank: {
      type: Number,
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.description {
  margin-bottom: 0;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
