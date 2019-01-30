<template>
  <div class="FeaturedSpotlight">
    <div class="wrapper">
      <SectionHeading
        :has-line="false"
        :heading="$t(namespace('heading'))"
        :heading-route="{ name: 'collection-detail', params: { slug: 'featured' }}">
        <template slot="icon">
          <IconSpotlight/>
        </template>
      </SectionHeading>
      <div class="main-content-wrapper">
        <div class="image-wrapper">
          <img
            class="image"
            src="https://cdn.stateofthedapps.com/dapps/cryptoassault/product_image_small_cryptoassault_c62ecc34da4890267fa15703690aecc5d6e20aa010835294d88df0ed02335e97_opti.jpg">
        </div>
        <div class="text-wrapper">
          <h2 class="title">
            <nuxt-link
              :to="{name: 'spotlight-detail', params: {slug: 'slug'}}"
              class="heading-link">Create an organization with Aragon</nuxt-link>
          </h2>
          <div class="description">
            <p>Wafer lemon drops biscuit ice cream. Dragée biscuit carrot cake biscuit powder. Candy soufflé bonbon marzipan chocolate cake. Bear claw apple pie halvah powder. Bonbon cupcake lollipop fruitcake pastry icing jelly-o sugar plum wafer. Icing pastry sesame snaps. Toffee cotton candy jelly beans. Bear claw apple pie halvah powder. Bonbon cupcake lollipop fruitcake pastry icing jelly-o sugar plum wafer. Icing pastry sesame snaps.</p>
          </div>
          <p class="link-wrapper">
            <nuxt-link
              :to="{name: 'spotlight-detail', params: {slug: 'slug'}}"
              class="link">Read more 
              <IconChevron
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
  @include tweakpoint('min-width', 1100px) {
    width: 40%;
  }
}

.heading-link {
  text-decoration: none;
  color: $color--purple;
}

.image {
  width: 100%;
  height: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom: 8px solid $color--gray;
  display: block;
  @include tweakpoint('min-width', 1100px) {
    border-radius: 0;
    border: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    border-right: 8px solid $color--gray;
  }
}

.link-wrapper {
  margin: 0;
}

.text-wrapper {
  padding: 20px 30px;
  @include tweakpoint('min-width', 1100px) {
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

p {
  font-size: 1.15rem;
  line-height: 1.3;
}
</style>
