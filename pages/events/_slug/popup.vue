<template>
  <transition name="fade">
    <div class="popup-outer">
      <div class="popup-wrap">
        <div class="popup-container" id="top" v-on-clickaway="hide">
          <Lead/>
          <CategoriesSocial/>
          <MainInfo/>
          <Tools/>
        </div>
        <div class="close" id="close">
          <img src="~/assets/images/close/large.png" width="20" />
        </div>
        <nuxt-link tag="div" v-if="itemIndex !== -1 && itemIndex > 0" class="prev" :to="{ name: 'events-slug-popup', params: { slug: items[itemIndex - 1].slug } }" @click.stop.native="setEvent('prev', items[itemIndex - 1].slug)">
          <img src="~/assets/images/arrows/back.png" width="20" />
        </nuxt-link>
        <nuxt-link tag="div" v-if="itemIndex !== -1 && itemIndex < items.length - 1" :to="{ name: 'events-slug-popup', params: { slug: items[itemIndex + 1].slug } }" class="next" @click.stop.native="setEvent('next', items[itemIndex + 1].slug)">
          <img src="~/assets/images/arrows/next.png" width="20" />
        </nuxt-link>
      </div>
    </div>
  </transition>
</template>

<script>
  import { directive as onClickaway } from 'vue-clickaway'
  import axios from '~/helpers/axios'
  import MainInfo from '~/components/events/detail/MainInfo.vue'
  import Lead from '~/components/events/detail/Lead.vue'
  import CategoriesSocial from '~/components/events/detail/CategoriesSocial.vue'
  import Tools from '~/components/events/detail/Tools.vue'

  export default {
    components: {
      MainInfo,
      Lead,
      CategoriesSocial,
      Tools
    },
    computed: {
      friendlyUrl () {
        return this.$store.getters['events/list/friendlyUrl']
      },
      item () {
        return this.$store.getters['events/detail/item']
      },
      itemIndex () {
        return this.$store.getters['events/list/activeItemIndex']
      },
      items () {
        return this.$store.getters['events/list/items']
      },
      viewMethod () {
        return this.$store.getters['events/list/viewMethod']
      }
    },
    destroyed () {
      document.body.classList.remove('--has-popup')
      this.$store.dispatch('events/detail/hidePopup')
      this.$store.dispatch('events/detail/resetItem')
      window.removeEventListener('keyup', this.escapeToHide)
    },
    directives: {
      onClickaway: onClickaway
    },
    head () {
      return {
        title: this.item.name + ' — State of the ÐApps',
        meta: [
          { hid: 'description', name: 'description', content: this.item.teaser }
        ]
      }
    },
    fetch ({ store, params, redirect, error }) {
      return axios
        .get('events/' + params.slug)
        .then(response => {
          const data = response.data
          const item = data.item
          store.dispatch('events/detail/setItem', item)
          if (!Object.keys(item).length > 0) {
            error({ statusCode: 404 })
          }
        })
    },
    methods: {
      escapeToHide (event) {
        if (event.keyCode === 27) {
          this.hide()
        }
      },
      hide () {
        this.$mixpanel.track('Event popup - Hide')
        this.$store.dispatch('events/list/setActiveItemIndex', -1)
        this.$router.push(this.friendlyUrl)
      },
      setEvent (direction, slug) {
        let num = 0
        if (direction === 'prev') {
          num = -1
          this.$store.dispatch('events/detail/setViewMethod', 'prev')
        } else if (direction === 'next') {
          num = 1
          this.$store.dispatch('events/detail/setViewMethod', 'next')
        }
        this.$store.dispatch('events/list/setActiveItemIndex', this.itemIndex + num)
        document.getElementById('close').scrollIntoView()
        this.$mixpanel.track('Event - View', {
          targetEvent: slug,
          method: this.viewMethod
        }, this.$store.dispatch('events/detail/resetViewMethod'))
      }
    },
    mounted () {
      this.$store.dispatch('setSiteSection', 'events')
      this.$mixpanel.track('Event - View', {
        targetEvent: this.$route.params.slug,
        method: this.viewMethod
      }, this.$store.dispatch('events/detail/resetViewMethod'))
      document.body.classList.add('--has-popup')
      this.$store.dispatch('events/detail/showPopup')
      window.addEventListener('keyup', this.escapeToHide)
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .close {
    z-index: 150;
    position: absolute;
    cursor: pointer;
    left: 50%;
    margin-left: -20px;
    top: 5px;
    transition: opacity .2s ease;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:active {
      top: 6px;
    }
    &:hover {
      opacity: .8;
    }
  }

  .next {
    z-index: 150;
    position: absolute;
    top: 5px;
    cursor: pointer;
    right: 5px;
    transition: opacity .2s ease;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      opacity: .8;
    }
    @include tweakpoint('min-width', '1300px') {
      position: fixed;
      left: 50%;
      top: 50%;
      margin-top: -20px;
      margin-left: 610px;
      &:active {
        margin-top: -19px;
      }
    }
  }

  .popup-container {
    position: relative;
    max-width: 1200px;
    margin: 50px auto;
    z-index: 120;
    background: url('~/assets/images/bg.jpg') center center;
    background-size: 100px 100px;
  }

  .popup-outer {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba($color--mine-shaft, .9);
    top: 0;
    left: 0;
    z-index: 100;
    overflow: hidden;
  }

  .popup-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 110;
    top: 0;
    left: 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  .prev {
    z-index: 150;
    position: absolute;
    top: 5px;
    cursor: pointer;
    left: 5px;
    transition: opacity .2s ease;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      opacity: .8;
    }
    @include tweakpoint('min-width', '1300px') {
      position: fixed;
      left: 50%;
      top: 50%;
      margin-top: -20px;
      margin-left: -650px;
      &:active {
        margin-top: -19px;
      }
    }
  }
</style>

