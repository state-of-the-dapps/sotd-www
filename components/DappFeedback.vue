<template>
  <div class="component-DappFeedback">
    <div class="wrapper">
      <h3 class="title-3">Would you recommend this ÐApp to a friend?</h3>
      <ul 
        v-if="!hasSubmitted" 
        class="list">
        <li 
          v-for="(option, index) in options" 
          :key="index" 
          class="item"><span 
            class="submit" 
            @click="trackDappFeedback(option)"><component 
              :is="svgFeedbackComponent(option)" 
              :width="25" 
              :height="25"/></span></li>
      </ul>
      <transition name="fade">
        <p 
          v-if="hasSubmitted" 
          class="confirmation">Thanks for your feedback!</p>
      </transition>
    </div>
  </div>
</template>

<script>
import { feedbackComponentMap } from '~/helpers/constants'
import { mapGetters } from 'vuex'
import { trackDappFeedback } from '~/helpers/mixpanel'
import SvgFeedbackNegative from './SvgFeedbackNegative'
import SvgFeedbackNeutral from './SvgFeedbackNeutral'
import SvgFeedbackPositive from './SvgFeedbackPositive'

export default {
  components: {
    SvgFeedbackNegative,
    SvgFeedbackNeutral,
    SvgFeedbackPositive
  },
  data() {
    return {
      options: ['positive', 'neutral', 'negative'],
      hasSubmitted: false
    }
  },
  computed: {
    ...mapGetters('dapps/detail', {
      dapp: 'item'
    })
  },
  methods: {
    svgFeedbackComponent(option) {
      const feedbackComponent = feedbackComponentMap[option]
      return feedbackComponent
    },
    trackDappFeedback(feedback) {
      const action = trackDappFeedback(this.dapp.slug, feedback)
      this.$mixpanel.track(action.name, action.data)
      this.hasSubmitted = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappFeedback {
  margin-bottom: 20px;
  @include tweakpoint('min-width', 1100px) {
    margin-bottom: 0;
  }
}

.confirmation {
  transition: all 0.5s ease;
  line-height: 25px;
  height: 25px;
  margin: 10px 0;
  @include tweakpoint('min-width', 1100px) {
    margin: 0;
  }
}

.list {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  margin: 10px 0;
  @include tweakpoint('min-width', 1100px) {
    margin: 0;
  }
}

.submit {
  display: flex;
  padding: 0 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @include tweakpoint('min-width', 1250px) {
    padding: 0;
    padding-left: 10px;
  }
}

.title-3 {
  font-weight: 300;
  font-size: 1rem;
  margin: 0;
  @include tweakpoint('min-width', 1100px) {
    margin-right: 5px;
  }
}

.wrapper {
  @include margin-wrapper-main;
  padding: 20px 0;
  text-align: center;
  @include tweakpoint('min-width', 1100px) {
    display: flex;
    align-items: center;
  }
  @include tweakpoint('min-width', 1250px) {
    margin-right: 0;
  }
}
</style>
