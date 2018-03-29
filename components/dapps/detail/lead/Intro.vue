<template>
  <div class="wrapper">
    <span v-if="historyExists" class="back" @click="$router.go(-1)"><img src="~/assets/images/arrows/next.png" width="12"></span>
    <ul class="badge-list" v-if="item.badges && item.badges.length > 0">
      <li v-for="(badge, index) in item.badges" :key="index" @click="$mixpanel.track('DApp - Badge', { detail: true })" class="badge-item"><img :src="require('~/assets/images/badges/' + badge + '.png')" width="16" class="badge-image">
        <div class="badge-info">{{ badge | formatDappBadge | capitalize }}</div>
      </li>
    </ul>
    <div class="info">
      <div class="description-wrapper">
        <h3 class="title">{{ item.name }}<span v-if="item.isNsfw" class="note -nsfw" :class="'-' + item.status">NSFW</span></h3>
        <p class="description">{{ item.teaser }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        historyExists: false
      }
    },
    mounted () {
      if (window.history.length > 2) {
        this.historyExists = true
      }
    },
    computed: {
      item () {
        return this.$store.getters['dapps/detail/item']
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .back {
    display: none;
    position: absolute;
    top: -40px;
    margin-top: -15px;
    left: 20px;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    background: $color--black;
    color: $color--gray;
    padding: 4px 7px 4px 5px;
    z-index: 10;
    font-size: .9rem;
    display: flex;
    align-items: center;
    justify-content: center;
    @include tweakpoint('min-width', $tweakpoint--default) {
      display: flex;
      top: 50%;
    }
    img {
      transform: rotate(180deg)
    }
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
    top: 31px;
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
      top: -7px;
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
    z-index: 10;
    @include tweakpoint('min-width', $tweakpoint--default) {
      right: 25px;
    }
  }

  .contract {
    margin-top: 1rem;
    margin-bottom: 0;
    font-size: 1.1rem;
  }

  .description {
    margin: 0;
    padding-right: 10px;
    font-size: 1.25rem;
    @include tweakpoint('min-width', 900px) {
      max-width: 350px;
    }
  }

  .description-wrapper {
    flex-grow: 1;
    text-align: center;
    @include tweakpoint('min-width', 600px) {
      text-align: left;
    }    
  }

  .info {
    display: flex;
    align-items: center;
    padding: 10px 0;
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding: 10px 0;
      margin-left: 25px;
    }
  }

  .new-banner {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    background: $color--black;
    padding-right: 20px;
    padding-bottom: 3px;
    margin-left: 10px;
    @include tweakpoint('min-width', 900px) {
      background: url('~/assets/images/ribbon.png') top left no-repeat;
      background-size: 47px 47px;
      width: 47px;
      height: 47px;
      padding-right: 0;
      padding-bottom: 0;
      margin-left: 0;
    }
  }

  .new-message {
    color: $color--gray;
    display: inline-block;
    font-size: .7rem;
    text-transform: uppercase;
    margin-top: 2px;
    margin-left: 20px;
    @include tweakpoint('min-width', 900px) {
      margin-top: 6px;
      margin-left: 6px;
    }
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
    &.-stealth {
      color: $color--dapp-stealth-light;
    }
    &.-abandoned, &.-unknown {
      color: $color--dapp-abandoned-light;
    }
  }

  .title {
    margin: 0;
    font-size: 1.5rem;
    @include tweakpoint('min-width', 900px) {
      font-size: 1.75rem;
    }
  }
</style>
