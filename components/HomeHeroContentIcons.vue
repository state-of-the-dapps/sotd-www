<template>
  <div class="component-HomeHeroContentIcons">
    <div v-for="(status, index) in cards" :key="index" :class="'card -dapp-' + index">
      <img class="card-icon" :src="require('~/assets/images/dapp-icons/' + index + '.jpg')" />
      <div :class="'card-info -' + status">
        <span class="status">{{ status }}</span>
        <IconBadgeMetamask/>
      </div>
    </div>
  </div>
</template>

<script>
import IconBadgeMetamask from '~/components/IconBadgeMetamask'

export default {
  data () {
    return {
      cards: [
        'live',
        'concept',
        'live',
        'beta',
        'live',
        'live',
        'live'
      ]
    }
  },
  components: {
    IconBadgeMetamask
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.component-HomeHeroContentIcons {
  position: relative;
  top: 0;
  left: 30px;
  height: 300px;
}

.card {
  position: absolute;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 7px 7px 40px rgba($color--black, .3);
  transform-origin: bottom left;
  z-index: 5;
  color: $color--purple;
  &.-dapp-0 {
    transform: scale(.55);
    bottom: 83px;
    left: 0;
    z-index: 1;
  }
  &.-dapp-1 {
    transform: scale(.4);
    bottom: 153px;
    left: 77px;
    z-index: 2;
  }
  &.-dapp-2 {
    transform: scale(.4);
    bottom: 43px;
    left: 125px;
    z-index: 4;
  }
  &.-dapp-3 {
    transform: scale(.55);
    bottom: 136px;
    left: 157px;
    z-index: 3;
  }
  &.-dapp-4 {
    transform: scale(.29);
    bottom: 56px;
    left: 216px;
    z-index: 3;
  }
  &.-dapp-5 {
    transform: scale(.46);
    bottom: 99px;
    left: 255px;
    z-index: 3;
  }
  &.-dapp-6 {
    transform: scale(.35);
    bottom: 5px;
    left: 295px;
    z-index: 3;
  }
}

.card-icon {
  display: block;
  width: 200px;
}

.card-info {
  background: $color--dapp-live;
  height: 40px;
  text-transform: uppercase;
  font-weight: 700;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  &.-beta{
    background: $color--dapp-beta;    
  }
  &.-concept {
    background: $color--dapp-concept;    
  }  
  &.-live {
    background: $color--dapp-live;    
  }
}

.status {
  flex-grow: 1;
}
</style>

