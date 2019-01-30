<template>
  <div class="FeaturedSpotlight">
    <div class="wrapper">
      <div class="main-content-wrapper">
        <div class="image-wrapper">
          <media :query="{maxWidth: 899}">
            <h3 class="section-name">DApp Spotlight</h3>
          </media>
          <img
            class="image"
            src="https://cdn.stateofthedapps.com/dapps/cryptoassault/product_image_small_cryptoassault_c62ecc34da4890267fa15703690aecc5d6e20aa010835294d88df0ed02335e97_opti.jpg">
        </div>
        <div class="text-wrapper">
          <media :query="{minWidth: 900}">
            <h3 class="section-name">DApp Spotlight</h3>
          </media>
          <h2 class="title">Create an organization with Aragon</h2>
          <div class="description">
            <p>Wafer lemon drops biscuit ice cream. Dragée biscuit carrot cake biscuit powder. Candy soufflé bonbon marzipan chocolate cake.</p>
            <p>Bear claw apple pie halvah powder. Bonbon cupcake lollipop fruitcake pastry icing jelly-o sugar plum wafer. Icing pastry sesame snaps. Toffee cotton candy jelly beans.</p>
            <p>Bear claw apple pie halvah powder. Bonbon cupcake lollipop fruitcake pastry icing jelly-o sugar plum wafer. Icing pastry sesame snaps. Toffee cotton candy jelly beans.</p>
            <p class="link-wrapper">
              <a
                href="#"
                class="link">Read more 
                <IconChevron
                  :width="9"
                  :height="9"
                  direction="right"
                  fill="black"
                />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from './BaseButton'
import IconChevron from './IconChevron'
import Media from 'vue-media'
import SectionHeading from './SectionHeading'

export default {
  components: {
    BaseButton,
    IconChevron,
    Media,
    SectionHeading
  }
}
</script>

<style lang="scss" scoped>
.FeaturedSpotlight {
  margin: 3rem 0;
  padding: 2rem 0;
  background: rgba($color--white, 0.9);
  overflow: auto;
}

.description {
  @include tweakpoint('min-width', 1150px) {
    column-count: 2;
    column-gap: 20px;
  }
  p:first-child {
    margin-top: 0;
  }
}

.wrapper {
  @include margin-wrapper-main;
}

.main-content-wrapper {
  margin-left: -10px;
  margin-right: -10px;
  @include tweakpoint('min-width', 900px) {
    display: flex;
  }
  > div {
    margin-left: 10px;
    margin-right: 10px;
  }
}

.image-wrapper {
  @include tweakpoint('min-width', 900px) {
    width: 50%;
  }
}

.image {
  width: 100%;
  border-radius: 3px;
  display: block;
}

.link-wrapper {
  text-align: right;
  margin: 0;
}

.link {
  font-size: 0.95rem;
  text-transform: uppercase;
  font-weight: 700;
  color: $color--black;
  text-decoration: none;
}

.text-wrapper {
  @include tweakpoint('min-width', 900px) {
    width: 50%;
  }
}

.title {
  @include title-2;
  font-size: 2.75rem;
  margin-top: 1.5rem;
  margin-bottom: 1.25rem;
  line-height: 0.9;
}

.section-name {
  text-transform: uppercase;
  font-size: 1rem;
  color: rgba($color--black, 0.6);
  margin-top: 0;
}

p {
  font-size: 1.25rem;
  line-height: 1.25;
}
</style>
