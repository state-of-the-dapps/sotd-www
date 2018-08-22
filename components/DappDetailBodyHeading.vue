<template>
  <div class="component-DappDetailBodyHeading">
    <ul class="heading-items" :class="'-' + status">
      <li class="heading-item" v-if="!direct"><span class="back" @click="$router.go(-1)"><SvgIconChevron :fill="'-' + status" :width="10" :height="10"/></span></li>
      <li class="heading-item">
        <h1 class="heading-title">
          <img v-if="iconUrl" class="dapp-icon" :src="iconUrl" width="30" height="30">{{ name }}
        </h1>
      </li>
      <li class="heading-item"><span class="heading-tagline">{{ teaser }}</span></li>
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
    direct: {
      default: false
    },
    iconUrl: {
      required: true
    },
    name: {
      required: true
    },
    status: {
      required: true
    },
    teaser: {
      required: true
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

.dapp-icon {
  border-radius: 2px;
  padding: 2px;
  margin-right: 8px;
  background: $color--white;
  box-shadow: 0 5px 15px rgba($color--black, 0.2);
}

.heading-item {
  @include tweakpoint('min-width', 750px) {
    margin-right: 10px;
  }  
}

.heading-items {
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

.heading-title {
  @include title-1;
  font-size: 3.2rem;
  margin: 0;
  text-transform: initial;
}
</style>

