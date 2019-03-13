<template>
  <div
    v-if="spotlights.length"
    class="FeaturedSpotlight">
    <div class="wrapper">
      <SectionHeading
        :has-line="true"
        :heading="$t(namespace('heading'))"
        :heading-route="{ name: 'spotlights' }"
        :cta-text="$t('cta.viewPastSpotlights')"
        :cta-route="{ name: 'spotlights' }"
      >
        <template slot="icon">
          <IconSpotlight/>
        </template>
      </SectionHeading>
      <div>
        <SpotlightPreview
          v-for="(spotlight, index) in spotlights"
          :key="index"
          :spotlight="spotlight"
        />
      </div>
    </div>
  </div>
</template>

<script>
import IconChevron from './IconChevron'
import IconSpotlight from './IconSpotlight'
import SectionHeading from './SectionHeading'
import SpotlightPreview from './SpotlightPreview'

export default {
  components: {
    IconChevron,
    IconSpotlight,
    SectionHeading,
    SpotlightPreview
  },
  data() {
    return {
      spotlights: []
    }
  },
  mounted() {
    this.$axios
      .get('spotlights', {
        params: {
          limit: 1
        }
      })
      .then(response => {
        const spotlights = response.data
        if (spotlights.length) {
          this.spotlights = [spotlights[0]]
        }
      })
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  @include margin-wrapper-main;
  padding-bottom: 0.5rem;
}
</style>
