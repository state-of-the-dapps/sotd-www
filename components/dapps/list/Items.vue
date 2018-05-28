<template>
  <section class="section -items">
    <div class="container">
      <transition name="fade" v-if="itemCount > 0">
        <div class="list">
          <div class="item -linkexchange">
            <Linkexchange/>
          </div>
          <nuxt-link v-for="(item, key) in items" @click.native="trackDappView(item.slug)" :to="{ name: 'dapp-detail', params: { slug: item.slug } }" class="item" :class="'-' + item.status" :key="key">
            <div class="new-banner" v-if="item.isNew"><span class="new-message" :class="'-' + item.status">New</span></div>
            <ul class="badge-list" v-if="item.badges">
              <li v-for="(badge, index) in item.badges" :key="index" class="badge-item"><img :src="require('~/assets/images/badges/' + badge + '.png')" width="16" class="badge-image"><div class="badge-info">{{ badge | formatDappBadge | capitalize }}</div></li>
            </ul>
            <div class="info">
              <div class="title-attribution-wrapper">
                <div>
                  <h3 class="title">{{ item.name | truncate(25) }}<span v-if="item.isNsfw"  class="note -nsfw" :class="'-' + item.status">NSFW</span></h3>
                  <p class="attribution" v-if="item.authors">by <span v-if="item.authors.length > 0"><strong>{{ item.authors[0] | truncate(20) }}</strong></span><span v-if="item.authors.length > 1"> +{{ item.authors.length - 1 }}</span></p>
                </div>
              </div>
              <div class="description-wrapper">
                <p class="description">{{ item.teaser | truncate(75) }}</p>
              </div>
            </div>
            <p class="status" :class="'-' + item.status">{{ item.status | formatDappStatus }}</p>
          </nuxt-link>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
  import { trackDappView } from '~/helpers/mixpanel'
  import Linkexchange from '~/components/shared/Linkexchange.vue'

  export default {
    props: [
      'items',
      'itemCount',
      'sourceCollection'
    ],
    components: {
      Linkexchange
    },
    methods: {
      trackDappView (slug) {
        const sourceCollection = this.sourceCollection
        const sourceComponent = '/dapps/list/items/item'
        const sourcePath = this.$route.path
        const targetDapp = slug
        const action = trackDappView(sourceCollection, sourceComponent, sourcePath, targetDapp)
        this.$mixpanel.track(action.name, action.data)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .container {
    padding: 0px;
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding: 0 10px;
    }
  }

  .attribution {
    margin: 0;
  }

  .badge-item {
    position: relative;
    margin-left: 2px;
    &:hover .badge-info {
      opacity: 1;
    }
  }

  .badge-info {
    pointer-events: none;
    position: absolute;
    top: -25px;
    right: 0;
    z-index: 5;
    font-weight: 600;
    text-align: center;
    background: $color--gray;
    border: 1px solid $color--black;
    padding: 3px 8px 2px;
    text-transform: uppercase;
    font-size: .7rem;
    opacity: 0;
    transition: opacity .5s ease;
    white-space: nowrap;
    box-shadow: 0 0 20px rgba($color--black,.1);
    &:after {
      position: absolute;
      bottom: -7px;
      right: 6px;
      content: '';
      width: 1px;
      height: 7px;
      background: $color--black;
    }
  }

  .badge-list {
    position: absolute;
    display: flex;
    right: 10px;
    top: -2px;
    z-index: 8;
  }

  .description-wrapper {
    flex-grow: 1;
    @include tweakpoint('min-width', $tweakpoint--default) {
      height: 75px;
      display: flex;
      align-items: center;
    }
  }

  .description {
    margin: 0;
  }

  .info {
    padding: 0 20px;
    margin-top: -25px;
    @include tweakpoint('min-width', $tweakpoint--default) {
      margin-top: 0;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      display: flex;
      align-items: center;
    }
  }

  .item {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 200px;
    margin: 0 10px 10px 10px;
    background: white;
    box-shadow: 0 0 20px rgba($color--black,.1);
    transition: transform .3s ease, opacity .3s ease;
    text-decoration: none;
    order: 10;
    &:nth-child(1) {
      order: 3;
    }
    &:nth-child(2) {
      order: 1;
    }
    &:nth-child(3) {
      order: 2;
    }
    @include tweakpoint('min-width', 750px) {
      width: calc(50% - 20px);
      &:nth-child(1) {
        order: 2;
      }
      &:nth-child(2) {
        order: 1;
      }
    }
    @include tweakpoint('min-width', $tweakpoint--default) {
      width: calc(33.33% - 20px);
      height: 285px;
      justify-content: center;
      align-items: flex-start;
      margin-bottom: 20px;
      &:nth-child(1) {
        order: 3;
      }
      &:nth-child(2) {
        order: 1;
      }
      &:nth-child(3) {
        order: 2;
      }
    }
    @include tweakpoint('min-width', 1000px) {
      width: calc(25% - 20px);
      &:nth-child(1) {
        order: 4;
      }
      &:nth-child(2) {
        order: 1;
      }
      &:nth-child(3) {
        order: 2;
      }
      &:nth-child(4) {
        order: 3;
      }
    }
    @include tweakpoint('min-width', 1150px) {
      width: calc(20% - 20px);
      &:nth-child(1) {
        order: 5;
      }
      &:nth-child(2) {
        order: 1;
      }
      &:nth-child(3) {
        order: 2;
      }
      &:nth-child(4) {
        order: 3;
      }
      &:nth-child(5) {
        order: 4;
      }
    }
    @include tweakpoint('min-width', 1450px) {
      width: calc(16.66667% - 20px);
      &:nth-child(1) {
        order: 6;
      }
      &:nth-child(2) {
        order: 1;
      }
      &:nth-child(3) {
        order: 2;
      }
      &:nth-child(4) {
        order: 3;
      }
      &:nth-child(5) {
        order: 4;
      }
      &:nth-child(6) {
        order: 5;
      }
    }
    @include tweakpoint('min-width', 1750px) {
      width: calc(14.2857142857% - 20px);
      &:nth-child(1) {
        order: 7;
      }
      &:nth-child(2) {
        order: 1;
      }
      &:nth-child(3) {
        order: 2;
      }
      &:nth-child(4) {
        order: 3;
      }
      &:nth-child(5) {
        order: 4;
      }
      &:nth-child(6) {
        order: 5;
      }
      &:nth-child(7) {
        order: 6;
      }
    }
    &:hover {
      cursor: pointer;
      transform: translateY(-4px);
    }
    &.-live {
      background: $color--dapp-live-light;
      border-color: $color--dapp-live;
    }
    &.-beta {
      background: $color--dapp-beta-light;
      border-color: $color--dapp-beta;
    }
    &.-prototype {
      background: $color--dapp-prototype-light;
      border-color: $color--dapp-prototype;
    }
    &.-wip {
      background: $color--dapp-wip-light;
      border-color: $color--dapp-wip;
    }
    &.-concept {
      background: $color--dapp-concept-light;
      border-color: $color--dapp-concept;
    }
    &.-stealth {
      background: $color--dapp-stealth-light;
      border-color: $color--dapp-stealth;
    }
    &.-abandoned, &.-unknown {
      background: $color--dapp-abandoned-light;
      border-color: $color--dapp-abandoned;
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
    &.-linkexchange {
      background: transparent;
      box-shadow: none;
      overflow: hidden;
      &:hover {
        transform: none;
      }
    }
    &.--unfocused {
      opacity: .6;
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }

  .new-banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 47px;
    height: 47px;
    background: url('~/assets/images/ribbon.png') top left no-repeat;
    background-size: 47px 47px;
    margin: 0;
    z-index: 5;
  }

  .new-message {
    color: $color--gray;
    display: inline-block;
    font-size: .7rem;
    text-transform: uppercase;
    margin-top: 6px;
    margin-left: 6px;
    &.-live {
      color: $color--dapp-live-light;
    }
    &.-beta {
      color: $color--dapp-beta-light;
    }
    &.-prototype {
      color: $color--dapp-prototype-light;
    }
    &.-wip {
      color: $color--dapp-wip-light;
    }
    &.-concept {
      color: $color--dapp-concept-light;
    }
    &.-inactive {
      color: $color--dapp-abandoned-light;
    }
  }

  .status {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    margin: 0;
    padding: 9px 10px;
    font-size: .8rem;
    text-transform: uppercase;
    font-weight: 700;
    color: rgba($color--black, .75);
    line-height: 1.5;
    &.-live {
      background: $color--dapp-live;
    }
    &.-beta {
      background: $color--dapp-beta;
    }
    &.-prototype {
      background: $color--dapp-prototype;
    }
    &.-wip {
      background: $color--dapp-wip;
    }
    &.-concept {
      background: $color--dapp-concept;
    }
    &.-stealth {
      background: $color--dapp-stealth;
    }
  }

  .title {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 600;
  }

  .title-attribution-wrapper {
    @include tweakpoint('min-width', $tweakpoint--default) {
      margin-top: 25px;
      height: 100px;
      display: flex;
      align-items: center;
    }
  }
</style>
