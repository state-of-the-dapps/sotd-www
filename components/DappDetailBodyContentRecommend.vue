<template>
<div class="component-DappDetailBodyContentRecommend">
  <div class="wrapper">
    <p class="description">Would you recommend this ÐApp to a friend?</p>
    <ul class="reaction-list">
      <li class="reaction-item" :class="currentReaction == 'positive' ? 'is-active' : ''" @click="trackDappFeedback('positive')">
        <SvgReactionPositive/>
      </li>
      <li class="reaction-item" :class="currentReaction == 'neutral' ? 'is-active' : ''" @click="trackDappFeedback('neutral')">
        <SvgReactionNeutral/>
      </li>
      <li class="reaction-item" :class="currentReaction == 'negative' ? 'is-active' : ''" @click="trackDappFeedback('negative')">
        <SvgReactionNegative/>
      </li>
    </ul>
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
      currentReaction: ''
    }
  },
  components: {
    SvgReactionNegative,
    SvgReactionNeutral,
    SvgReactionPositive
  },
  methods: {
    trackDappFeedback (feedback) {
      const action = trackDappFeedback(this.slug, feedback)
      this.$mixpanel.track(action.name, action.data)
      this.currentReaction = feedback
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

.description {
  margin-bottom: 5px;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.reaction-item {
  padding: 3px;
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

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
