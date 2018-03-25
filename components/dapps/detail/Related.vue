<template>
  <section class="section -related" v-if="items && items.length > 0">
    <div class="container">
      <h2 class="heading">Related ÐApps</h2>
      <ul class="list">
        <nuxt-link :to="{ name: routeName, params: { slug: item.slug } }" @click.native="trackDappView(item.slug)" tag="li" v-for="item in items" class="item" :class="'-' + item.status" :key="item.slug">
          <h3 class="title">{{ item.name | truncate(25) }}</h3>
          <p class="teaser">{{ item.teaser }}</p>
          <p class="status" :class="'-' + item.status"></p>
        </nuxt-link>
      </ul>
    </div>
  </section>
</template>

<script>
  export default {
    computed: {
      items () {
        return this.$store.getters['dapps/detail/relatedItems']
      },
      popupIsActive () {
        return this.$store.getters['dapps/detail/popupIsActive']
      },
      routeName () {
        if (this.popupIsActive === true) {
          return 'dapps-slug-popup'
        } else {
          return 'dapps-slug'
        }
      },
      viewMethod () {
        return this.$store.getters['dapps/list/viewMethod']
      }
    },
    methods: {
      trackDappView (slug) {
        this.$mixpanel.track('DApp - View', {
          targetDapp: slug,
          method: 'related'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .heading {
    text-align: center;
    font-weight: 300;
    margin-bottom: 1.5rem;
  }

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
    word-wrap: break-word;
    box-shadow: 0 0 20px rgba($color--mine-shaft,.1);
    transition: transform .3s ease, opacity .3s ease;
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
      transform: translateY(-4px);
    }
    &.-live {
      background: $color--dapp-live-light;
    }
    &.-beta {
      background: $color--dapp-beta-light;
    }
    &.-prototype {
      background: $color--dapp-prototype-light;
    }
    &.-wip {
      background: $color--dapp-wip-light;
    }
    &.-concept {
      background: $color--dapp-concept-light;
    }
    &.-stealth {
      background: $color--dapp-stealth-light;
    }
    &.-abandoned, &.-unknown {
      background: $color--dapp-unknown-light;
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
      border-color: $color--dapp-live;
    }
    &.-beta {
      border-color: $color--dapp-beta;
    }
    &.-prototype {
      border-color: $color--dapp-prototype;
    }
    &.-wip {
      border-color: $color--dapp-wip;
    }
    &.-concept {
      border-color: $color--dapp-concept;
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

  .section {
    background: lighten($color--gallery, 100%);
  }
</style>
