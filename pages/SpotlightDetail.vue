<template>
  <div 
    v-if="spotlight.slug"
    class="page">
    <h2 class="title-2">{{ $t('SpotlightDetail.heading') }}</h2>
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
        class="cta-wrapper"
        @click.native="$mixpanel.track('Spotlight - CTA', { slug: spotlight.slug, dapp: spotlight.relatedDapp.slug })">
        <img
          :src="spotlight.relatedDapp.iconUrl"
          class="cta-image"
          width="40">
        <div class="cta-description">
          <h3 class="cta-name">{{ spotlight.relatedDapp.name }}</h3>
          <p class="cta-teaser">{{ spotlight.relatedDapp.teaser }}</p>
        </div>
        <button class="cta-view">{{ $t('cta.viewDapp') }}</button>
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
  margin-top: 30px;
  position: sticky;
  bottom: 10px;
  box-shadow: 0 5px 50px rgba($color--black, 0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  text-decoration: none;
  border: 1px solid darken($color--gray, 5%);
}

.cta-teaser {
  margin: 0;
}

.cta-view {
  @include button;
  margin-left: auto;
  padding: 5px 10px;
}

.cta-name {
  margin: 0;
}

.cta-image {
  display: block;
  margin-right: 10px;
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

.page {
  margin: 0 auto;
  padding: 15px 10px 75px 10px;
  background: lighten($color--white, 100%);
  max-width: 1200px;
  margin: 20px auto 40px auto;
  border-radius: 4px;
  box-shadow: 0 10px 20px rgba($color--black, 0.1);
  border-top: 10px solid $color--black;
  border-bottom: 5px solid $color--black;
}

.title-2 {
  font-size: 1.25rem;
  text-align: center;
  color: darken($color--gray, 40%);
  margin-top: 3rem;
  margin-bottom: -2.5rem;
}
</style>

<style>
.intercom-app {
  display: none;
}
</style>
