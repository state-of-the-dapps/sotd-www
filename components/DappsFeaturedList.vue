<template>
  <div class="component-DappsFeaturedList">
    <div class="wrapper">
      <h2 class="title-2"><SvgIconFeatured/>Featured ÐApps</h2>
      <ul class="featured-list">
        <li class="featured-item"><a href="#">Featured item</a></li>
        <li class="featured-item"><a href="#">Featured item</a></li>
        <li class="featured-item"><a href="#">Featured item</a></li>
      </ul>
      <div class="linkexchange">Linkexchange</div>
    </div>
  </div>
</template>

<script>
import SvgIconFeatured from '~/components/SvgIconFeatured'

export default {
  components: {
    SvgIconFeatured
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappsFeaturedList {
  margin-bottom: 30px;
}

.component-SvgIconFeatured {
  margin-right: 7px;
}

.wrapper {
  @include margin-wrapper-main;
}
</style>

