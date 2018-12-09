<template>
  <section class="section">
    <div class="outer-wrapper">
      <ul class="count-list">
        <li class="count-item">Showing <span v-if="total > 0 && start <= total"><strong @click="$mixpanel.track('DApps - Results count')">{{ start }} - {{ Math.min(end, total) }}</strong> of </span><strong @click="$mixpanel.track('DApps - Results count')">{{ total }}</strong> {{ 'result' | pluralize(total) }}</li>
      </ul>
    </div>
  </section>
</template>

<script>
import pluralize from 'pluralize'

export default {
  props: {
    end: {
      type: Number,
      required: true
    },
    start: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.outer-wrapper {
  display: flex;
  flex-direction: column-reverse;
  @include tweakpoint('min-width', 640px) {
    padding-left: 0;
    padding-right: 0;
  }
  @include tweakpoint('min-width', $tweakpoint--default) {
    padding: 17px 0 5px 0;
    flex-direction: row;
    align-items: center;
    > :nth-child(1) {
      flex-grow: 1;
    }
  }
}

.count-list {
  margin-top: 10px;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-top: 0;
  }
}
</style>
