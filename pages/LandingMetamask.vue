<template>
  <LayoutMain>
    <div>
      <section class="section">
        <div class="text-container">
          <div class="icon-wrapper">
            <SvgBadgeMetamask
              :width="36"
              :height="36"
              fill="black"/>
          </div>
          <h1 class="title-1">Welcome, Metamask Friends!</h1>
          <p class="intro">Cake pie candy candy canes dragée cake jujubes. Danish dragée danish fruitcake. Lemon drops gummi bears toffee jelly-o. Caramels bonbon chocolate sweet sweet apple pie candy pudding.</p>
          <div class="option-wrapper">
            <div class="option-description">
              <p class="">Cake pie candy candy canes dragée cake jujubes. Danish dragée danish fruitcake. Lemon drops gummi bears toffee jelly-o. Caramels bonbon chocolate sweet sweet apple pie candy pudding.</p>
            </div>
            <div class="option-cta"><button class="cta">CTA</button></div>
          </div>
        </div>
      </section>
    </div>
  </LayoutMain>
</template>

<script>
import LayoutMain from '~/components/LayoutMain'
import SvgBadgeMetamask from '~/components/SvgBadgeMetamask'

export default {
  components: {
    LayoutMain,
    SvgBadgeMetamask
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.cta {
  @include button;
}

.icon-wrapper {
  text-align: center;
  padding-bottom: 5px;
}

.intro {
  margin-top: 0.5rem;
}

.page-tech-metamask {
  padding-bottom: 50px;
}

.text-container p {
  max-width: 100%;
  font-size: 1.2rem;
  line-height: 1.275;
}

.title-1 {
  @include title-1;
  font-size: 3.5rem;
  text-align: center;
  margin: 0;
}
</style>
