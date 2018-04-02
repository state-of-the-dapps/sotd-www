<template>
<div :class="'card -dapp-' + index + ' ' + loaded">
  <img class="card-icon" :src="imageSrc" />
  <div :class="'card-info -' + status">
    <span class="status">{{ status }}</span>
    <SvgIconBadgeMetamask/>
  </div>
</div>  
</template>

<script>
import { mapGetters } from 'vuex'
import SvgIconBadgeMetamask from '~/components/SvgIconBadgeMetamask'

export default {
  data () {
    return {
      loaded: '',
      imageSrc: ''
    }
  },
  destroyed () {
    this.$store.dispatch('setHeroLoaded')
  },
  components: {
    SvgIconBadgeMetamask
  },
  computed: {
    ...mapGetters([
      'heroHasLoaded'
    ])
  },
  props: [
    'index',
    'status'
  ],
  methods: {
    loadImage (index) {
      var img = new Image()
      img.src = require('~/assets/images/dapp-icons/' + index + '.jpg')
      this.imageSrc = img.src
      this.loaded = 'is-active'
    }
  },
  mounted () {
    this.loaded = (!this.heroHasLoaded) ? 'is-waiting' : 'is-active'
    this.loadImage(this.index)
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
  z-index: 1
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
