<template>
  <div 
    v-if="spotlight.slug"
    class="page">
    <h2 class="title-2">DApp Spotlight</h2>
    <PageHeading :title="spotlight.title"/>
    <img
      :src="spotlight.imageUrl"
      class="image"
    >
    <div
      class="markdown-article"
      v-html="$md.render(spotlight.body)"
    />
  </div>
</template>

<script>
import PageHeading from '@/components/PageHeading'

export default {
  components: {
    PageHeading
  },
  data() {
    return {
      spotlight: {
        imageUrl: '',
        slug: '',
        teaser: '',
        title: ''
      }
    }
  },
  asyncData({ app, params }) {
    return app.$axios.get(`spotlights/${params.slug}`).then(response => {
      const spotlight = response.data
      if (spotlight) {
        return { spotlight }
      } else {
        error({ statusCode: 404 })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.page {
  margin: 0 auto;
  padding: 0 10px 50px 10px;
}

.content {
  max-width: 550px;
  margin: 0 auto;
}

.image {
  display: block;
  max-width: 700px;
  margin: 25px auto;
  width: 100%;
  border-radius: 4px;
}

.title-2 {
  font-size: 1.25rem;
  text-align: center;
  color: darken($color--gray, 40%);
  margin-top: 3rem;
  margin-bottom: -2.5rem;
}
</style>
