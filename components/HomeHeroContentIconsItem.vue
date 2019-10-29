<template>
  <div
    :class="'-dapp-' + index + ' ' + loaded"
    class="HomeHeroContentIconsItem"
    @click="trackHomeHeroDappIcon(index)">
    <img
      :src="imageSrc"
      class="card-icon" >
  </div>
</template>

<script>
import { trackHomeHeroDappIcon } from '~/helpers/mixpanel'
import { mapGetters } from 'vuex'

export default {
  props: {
    index: {
      type: Number,
      required: true,
      default: null
    },
    status: {
      type: String,
      required: true,
      default: ''
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
.card-icon {
  max-width: unset;
  position: relative;
  display: block;
  width: 200px;
  z-index: 1;
}

.status {
  flex-grow: 1;
}
</style>
