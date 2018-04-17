<template>
<div class="component-DappFeedback">
  <div class="wrapper">
    <h3 class="title-3">Would you recommend this DApp?</h3>
    <ul v-if="!hasSubmitted" class="list">
      <li v-for="(option, index) in options" :key="index" class="item"><span class="submit" @click="trackDappFeedback(option.value)">{{ option.value | capitalize }}</span></li>
    </ul>
    <p v-else>Thanks for your feedback! It helps us improve the ÐApp registry.</p>
  </div>
</div>
</template>

<script>
import { trackDappFeedback } from '~/helpers/mixpanel'

export default {
  data () {
    return {
      options: [
        {
          value: 'yes',
          image: 'SvgFeedbackPositive'
        },
        {
          value: 'maybe',
          image: 'SvgFeedbackNeutral'
        },
        {
          value: 'no',
          image: 'SvgFeedbackNegative'
        }
      ],
      hasSubmitted: false
    }
  },
  methods: {
    trackDappFeedback (wouldRecommend) {
      const action = trackDappFeedback(this.dapp.slug, wouldRecommend)
      this.$mixpanel.track(action.name, action.data)
      this.hasSubmitted = true
    }
  },
  props: ['dapp']
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.wrapper {
  @include margin-wrapper-main;
  padding: 20px 0;
  text-align: center;
}

.list {
  display: flex;
  align-items: center;
  justify-content: center;
}

.submit {
  display: block;
}

.title-3 {
  margin: 0;
}
</style>
