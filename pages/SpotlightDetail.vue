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
    <p class="markdown-article">
      <nuxt-link
        :to="localePath({ name: 'dapp-detail', params: { slug: spotlight.relatedDapp.slug } })"
        class="button">Check out {{ spotlight.relatedDapp.name }}</nuxt-link>
    </p>
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
        title: '',
        relatedDapp: {
          name: '',
          slug: ''
        }
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
.button {
  @include button;
  text-align: center;
  display: block;
  margin: 0 auto;
  width: 300px;
  padding: 12px 20px;
  font-size: 1.125rem;
  margin-top: 30px;
}

.page {
  margin: 0 auto;
  padding: 0 10px 75px 10px;
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
