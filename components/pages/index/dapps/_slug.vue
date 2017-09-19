<template>
  <transition name="fade">
    <div class="popup-outer">
      <div class="popup-wrap">
        <div class="popup-container" id="top" v-on-clickaway="hide">
          <IntroCtaSection/>
          <StatusSocialSection/>
          <MainInfoSection/>
          <ToolsSection/>
          <RelatedDappsSection/>
        </div>
        <div @click="$mixpanel.track('DApp popup - Close')" class="close" id="close">
          <img src="/images/close/large.png" width="20" />
        </div>
        <nuxt-link tag="div" v-if="itemIndex !== -1 && itemIndex > 0" class="prev" :to="{ name: 'index-dapps-slug', params: { slug: items[itemIndex - 1].slug } }" @click.stop.native="updateIndex('prev')">
          <img src="/images/arrows/back.png" width="20" />
        </nuxt-link>
        <nuxt-link tag="div" v-if="itemIndex !== -1 && itemIndex < items.length - 1" :to="{ name: 'index-dapps-slug', params: { slug: items[itemIndex + 1].slug } }" class="next" @click.stop.native="updateIndex('next')">
          <img src="/images/arrows/next.png" width="20" />
        </nuxt-link>
      </div>
    </div>
  </transition>
</template>

<script>
  import MainInfoSection from '~/components/sections/detail/MainInfo.vue'
  import IntroCtaSection from '~/components/sections/detail/IntroCta.vue'
  import RelatedDappsSection from '~/components/sections/detail/RelatedDapps.vue'
  import StatusSocialSection from '~/components/sections/detail/StatusSocial.vue'
  import ToolsSection from '~/components/sections/detail/Tools.vue'
  import { directive as onClickaway } from 'vue-clickaway'
  import axios from '~/plugins/axios'

  export default {
    components: {
      MainInfoSection,
      IntroCtaSection,
      RelatedDappsSection,
      StatusSocialSection,
      ToolsSection
    },
    computed: {
      itemIndex () {
        return this.$store.getters['dapps/activeItemIndex']
      },
      items () {
        return this.$store.getters['dapps/items']
      },
      popup () {
        return this.$store.getters['dapp/popup']
      }
    },
    destroyed () {
      document.body.classList.remove('--has-popup')
      this.$store.dispatch('dapp/hidePopup')
      this.$store.dispatch('dapp/reset')
    },
    directives: {
      onClickaway: onClickaway
    },
    methods: {
      getData () {
        axios
          .get('dapps/' + this.$route.params.slug)
          .then(response => {
            this.$store.dispatch('dapp/setActive', response.data)
          })
      },
      hide () {
        this.$mixpanel.track('DApp popup - Hide')
        this.$store.dispatch('dapps/setActiveItemIndex', -1)
        this.$router.push('/')
      },
      updateIndex (direction) {
        let num = 0
        if (direction === 'prev') {
          num = -1
        } else if (direction === 'next') {
          num = 1
        }
        this.$mixpanel.track('DApp popup - ' + direction.charAt(0).toUpperCase() + direction.slice(1))
        this.$store.dispatch('dapps/setActiveItemIndex', this.itemIndex + num)
        document.getElementById('close').scrollIntoView()
      }
    },
    mounted () {
      document.body.classList.add('--has-popup')
      this.$store.dispatch('dapp/showPopup')
      this.getData()
    },
    watch: {
      '$route': 'getData'
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
    overflow: auto;
    z-index: 120;
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
