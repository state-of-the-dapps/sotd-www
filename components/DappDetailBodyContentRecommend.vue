<template>
  <div 
    class="component-DappDetailBodyContentRecommend" 
    itemprop="aggregateRating" 
    itemscope 
    itemtype="http://schema.org/AggregateRating">
    <div class="wrapper">
      <p 
        :content="votes" 
        class="description" 
        itemprop="ratingCount">Would you recommend this ÐApp to a friend?</p>
      <div 
        :content="rating" 
        class="reaction-wrapper" 
        itemprop="ratingValue">
        <ul 
          v-if="!hasSubmitted" 
          class="reaction-list">
          <li 
            :class="currentReaction == 'positive' ? 'is-active' : ''" 
            class="reaction-item" 
            @click="submitDappFeedback('positive')">
            <SvgReactionPositive/><span class="reaction-value">{{ positive || 0 }}</span>
          </li>
          <li 
            :class="currentReaction == 'neutral' ? 'is-active' : ''" 
            class="reaction-item" 
            @click="submitDappFeedback('neutral')">
            <SvgReactionNeutral/><span class="reaction-value">{{ neutral || 0 }}</span>
          </li>
          <li 
            :class="currentReaction == 'negative' ? 'is-active' : ''" 
            class="reaction-item" 
            @click="submitDappFeedback('negative')">
            <SvgReactionNegative/><span class="reaction-value">{{ negative || 0 }}</span>
          </li>
        </ul>
        <p 
          v-else 
          class="confirmation">Thanks for your feedback!</p>
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
  components: {
    SvgReactionNegative,
    SvgReactionNeutral,
    SvgReactionPositive
  },
  props: {
    rating: {
      type: Number,
      default: null
    },
    slug: {
      type: String,
      required: true
    },
    votes: {
      type: Number,
      default: null
    },
    positive: {
      type: Number,
      required: true
    },
    neutral: {
      type: Number,
      default: null
    },
    negative: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      currentReaction: '',
      hasSubmitted: false
    }
  },
  methods: {
    submitDappFeedback(feedback) {
      const action = trackDappFeedback(this.slug, feedback)
      this.$mixpanel.track(action.name, action.data)
      this.hasSubmitted = true
      this.currentReaction = feedback
      setTimeout(() => {
        this.hasSubmitted = false
      }, 3000)
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
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  border: 1px solid rgba($color--black, 0.2);
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
