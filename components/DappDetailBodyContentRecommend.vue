<template>
<div class="component-DappDetailBodyContentRecommend" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
  <div class="wrapper">
    <p class="description" itemprop="ratingCount" :content="votes">Would you recommend this ÐApp to a friend?</p>
    <div class="reaction-wrapper" itemprop="ratingValue" :content="rating">
      <ul class="reaction-list" v-if="!hasSubmitted">
        <li class="reaction-item" :class="currentReaction == 'positive' ? 'is-active' : ''" @click="submitDappFeedback('positive')">
          <SvgReactionPositive/><span class="reaction-value">{{ positive || 0 }}</span>
        </li>
        <li class="reaction-item" :class="currentReaction == 'neutral' ? 'is-active' : ''" @click="submitDappFeedback('neutral')">
          <SvgReactionNeutral/><span class="reaction-value">{{ neutral || 0 }}</span>
        </li>
        <li class="reaction-item" :class="currentReaction == 'negative' ? 'is-active' : ''" @click="submitDappFeedback('negative')">
          <SvgReactionNegative/><span class="reaction-value">{{ negative || 0 }}</span>
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
    rating: {
      required: true
    },
    slug: {
      required: true
    },
    votes: {
      required: true
    },
    positive: {
      required: true
    },
    neutral: {
      required: true
    },
    negative: {
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
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.description {
  margin-bottom: 5px;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    text-align: left;
  }
}

.reaction-item {
  margin-top: 3px;
  padding: 5px;
  cursor: pointer;
  transition: all .2s ease;
  display: flex;
  align-items: center;
  border: 1px solid rgba($color--black, .2);
  border-radius: 4px;
  margin-right: 4px;
  &:hover {
    border-color: $color--black;
  }
}

.reaction-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @include tweakpoint('min-width', 1000px) {
    justify-content: flex-start;
  }
}

.reaction-value {
  display: inline-block;
  margin-left: 4px;
  font-size: 0.9rem;
  font-weight: 700;
}

.reaction-wrapper {
  overflow: hidden;
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
