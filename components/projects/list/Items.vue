<template>
  <section class="section -items">
    <div class="container">
      <transition name="fade" v-if="itemCount > 0">
        <div class="list">
          <nuxt-link v-for="(item, key) in items" @click.native="setIndex(item, key)" :to="{ name: 'index-projects-slug', params: { slug: item.slug } }" class="item" :class="'-' + item.status" :key="item.slug">
            <div class="new-banner" v-if="item.isNew"><span class="new-message" :class="'-' + item.status">New</span></div>
            <ul class="badge-list" v-if="item.badges">
              <li v-for="badge in item.badges" class="badge-item"><img :src="require('~/assets/images/badges/' + badge + '.png')" width="16" class="badge-image"><div class="badge-info">{{ badge | formatProjectsBadge | capitalize }}</div></li>
            </ul>
            <div class="info">
              <div class="icon-wrapper" :class="'-' + item.status">
                <p class="icon-placeholder">{{ item.name | firstLetter | capitalize }}</p>
              </div>
              <div class="description-wrapper">
                <h3 class="title">{{ item.name | truncate(25) }}<span v-if="item.isNsfw"  class="note -nsfw" :class="'-' + item.status">NSFW</span></h3>
                <p class="attribution">by <strong>{{ item.author }}</strong> {{ item.additionalAuthors | additionalAuthorsCount }}</p>
                <p class="description">{{ item.teaser | truncate(75) }}</p>
              </div>
            </div>
            <p class="status" :class="'-' + item.status">{{ item.status | formatProjectStatus }}</p>
          </nuxt-link>
        </div>
      </transition>
    </div>
  </section>
</template>

<script>
  export default {
    computed: {
      items () {
        return this.$store.getters['projects/list/items']
      },
      itemCount () {
        return this.$store.getters['projects/list/itemCount']
      }
    },
    methods: {
      setIndex (item, key) {
        this.$store.dispatch('projects/detail/setViewMethod', 'popup')
        this.$store.dispatch('projects/list/setActiveItemIndex', key)
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
    background: $color--gallery;
    border: 1px solid $color--mine-shaft;
    padding: 3px 8px 2px;
    text-transform: uppercase;
    font-size: .7rem;
    opacity: 0;
    transition: opacity .5s ease;
    white-space: nowrap;
    box-shadow: 0 0 20px rgba($color--mine-shaft,.1);
    &:after {
      position: absolute;
      bottom: -7px;
      right: 6px;
      content: '';
      width: 1px;
      height: 7px;
      background: $color--mine-shaft;
    }
  }

  .badge-list {
    position: absolute;
    display: flex;
    right: 10px;
    top: -2px;
    z-index: 5;
  }

  .description-wrapper {
    flex: 1;
  }

  .description {
    margin: 0;
    @include tweakpoint('min-width', 900px) {
      margin-top: 10px;
    }
  }

  .icon-image {
    max-width: 100%;
  }

  .icon-placeholder {
    font-family: Arial, sans-serif;
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
    background: rgba(0,0,0,.1);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 50%;
    font-size: 1.7rem;
    font-weight: 300;
    margin-right: 10px;
    &.-live {
      background: $color--bright-green;
    }
    &.-demo {
      background: $color--gorse;
    }
    &.-prototype {
      background: $color--koromiko;
    }
    &.-wip {
      background: $color--malibu;
    }
    &.-concept {
      background: $color--portage;
    }
    @include tweakpoint('min-width', 900px) {
      margin-right: 0;
      width: 75px;
      height: 75px;
    }
  }

  .info {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    margin-top: -10px;
    @include tweakpoint('min-width', 900px) {
      flex-direction: column;
      justify-content: center;
      text-align: center;
      margin-top: 25px;
    }
  }

  .item {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 125px;
    margin: 0 10px 10px 10px;
    background: white;
    box-shadow: 0 0 20px rgba($color--mine-shaft,.1);
    transition: transform .3s ease, opacity .3s ease;
    text-decoration: none;
    @include tweakpoint('min-width', 750px) {
      width: calc(50% - 20px);
    }
    @include tweakpoint('min-width', 900px) {
      width: calc(33.33% - 20px);
      height: 285px;
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
    color: $color--gallery;
    display: inline-block;
    font-size: .7rem;
    text-transform: uppercase;
    margin-top: 6px;
    margin-left: 6px;
    &.-live {
      color: $color--screamin-green;
    }
    &.-demo {
      color: $color--paris-daisy;
    }
    &.-prototype {
      color: $color--golden-tainoi;
    }
    &.-wip {
      color: $color--anakiwa;
    }
    &.-concept {
      color: $color--perfume;
    }
    &.-inactive {
      color: $color--alabaster;
    }
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

  .title {
    margin: 0;
    font-size: 1.5rem;
    @include tweakpoint('min-width', 900px) {
      margin-top: 15px;
    }
  }
</style>
