<template>
  <div
    v-if="spotlight.slug"
    class="FeaturedSpotlight">
    <div class="wrapper">
      <SectionHeading
        :has-line="false"
        :heading="$t(namespace('heading'))"
        :heading-route="{ name: 'spotlight-detail', params: { slug: spotlight.slug }}">
        <template slot="icon">
          <IconSpotlight/>
        </template>
      </SectionHeading>
      <div class="main-content-wrapper">
        <div class="image-wrapper">
          <nuxt-link
            :to="localePath({name: 'spotlight-detail', params: { slug: spotlight.slug }})"
            style="background-image: url('https://fillmurray.com/g/1000/600')"
            class="image-link"
            @click.native="$mixpanel.track('Featured Spotlight', { element: 'image', slug: spotlight.slug })"/>
        </div>
        <div class="text-wrapper">
          <h2 class="title">
            <nuxt-link
              :to="localePath({name: 'spotlight-detail', params: { slug: spotlight.slug }})"
              class="heading-link"
              @click.native="$mixpanel.track('Featured Spotlight', { element: 'title', slug: spotlight.slug })">{{ spotlight.title }}</nuxt-link>
          </h2>
          <div class="description">
            <div
              class="teaser"
              v-html="$md.render(spotlight.teaser)" />
          </div>
          <p class="link-wrapper">
            <nuxt-link
              :to="localePath({name: 'spotlight-detail', params: { slug: spotlight.slug }})"
              class="link"
              @click.native="$mixpanel.track('Featured Spotlight', { element: 'cta', slug: spotlight.slug })">{{ $t(namespace('ctaText')) }}<IconChevron
                :width="10"
                :height="10"
                direction="right"
                fill="black"
              />
            </nuxt-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from './BaseButton'
import IconChevron from './IconChevron'
import IconSpotlight from './IconSpotlight'
import Media from 'vue-media'
import SectionHeading from './SectionHeading'

export default {
  components: {
    BaseButton,
    IconChevron,
    IconSpotlight,
    Media,
    SectionHeading
  },
  data() {
    return {
      spotlight: {
        ctaText: '',
        imageUrl: '',
        slug: '',
        teaser: '',
        title: ''
      }
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
          this.spotlight = spotlights[0]
        }
      })
  }
}
</script>

<style lang="scss" scoped>
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

.wrapper {
  @include margin-wrapper-main;
  padding-bottom: 0.5rem;
}

.main-content-wrapper {
  background: $color--white;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba($color--black, 0.1);
  @include tweakpoint('min-width', 1100px) {
    display: flex;
    align-items: center;
  }
}

.image-wrapper {
  border-bottom: 8px solid $color--gray;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  @include tweakpoint('min-width', 1100px) {
    width: 40%;
    height: auto;
    border: none;
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
  @include tweakpoint('min-width', 1100px) {
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
  @include tweakpoint('min-width', 1100px) {
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
