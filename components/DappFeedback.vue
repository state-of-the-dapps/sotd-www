<template>
<div class="component-DappFeedback">
  <div class="wrapper">
    <h3 class="title-3">Would you recommend this DApp?</h3>
    <ul v-if="!hasSubmitted" class="list">
      <li v-for="(option, index) in options" :key="index" class="item"><span class="submit" @click="trackDappFeedback(option)"><component :is="svgFeedbackComponent(option)" :width="25" :height="25"></component></span></li>
    </ul>
    <p v-else class="confirmation">Thanks for your feedback!</p>
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
  computed: {
    ...mapGetters('dapps/detail', {
      dapp: 'item'
    })
  },
  data () {
    return {
      options: [
        'positive',
        'neutral',
        'negative'
      ],
      hasSubmitted: false
    }
  },
  methods: {
    svgFeedbackComponent (option) {
      const feedbackComponent = feedbackComponentMap[option]
      return feedbackComponent
    },
    trackDappFeedback (feedback) {
      const action = trackDappFeedback(this.dapp.slug, feedback)
      this.$mixpanel.track(action.name, action.data)
      this.hasSubmitted = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.confirmation {
  transition: all .5s ease;
  line-height: 25px;
  height: 25px;
  margin: 10px 0;
}

.list {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  margin: 10px 0;
}

.submit {
  display: flex;
  padding: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.title-3 {
  margin: 0;
}

.wrapper {
  @include margin-wrapper-main;
  padding: 20px 0;
  text-align: center;
}
</style>
