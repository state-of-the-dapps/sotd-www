<template>
  <div
    :itemprop="votes && rating ? 'aggregateRating' : undefined"
    :itemtype="votes && rating ? 'http://schema.org/AggregateRating' : undefined"
    itemscope
    class="DappDetailBodyContentRecommend"
  >
    <div class="wrapper">
      <p
        :itemprop="votes ? 'ratingCount' : undefined"
        :content="votes"
        class="description"
      >{{ $t(namespace('title')) }}</p>
      <div
        :itemprop="rating ? 'ratingValue' : undefined"
        :content="rating"
        class="reaction-wrapper" >
        <ul
          v-if="!reaction"
          class="reaction-list">
          <li
            :class="reaction == 'positive' ? 'is-active' : ''"
            class="reaction-item"
            @click="submitReaction('positive')">
            <div class="icon-positive"><IconReactionPositive/></div>
            <span class="reaction-value">{{ positive || 0 }}</span>
          </li>
          <li
            :class="reaction == 'neutral' ? 'is-active' : ''"
            class="reaction-item"
            @click="submitReaction('neutral')">
            <div class="icon-neutral"><IconReactionNeutral/></div>
            <span class="reaction-value">{{ neutral || 0 }}</span>
          </li>
          <li
            :class="reaction == 'negative' ? 'is-active' : ''"
            class="reaction-item"
            @click="submitReaction('negative')">
            <div class="icon-negative"><IconReactionNegative/></div>
            <span class="reaction-value">{{ negative || 0 }}</span>
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
          <div class="reaction-summary">
            <div
              v-if="reaction === 'positive'"
              class="reaction-item">
              <div class="icon-positive">
                <IconReactionPositive
                  :width="30"
                  :height="30"/>
              </div>
            </div>
            <div
              v-if="reaction === 'neutral'"
              class="reaction-item">
              <div class="icon-neutral">
                <IconReactionNeutral
                  :width="30"
                  :height="30"/>
              </div>
            </div>
            <div
              v-if="reaction === 'negative'"
              class="reaction-item">
              <div class="icon-negative">
                <IconReactionNegative
                  :width="30"
                  :height="30"/>
              </div>
            </div>
          </div>
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
      default: 0
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
      default: 0
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
  margin-right: 4px;
  position: relative;

  > div {
    border-radius: 50%;
    padding: 6px;
    width: 32px;
    height: 32px;
  }

  .icon-positive {
    background-color: #bdebca;
  }

  .icon-neutral {
    background-color: #fff6b9;
  }

  .icon-negative {
    background-color: #ffaabf;
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

  .reaction-item {
    justify-content: center;

    > div {
      width: 42px;
      height: 42px;
    }
  }
}

.reaction-value {
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 700;
  position: absolute;
  top: 0;
  right: -3px;
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
