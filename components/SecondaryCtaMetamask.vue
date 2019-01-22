<template>
  <div class="SecondaryCtaMetamask">
    <div class="wrapper">
      <div class="icon-wrapper">
        <SvgBadgeMetamask 
          :width="35" 
          :height="35" 
          fill="white" />
      </div>
      <div class="description-wrapper">
        <h5 class="title-5">{{ $t(namespace('title')) }}</h5>
        <p class="description">{{ $t(namespace('description')) }} <a 
          class="link" 
          href="https://metamask.io/?ref=StateOfTheDApps" 
          target="_blank" 
          rel="noopener"
          @click="trackMetamaskCta()">{{ $t(namespace('cta')) }}</a></p>
      </div>
      <div class="cta-wrapper">
        <a 
          href="https://metamask.io/?ref=StateOfTheDApps" 
          class="cta" 
          target="_blank" 
          rel="noopener"
          @click="trackMetamaskCta()">{{ $t(namespace('discover')) }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { trackMetamaskCta } from '~/helpers/mixpanel'
import SvgBadgeMetamask from './SvgBadgeMetamask'

export default {
  components: {
    SvgBadgeMetamask
  },
  data() {
    return {
      sourcePath: this.$route.path
    }
  },
  methods: {
    trackMetamaskCta() {
      const sourceComponent = 'SecondaryCtaMetamask'
      const action = trackMetamaskCta(sourceComponent, this.sourcePath)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>


<style lang="scss" scoped>
.SecondaryCtaMetamask {
  background: rgba($color--black, 0.5);
}

.cta-wrapper {
  @include tweakpoint('min-width', 840px) {
    width: 25%;
    text-align: right;
  }
}

.cta {
  display: inline-block;
  border: 1px solid lighten($color--white, 100%);
  padding: 6px 20px;
  color: lighten($color--white, 100%);
  text-decoration: none;
  margin: 5px 0;
  border-radius: 3px;
}

.description {
  margin-top: 0.25rem;
  margin-bottom: 0;
}

.description-wrapper {
  margin: 15px;
  flex-grow: 1;
  @include tweakpoint('min-width', 840px) {
    margin: 0;
  }
}

.icon-wrapper {
  @include tweakpoint('min-width', 840px) {
    width: 25%;
    text-align: left;
  }
}

.link {
  color: lighten($color--white, 100%);
}

.title-5 {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.wrapper {
  @include margin-wrapper-main;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  @include tweakpoint('min-width', 840px) {
    flex-direction: row;
  }
}
</style>
