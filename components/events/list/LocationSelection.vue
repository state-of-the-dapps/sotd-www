<template>
  <transition name="fade">
    <div class="container -location-selection" v-on-clickaway="reset">
    </div>
  </transition>
</template>

<script>
  import { directive as onClickaway } from 'vue-clickaway'

  export default {
    destroyed () {
      // reset tags and hide when a new route is activated (v-on-clickaway doesn't fire on route change)
      this.hide()
    },
    directives: {
      onClickaway: onClickaway
    },
    methods: {
      hide () {
        this.$store.dispatch('events/hideLocationSelection')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .container {
    &.-location-selection {
      position: absolute;
      background: rgba($color--gallery,.9);
      padding: 10px;
      box-shadow: 0 17px 70px rgba($color--mine-shaft,.2);
      width: 300px;
      top: 65px;
      right: 10px;
      overflow: hidden;
      z-index: 10;
      @include tweakpoint('min-width', $tweakpoint--default) {
        top: 85px;
        right: 20px;
      }
    }
  }

  .item {
    display: block;
    padding: 7px 28px 7px 10px;
    background: lighten($color--gallery,2%);
    box-shadow: 0 0 20px rgba($color--mine-shaft,.1);
    text-decoration: none;
    position: relative;
    margin: 2px;
    &:hover {
      cursor: pointer;
    }
    &:after {
      content: "";
      position: absolute;
      right: 10px;
      bottom: 9px;
      background: url('~/assets/images/close/small.png') center center no-repeat;
      background-size: 9px 9px;
      width: 9px;
      height: 9px;
      transform: rotate(45deg);
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
</style>
