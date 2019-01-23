<template>
  <div 
    class="DappDetailBodyContentRecommend" 
    itemprop="aggregateRating" 
    itemscope 
    itemtype="http://schema.org/AggregateRating">
    <div class="wrapper">
      <p 
        :content="votes" 
        class="description" 
        itemprop="ratingCount">{{ $t(namespace('title')) }}</p>
      <div 
        :content="rating" 
        class="reaction-wrapper" 
        itemprop="ratingValue">
        <ul 
          v-if="!reaction" 
          class="reaction-list">
          <li 
            :class="reaction == 'positive' ? 'is-active' : ''" 
            class="reaction-item" 
            @click="submitReaction('positive')">
            <IconReactionPositive/><span class="reaction-value">{{ positive || 0 }}</span>
          </li>
          <li 
            :class="reaction == 'neutral' ? 'is-active' : ''" 
            class="reaction-item" 
            @click="submitReaction('neutral')">
            <IconReactionNeutral/><span class="reaction-value">{{ neutral || 0 }}</span>
          </li>
          <li 
            :class="reaction == 'negative' ? 'is-active' : ''" 
            class="reaction-item" 
            @click="submitReaction('negative')">
            <IconReactionNegative/><span class="reaction-value">{{ negative || 0 }}</span>
          </li>
        </ul>
        <div
          v-else-if="!hasSubmitted"
          class="confirmation">
          <textarea
            v-model="comments"
            :placeholder="$t(namespace('commentsPlaceholder'))"
            class="textarea"/>
          <button
            class="button"
            @click="submitDappFeedback">{{ $t(namespace('submit')) }}</button>
        </div>
        <div
          v-else 
          class="confirmation">
          <p><strong>{{ $t(namespace('thanks'), {name: name}) }}</strong></p>
          <p class="reaction-summary">
            <IconReactionPositive
              v-if="reaction === 'positive'"
              :width="30"
              :height="30"/>
            <IconReactionNeutral
              v-if="reaction === 'neutral'"
              :width="30"
              :height="30"/>
            <IconReactionNegative
              v-if="reaction === 'negative'"
              :width="30"
              :height="30"/>
          </p>
          <p v-if="comments"><strong>{{ $t(namespace('comments')) }}:</strong> {{ comments }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { trackDappFeedback } from '~/helpers/mixpanel'
import IconReactionNegative from './IconReactionNegative'
import IconReactionNeutral from './IconReactionNeutral'
import IconReactionPositive from './IconReactionPositive'

export default {
  components: {
    IconReactionNegative,
    IconReactionNeutral,
    IconReactionPositive
  },
  props: {
    rating: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      required: true,
      default: ''
    },
    slug: {
      type: String,
      required: true,
      default: ''
    },
    votes: {
      type: Number,
      default: null
    },
    positive: {
      type: Number,
      default: null
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
      comments: '',
      reaction: '',
      hasSubmitted: false
    }
  },
  methods: {
    submitReaction(feedback) {
      this.reaction = feedback
      const action = trackDappFeedback(
        this.slug,
        this.reaction,
        this.comments,
        true
      )
      this.$mixpanel.track(action.name, action.data)
    },
    submitDappFeedback() {
      const action = trackDappFeedback(
        this.slug,
        this.reaction,
        this.comments,
        false
      )
      this.$mixpanel.track(action.name, action.data)
      this.hasSubmitted = true
    }
  }
}
</script>


<style lang="scss" scoped>
.button {
  @include button;
  width: 100%;
}

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

.reaction-summary {
  text-align: center;
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

.textarea {
  padding: 5px;
  width: 100%;
  border: 1px solid $color--black;
}

.wrapper {
  margin: 0 10px 24px 10px;
  padding-bottom: 24px;
  border-bottom: 1px solid darken($color--gray, 6%);
}
</style>
