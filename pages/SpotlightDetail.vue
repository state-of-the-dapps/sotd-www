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
    <div class="markdown-article-wrapper">
      <div
        class="markdown-article"
        v-html="$md.render(spotlight.body)"
      />
      <nuxt-link
        :to="localePath({ name: 'dapp-detail', params: { slug: spotlight.relatedDapp.slug } })"
        class="cta-wrapper">
        <img
          :src="spotlight.relatedDapp.iconUrl"
          class="cta-image"
          width="40">
        <div class="cta-description">
          <h3 class="cta-name">{{ spotlight.relatedDapp.name }}</h3>
          <p class="cta-teaser">{{ spotlight.relatedDapp.teaser }}</p>
        </div>
        <button class="cta-view">View DApp</button>
      </nuxt-link>
    </div>
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
          iconUrl: '',
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
.cta-wrapper {
  display: block;
  padding: 10px;
  background: $color--white;
  position: sticky;
  bottom: 10px;
  box-shadow: 0 5px 50px rgba($color--black, 0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.cta-teaser {
  margin: 0;
}

.cta-view {
  margin-left: auto;
  border: 1px solid $color--black;
  border-radius: 4px;
  padding: 5px 10px;
}

.cta-name {
  margin: 0;
}

.cta-image {
  display: block;
  margin-right: 10px;
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
