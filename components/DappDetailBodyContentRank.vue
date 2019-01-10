<template>
  <div class="DappDetailBodyContentRank">
    <div class="wrapper">
      <p class="description"><strong>{{ $t(namespace('currentRank')) }}</strong> &nbsp;#{{ rank.toLocaleString() }} 
        <BaseDelta
          :null-text="$t('new')"
          :value="rankDelta"/>
      </p>
    </div>
  </div>
</template>

<script>
import BaseDelta from './BaseDelta'

export default {
  components: {
    BaseDelta
  },
  props: {
    rank: {
      type: Number,
      required: true
      // TODO default value
    },
    rankDelta: {
      type: [Number, null],
      default: null
    }
  }
}
</script>


<style lang="scss" scoped>
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
