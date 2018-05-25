<template>
  <div class="component-DappDetailBodyHeading">
    <ul class="items -live">
      <li class="item" v-if="!direct"><span class="back" @click="$router.go(-1)"><SvgIconChevron fill="-live" :width="10" :height="10"/></span></li>
      <li class="item"><h1 class="title-1">{{ dapp.name }}</h1></li>
      <li class="item"><span class="tagline">{{ dapp.teaser }}</span></li>
    </ul>
  </div>
</template>

<script>
import SvgIconChevron from './SvgIconChevron'

export default {
  components: {
    SvgIconChevron
  },
  props: {
    dapp: {
      required: true
    },
    direct: {
      default: false
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.back {
  display: block;
  transform: rotate(90deg);
  background: $color--purple;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50%;
  margin: 0 auto;
  cursor: pointer;
  position: relative;
  &:active {
    top: 1px;
  }
}

.item {
  @include tweakpoint('min-width', 750px) {
    margin-right: 10px;
  }  
}

.items {
  color: $color--purple;
  padding: 15px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    display: flex;
    align-items: center;
    text-align: left;
    padding: 10px 12px;
  }
  @include dapp-background-colors;
}

.title-1 {
  font-size: 3.2rem;
  margin: 0;
  text-transform: initial;
}
</style>

