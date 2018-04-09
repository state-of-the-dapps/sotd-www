<template>
<div class="component-SecondaryCtaMetamask">
  <div class="wrapper">
    <div class="icon-wrapper">
      <SvgBadgeMetamask fill="white" :width="35" :height="35" />
    </div>
    <div class="description-wrapper">
      <h5 class="title-5">Bring ÐApps to life with Metamask</h5>
      <p class="description">Description for Metamask</p>
    </div>
    <div class="cta-wrapper">
      <button class="cta">Add Metamask to Chrome</button>
    </div>
  </div>
</div>
</template>

<script>
import SvgBadgeMetamask from './SvgBadgeMetamask'

export default {
  components: {
    SvgBadgeMetamask
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.component-SecondaryCtaMetamask {
  background: rgba($color--black, .5);
}

.cta-wrapper {
  @include tweakpoint('min-width', 840px) {
    width: 25%;
    text-align: right;
  }
}

.cta {
  border: 1px solid lighten($color--white, 100%);
  padding: 4px 20px;
}

.description {
  margin-top: .25rem;
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

