<template>
  <div class="component-HomeHeroContentIntro">
    <h1 class="title">Explore decentralized <br>applications <span class="subtitle-wrapper">(<span class="subtitle">projects built <br>on Ethereum</span>)</span></h1>
    <p class="description">Lollipop sesame snaps croissant cake gummies halvah danish marzipan brownie. Liquorice jelly-o cake caramels. Donut gummies liquorice. <nuxt-link class="description-link" to="/">Learn more</nuxt-link></p>
    <ul class="cta-list">
      <li class="cta-item"><nuxt-link class="cta-link" :to="{ name: 'dapps' }">Explore the ÐApps</nuxt-link></li>
      <li class="cta-item"><nuxt-link class="cta-link -submit" :to="{ name: 'dapps-new' }">Submit a ÐApp</nuxt-link></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/settings';

.cta-link {
  display: block;
  padding: 10px 0;
  text-decoration: none;
  background: $color--black;
  border: 1px solid $color--black;
  &.-submit {
    background: transparent;
    border-color: lighten($color--white, 100%)
  }
}

.cta-list {
  display: flex;
  margin: 50px -5px 0;
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
  font-size: 1.1rem;
  width: 75%;
  @include tweakpoint('min-width', 640px) {
    width: 90%;
  }
}

.description-link {
  font-weight: 600;
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
}

.subtitle-wrapper {
  display: inline-block;
}

.title {
  font-size: 5.3rem;
  line-height: .825;
  letter-spacing: 1.05px;
  margin: 1rem 0 1.5rem 0;
  opacity: 0;
  animation: fadeInHomeHero 1s linear both;
  animation-delay: 1s;
}

@keyframes fadeInHomeHero {
  from { opacity: 0; transform: translateY(-5px); }
  to   { opacity: 1; }
}
</style>

