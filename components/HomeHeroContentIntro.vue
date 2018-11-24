<template>
  <div 
    :class="'-' + loaded" 
    class="component-HomeHeroContentIntro">
    <h1 class="title-1">Explore decentralized applications <span class="subtitle-wrapper">(<span class="subtitle">apps built <br>on Blockchain</span>)</span></h1>
    <p class="description">Discover the possibilities of the Ethereum, EOS &amp; POA blockchain with the definitive registry of ÐApp projects. <nuxt-link 
      :to="{ name: 'what'}" 
      class="description-link" 
      @click.native="trackHomeHeroCta('learn')">Learn more about ÐApps</nuxt-link></p>
    <ul class="cta-list">
      <li class="cta-item"><nuxt-link 
        :to="{ name: 'rankings' }" 
        class="cta-link" 
        @click.native="trackHomeHeroCta('rankings')">View the top ÐApps</nuxt-link></li>
      <li class="cta-item"><nuxt-link 
        :to="{ name: 'dapps-new' }" 
        class="cta-link -submit" 
        @click.native="trackHomeHeroCta('submit')">Submit a ÐApp</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
import { trackHomeHeroCta } from '~/helpers/mixpanel'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      loaded: ''
    }
  },
  computed: {
    ...mapGetters(['heroHasLoaded'])
  },
  destroyed() {
    this.$store.dispatch('setHeroLoaded')
  },
  mounted() {
    this.loaded = !this.heroHasLoaded ? 'first-load' : 'has-loaded'
  },
  methods: {
    trackHomeHeroCta(targetCta) {
      const action = trackHomeHeroCta(targetCta)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.component-HomeHeroContentIntro {
  position: relative;
  z-index: 20;
  opacity: 0;
  &.-first-load {
    animation: fadeInHomeHero 1s linear both;
    animation-delay: 1s;
  }
  &.-has-loaded {
    opacity: 1;
  }
}

.cta-link {
  display: block;
  padding: 10px 0;
  text-decoration: none;
  background: $color--black;
  border: 1px solid $color--black;
  font-size: 1.15rem;
  border-radius: 3px;
  &.-submit {
    background: transparent;
    border-color: lighten($color--white, 100%);
  }
}

.cta-list {
  display: flex;
  margin: 50px -5px 0;
  @include tweakpoint('min-width', 1400px) {
    justify-content: center;
    margin: 25px 0;
  }
}

.cta-item {
  width: 50%;
  margin: 0 5px;
  text-align: center;
  @include tweakpoint('min-width', 480px) {
    width: 40%;
    max-width: 200px;
  }
}

.description {
  font-size: 1.2rem;
  width: 75%;
  margin-top: 0.5rem;
  @include tweakpoint('min-width', 575px) {
    width: 80%;
  }
  @include tweakpoint('min-width', 1400px) {
    width: 70%;
  }
  @include tweakpoint('min-width', 1400px) {
    text-align: center;
    width: 80%;
    margin: 0 auto;
  }
}

.subtitle {
  font-family: 'Overpass';
  font-size: 1.05rem;
  display: inline-block;
  position: relative;
  top: -10px;
  line-height: 1.05;
  letter-spacing: 0;
  margin: 0 1px;
  @include tweakpoint('min-width', 1400px) {
    text-align: left;
  }
}

.subtitle-wrapper {
  display: inline-block;
  @include tweakpoint('min-width', 1250px) {
    display: none;
  }
}

.title-1 {
  font-size: 5.3rem;
  line-height: 0.825;
  letter-spacing: 1.05px;
  margin: 1rem 0 0.75rem 0;
  @include tweakpoint('min-width', 1400px) {
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: center;
  }
}

@keyframes fadeInHomeHero {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
  }
}
</style>
