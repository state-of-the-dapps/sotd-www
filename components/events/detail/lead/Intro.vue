<template>
  <div class="wrapper">
    <ul class="badge-list" v-if="item.badges && item.badges.length > 0">
      <li v-for="(badge, index) in item.badges" :key="index" @click="$mixpanel.track('Event - Badge', { detail: true })" class="badge-item"><img :src="require('~/assets/images/badges/' + badge + '.png')" width="16" class="badge-image">
        <div class="badge-info">{{ badge | capitalize }}</div>
      </li>
    </ul>
    <div class="info">
      <div @click="$mixpanel.track('Event - Icon', { detail: true })" class="icon-wrapper" :class="'-' + item.status">
        <p class="date">Date</p>
      </div>
      <div class="description-wrapper">
        <h3 class="title">{{ item.name }}</h3>
        <p class="description">{{ item.teaser }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      item () {
        return this.$store.getters['events/detail/item']
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

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
      top: -7px;
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
    z-index: 10;
    @include tweakpoint('min-width', $tweakpoint--default) {
      right: 20px;
    }
  }

  .date {
    font-size: 1.5rem;
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
  }

  .icon-image {
    width: 100%;
    max-width: 100%;
  }

  .icon-placeholder {
    margin: 0;
    font-family: Arial, sans-serif;
  }

  .icon-wrapper {
    width: 60px;
    height: 60px;
    background: $color--gallery;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    font-size: 1.7rem;
    margin-right: 10px;
    @include tweakpoint('min-width', 900px) {
      width: 100px;
      height: 100px;
      margin-right: 20px;
    }
  }

  .info {
    display: flex;
    align-items: center;
    padding: 10px 0;
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding: 10px 0;
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
