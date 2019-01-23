<template>
  <div class="DappDetailBodyHeading">
    <ul 
      :class="'-' + category" 
      class="heading-items">
      <li 
        v-if="!direct" 
        class="heading-item"><span 
          class="back" 
          @click="$router.go(-1)"><IconChevron 
            :fill="'-' + category" 
            :width="10" 
            :height="10"/></span></li>
      <li class="heading-item">
        <h1 class="heading-title">
          <img 
            v-if="iconSmallUrl" 
            :src="iconSmallUrl" 
            class="dapp-icon" 
            width="30" 
            height="30"><span itemprop="name">{{ name }}</span>
        </h1>
      </li>
      <li class="heading-item"><span class="heading-tagline">{{ teaser }}</span></li>
    </ul>
  </div>
</template>

<script>
import IconChevron from './IconChevron'

export default {
  components: {
    IconChevron
  },
  props: {
    direct: {
      type: Boolean,
      default: false
    },
    iconSmallUrl: {
      type: String,
      required: true,
      default: ''
    },
    name: {
      type: String,
      required: true,
      default: ''
    },
    category: {
      type: String,
      required: true,
      default: ''
    },
    teaser: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>


<style lang="scss" scoped>
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
  margin-right: 11px;
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
    padding: 12px;
  }
  @include category-bg-colors;
}

.heading-tagline {
  display: inline-block;
  padding-top: 3px;
}

.heading-title {
  @include title-1;
  font-size: 2rem;
  margin: 0;
  text-transform: initial;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
