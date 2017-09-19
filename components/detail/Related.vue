<template>
  <ul class="list" v-if="items && items.length > 0">
    <nuxt-link :to="{ name: slug, params: { slug: item.slug } }" @click.native="setActive(item.slug)" tag="li" v-for="(item, key) in items" class="item" :class="'-' + item.status" :key="item.slug">
      <h3 class="title">{{ item.name | truncate(25) }}</h3>
      <p class="teaser">{{ item.teaser }}</p>
      <p class="status" :class="'-' + item.status"></p>
    </nuxt-link>
  </ul>
</template>

<script>
  export default {
    computed: {
      items () {
        return this.$store.getters['dapp/activeRelated']
      },
      popup () {
        return this.$store.getters['dapp/popup']
      },
      slug () {
        if (this.popup === true) {
          return 'index-dapps-slug'
        } else {
          return 'dapps-slug'
        }
      }
    },
    methods: {
      setActive (slug) {
        this.$mixpanel.track('DApp - Related')
        if (this.popup) {
          this.$store.dispatch('dapps/setActiveItemIndex', -1)
          document.getElementById('close').scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .item {
    position: relative;
    overflow: hidden;
    align-items: center;
    width: 100%;
    height: 125px;
    margin: 0 10px 10px 10px;
    padding: 10px;
    text-align: center;
    background: white;
    box-shadow: 0 0 20px rgba($color--mine-shaft,.1);
    transition: transform .4s ease, opacity .4s ease;
    @include tweakpoint('min-width', 750px) {
      width: calc(50% - 20px);
    }
    @include tweakpoint('min-width', 900px) {
      width: calc(33.33% - 20px);
      height: 125px;
      justify-content: center;
      align-items: flex-start;
      margin-bottom: 20px;
    }
    @include tweakpoint('min-width', 1000px) {
      width: calc(25% - 20px);
    }
    @include tweakpoint('min-width', 1150px) {
      width: calc(20% - 20px);
    }
    @include tweakpoint('min-width', 1450px) {
      width: calc(16.66667% - 20px);
    }
    @include tweakpoint('min-width', 1750px) {
      width: calc(14.2857142857% - 20px);
    }
    &:hover {
      cursor: pointer;
      transform: scale3d(1.015, 1.015, 1);
    }
    &.-live {
      background: $color--screamin-green;
    }
    &.-demo {
      background: $color--paris-daisy;
    }
    &.-prototype {
      background: $color--golden-tainoi;
    }
    &.-wip {
      background: $color--anakiwa;
    }
    &.-concept {
      background: $color--perfume;
    }
    &.-stealth {
      background: $color--alabaster;
    }
    &.-abandoned, &.-unknown {
      background: $color--alabaster;
      &:after {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(white,.7);
        pointer-events: none;
      }
    }
    &.-preview {
      width: 300px;
      margin: 0 auto;
      @include tweakpoint('min-width', $tweakpoint--default) {
        margin-left: 0;
      }
      &:hover {
        transform: none;
        cursor: default;
      }
    }
    &.--unfocused {
      opacity: .6;
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .status {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    border-bottom: 4px solid rgba($color--mine-shaft,.2);
    margin: 0;
    padding: 5px;
    font-size: .8rem;
    text-transform: uppercase;
    font-weight: 700;
    &.-live {
      border-color: $color--bright-green;
    }
    &.-demo {
      border-color: $color--gorse;
    }
    &.-prototype {
      border-color: $color--koromiko;
    }
    &.-wip {
      border-color: $color--malibu;
    }
    &.-concept {
      border-color: $color--portage;
    }
  }

  .teaser {
    margin-top: .5rem;
  }

  .title {
    margin: 0;
    padding-top: 2px;
    font-size: 1.5rem;
  }
</style>
