<template>
  <div 
    class="page">
    <h2 class="title">{{ $t('Spotlights.heading') }}</h2>
    <ul class="spotlight-preview-list">
      <li
        v-for="(spotlight, index) in spotlights"
        :key="index"
        class="spotlight-preview-item"
      >
        <SpotlightPreview
          :spotlight="spotlight"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import SpotlightPreview from '@/components/SpotlightPreview'

export default {
  components: {
    SpotlightPreview
  },
  data() {
    return {
      spotlights: []
    }
  },
  asyncData({ app }) {
    return app.$axios.get('spotlights').then(response => {
      const spotlights = response.data
      if (spotlights.length) {
        return { spotlights }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.spotlight-preview-list {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 10px 50px 0;
}

.spotlight-preview-item {
  margin-bottom: 20px;
}

.title {
  @include title-1;
  font-size: 3rem;
  text-transform: initial;
  text-align: center;
  margin-bottom: 0.75rem;
}
</style>
