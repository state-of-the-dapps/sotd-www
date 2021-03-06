<template>
  <div
    v-if="spotlight.slug"
    class="main-content-wrapper">
    <div class="image-wrapper">
      <nuxt-link
        :to="localePath({name: 'spotlight-detail', params: { slug: spotlight.slug }})"
        :style="`background-image: url('${spotlight.imageUrl}')`"
        class="image-link"
        @click.native="$mixpanel.track('Spotlight Preview', { element: 'image', slug: spotlight.slug })"/>
    </div>
    <div class="text-wrapper">
      <h2 class="title">
        <nuxt-link
          :to="localePath({name: 'spotlight-detail', params: { slug: spotlight.slug }})"
          class="heading-link"
          @click.native="$mixpanel.track('Spotlight Preview', { element: 'title', slug: spotlight.slug })">{{ spotlight.title }}</nuxt-link>
      </h2>
      <p class="created">{{ spotlight.created | formatDate('MMMM D, YYYY') }}</p>
      <div class="description">
        <div
          class="teaser"
          v-html="$md.render(spotlight.teaser)" />
      </div>
      <p class="link-wrapper">
        <nuxt-link
          :to="localePath({name: 'spotlight-detail', params: { slug: spotlight.slug }})"
          class="link"
          @click.native="$mixpanel.track('Spotlight Preview', { element: 'cta', slug: spotlight.slug })">{{ $t(namespace('ctaText')) }}<IconChevron
            :width="10"
            :height="10"
            direction="right"
            fill="black"
          />
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import IconChevron from './IconChevron'
import Media from 'vue-media'

export default {
  components: {
    IconChevron,
    Media
  },
  props: {
    spotlight: {
      type: Object,
      default: () => ({
        created: '',
        imageUrl: '',
        slug: '',
        teaser: '',
        title: ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.created {
  margin-top: 0;
}

.description {
  max-width: 700px;
  p:first-child {
    margin-top: 0;
  }
}

.teaser /deep/ {
  ul {
    padding-top: 2px;
  }
  li {
    font-size: 1.15rem;
    line-height: 1.3;
    padding: 6px 0;
    padding-left: 10px;
    position: relative;
    &:before {
      content: '•';
      position: absolute;
      top: 0.65rem;
      font-size: 13px;
      margin-left: -10px;
      vertical-align: middle;
    }
  }
}

.main-content-wrapper {
  background: $color--white;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba($color--black, 0.1);
  @include tweakpoint('min-width', 700px) {
    display: flex;
    align-items: center;
  }
}

.image-wrapper {
  overflow: hidden;
  border-bottom: 8px solid $color--gray;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  @include tweakpoint('min-width', 700px) {
    width: 40%;
    height: auto;
    border-radius: 0;
    border: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: 8px solid $color--gray;
    align-self: stretch;
  }
}

.heading-link {
  text-decoration: none;
  color: $color--purple;
}

.image {
  background: $color--gray;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  display: block;
  @include tweakpoint('min-width', 700px) {
    border-radius: 0;
    border: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
}

.image-link {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.link-wrapper {
  text-align: right;
  margin: 0;
}

.text-wrapper {
  padding: 25px 15px;
  @include tweakpoint('min-width', 700px) {
    padding: 50px 30px;
    width: 60%;
  }
}

.title {
  @include title-2;
  font-size: 2.5rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
  line-height: 0.9;
}
</style>
