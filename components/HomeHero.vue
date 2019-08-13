<template>
  <div class="HomeHero">
    <div class="wrapper">
      <BaseMenu
        :is-home="true"
        color="white"/>
      <div class="hero-wrapper">
        <HomeHeroContent/>
      </div>
      <div class="platform-wrapper">
        <ul class="platform-list">
          <li
            v-for="platform in platforms"
            :key="platform"
            class="platform-item"
          >
            <nuxt-link
              :to="'/rankings/platform/' + platform.toLowerCase()"
              class="platform-link"
              @click.native="$mixpanel.track('Homepage Hero Platform', { platform })"
            >{{ platform }}</nuxt-link>
          </li>
        </ul>
        <p class="platform-cta-wrapper">
          <nuxt-link :to="localePath({ name: 'platforms' })">{{ $t(namespace('cta')) }}</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { platformList } from '@/helpers/constants'
import HomeHeroContent from './HomeHeroContent'
import BaseMenu from './BaseMenu'

export default {
  components: {
    BaseMenu,
    HomeHeroContent
  },
  data() {
    return {
      platforms: platformList()
    }
  }
}
</script>

<style lang="scss" scoped>
.HomeHero {
  background-image: linear-gradient(to bottom, #3a2a6a, #7254d0);
  color: lighten($color--white, 100%);
  padding: 7px 0 20px 0;
  @include tweakpoint('min-width', 575px) {
    background-image: linear-gradient(to bottom, #3a2a6a, #7254d0);
    padding-top: 7px;
    padding-bottom: 22px;
  }
  /deep/ a {
    color: white;
  }
  /deep/ .results a {
    color: $color--black;
  }
}

.hero-wrapper {
  overflow: hidden;
  margin-right: -10px;
  margin-left: -10px;
  padding-left: 10px;
  padding-right: 10px;
  @include tweakpoint('min-width', 575px) {
    margin-right: -22px;
    margin-left: -22px;
    padding-left: 22px;
    padding-right: 22px;
  }
}

.platform-cta-wrapper {
  margin-top: 1rem;
  margin-bottom: 0.15rem;
  text-align: right;
}

.platform-item {
  width: 33.33%;
  @include tweakpoint('min-width', 575px) {
    width: 33.33%;
  }
  @include tweakpoint('min-width', 1000px) {
    width: 11.11%;
  }
}

.platform-link {
  display: block;
  padding: 10px;
  text-decoration: none;
  border: 1px solid white;
  border-radius: 4px;
  margin: 5px;
  font-weight: 600;
  text-align: center;
}

.platform-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -5px;
}

.platform-wrapper {
  margin: 0 auto;
  width: calc(100%);
  max-width: 1500px;
  padding-top: 50px;
  @include tweakpoint('min-width', 575px) {
    padding-top: 20px;
  }
}

.wrapper {
  @include margin-wrapper-main;
  max-width: initial !important;
}
</style>
