<template>
  <section class="section">
    <div class="outer-wrapper">
      <ul class="count-list">
        <i18n
          :path="namespace('showing')"
          tag="li"
          class="count-item">
          <span
            v-if="total > 0 && start <= total"
            place="showing">
            <i18n
              :path="namespace('xOf')"
              tag="span">
              <strong
                place="x"
                @click="$mixpanel.track('DApps - Results count')">{{ start }} - {{ Math.min(end, total) }}</strong>
            </i18n>
          </span>
          <strong
            place="total"
            @click="$mixpanel.track('DApps - Results count')">{{ total }}</strong>
          <span place="result">{{ $tc(namespace('result'), total) }}</span>
        </i18n>
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
