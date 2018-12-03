<template>
  <div 
    :class="'-dapp-' + index + ' ' + loaded" 
    class="component-HomeHeroContentIconsItem" 
    @click="trackHomeHeroDappIcon(index)">
    <img 
      :src="imageSrc" 
      class="card-icon" >
    <div :class="'card-info -' + status">
      <span class="status">{{ status }}</span>
    </div>
  </div>  
</template>

<script>
import { trackHomeHeroDappIcon } from '~/helpers/mixpanel'
import { mapGetters } from 'vuex'
import SvgBadgeMetamask from './SvgBadgeMetamask'

export default {
  components: {
    SvgBadgeMetamask
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loaded: '',
      imageSrc: ''
    }
  },
  computed: {
    ...mapGetters(['heroHasLoaded'])
  },
  destroyed() {
    this.$store.dispatch('setHeroLoaded')
  },
  mounted() {
    this.loaded = !this.heroHasLoaded ? 'is-waiting' : 'is-active'
    this.loadImage(this.index)
  },
  methods: {
    loadImage(index) {
      var img = new Image()
      img.src = require('~/assets/images/dapp-icons/' + index + '.jpg')
      img.onload = () => {
        this.loaded = 'is-active'
      }
      this.imageSrc = img.src
    },
    trackHomeHeroDappIcon(targetIndex) {
      const action = trackHomeHeroDappIcon(targetIndex)
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.card-icon {
  position: relative;
  display: block;
  width: 200px;
  margin-top: -20px;
  margin-bottom: -20px;
  z-index: 1;
}

.card-info {
  position: relative;
  z-index: 2;
  background: $color--dapp-live;
  height: 40px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  &.-beta {
    background: $color--dapp-beta;
  }
  &.-concept {
    background: $color--dapp-concept;
  }
  &.-live {
    background: $color--dapp-live;
  }
  &.-wip {
    background: $color--dapp-wip;
  }
}

.status {
  flex-grow: 1;
}
</style>
