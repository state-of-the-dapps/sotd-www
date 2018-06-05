<template>
<div class="component-DappDetailBodyContentRecommend">
  <div class="wrapper">
    <p class="description">Would you recommend this ÐApp to a friend?</p>
    <div class="reaction-wrapper">
      <ul class="reaction-list" v-if="!hasSubmitted">
        <li class="reaction-item" :class="currentReaction == 'positive' ? 'is-active' : ''" @click="submitDappFeedback('positive')">
          <SvgReactionPositive/>
        </li>
        <li class="reaction-item" :class="currentReaction == 'neutral' ? 'is-active' : ''" @click="submitDappFeedback('neutral')">
          <SvgReactionNeutral/>
        </li>
        <li class="reaction-item" :class="currentReaction == 'negative' ? 'is-active' : ''" @click="submitDappFeedback('negative')">
          <SvgReactionNegative/>
        </li>
      </ul>
      <p v-else class="confirmation">Thanks for your feedback!</p>
    </div>
  </div>
</div>
</template>

<script>
import { trackDappFeedback } from '~/helpers/mixpanel'
import SvgReactionNegative from './SvgReactionNegative'
import SvgReactionNeutral from './SvgReactionNeutral'
import SvgReactionPositive from './SvgReactionPositive'

export default {
  data () {
    return {
      currentReaction: '',
      hasSubmitted: false
    }
  },
  components: {
    SvgReactionNegative,
    SvgReactionNeutral,
    SvgReactionPositive
  },
  methods: {
    submitDappFeedback (feedback) {
      const action = trackDappFeedback(this.slug, feedback)
      this.$mixpanel.track(action.name, action.data)
      this.hasSubmitted = true
      this.currentReaction = feedback
      setTimeout(() => {
        this.hasSubmitted = false
      }, 3000)
    }
  },
  props: {
    slug: {
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.confirmation {
  margin: 0;
  margin-top: 5px;
  text-align: center;
}

.description {
  margin-bottom: 5px;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.reaction-item {
  padding: 3px 3px 0 3px;
  cursor: pointer;
  opacity: .5;
  transition: opacity .2s ease;
  &:hover, &.is-active {
    opacity: 1;
  }
}

.reaction-list {
  margin: 0 -3px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @include tweakpoint('min-width', 1000px) {
    justify-content: flex-start;
  }
}

.reaction-wrapper {
  height: 27px;
  overflow: hidden;
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
