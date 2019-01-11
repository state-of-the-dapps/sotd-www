<template>
  <div class="component-ranking-table-name">
    <div class="icon-wrapper">
      <nuxt-link 
        :to="localePath({ name: 'dapp-detail', params: { slug }})" 
        :class="!iconSmallUrl ? 'has-no-icon' : ''" 
        class="icon-link" 
        @click.native="trackDappView(slug)">
        <img
          v-if="iconSmallUrl" 
          :src="iconSmallUrl"
          class="icon-image">
        <span
          v-else
          class="icon-placeholder">{{ name | firstLetter }}</span>
      </nuxt-link>
    </div>
    <div class="name-teaser-wrapper">
      <media
        v-if="selectedColumn.selection !== 'rank'"
        :query="{maxWidth: 1098}">
        <p class="rank">#{{ rank }}<template v-if="rankDelta !== 0">&nbsp;
          <BaseDelta
            :value="rankDelta"
            :null-text="$t('new')"/>
        </template>
        </p>
      </media>
      <h4 class="name">
        <nuxt-link 
          :to="localePath({ name: 'dapp-detail', params: { slug } })" 
          @click.native="trackDappView(slug)">{{ name }}</nuxt-link>
      </h4>
      <media :query="{maxWidth: 599}">
        <p class="teaser">{{ teaser | truncate(50) }}</p>
      </media>
      <media :query="{minWidth: 600}">
        <p class="teaser">{{ teaser }}</p>
      </media>
    </div>
  </div>
</template>

<script>
import Media from 'vue-media'
import { trackDappView } from '~/helpers/mixpanel'
import BaseDelta from './BaseDelta'

export default {
  components: {
    BaseDelta,
    Media
  },
  props: {
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
    rank: {
      type: Number,
      required: true,
      default: null
    },
    rankDelta: {
      type: [Number, null],
      default: null
    },
    selectedColumn: {
      type: Object,
      required: true
      // TODO default value
    },
    slug: {
      type: String,
      required: true,
      default: ''
    },
    teaser: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      sourcePath: this.$route.path
    }
  },
  methods: {
    trackDappView(targetDapp) {
      const sourceCollection = ''
      const sourceComponent = 'RankingTable'
      const action = trackDappView(
        sourceCollection,
        sourceComponent,
        this.sourcePath,
        targetDapp
      )
      this.$mixpanel.track(action.name, action.data)
    }
  }
}
</script>

<style lang="scss" scoped>
.component-ranking-table-name {
  padding: 13px 0;
  display: flex;
  align-items: center;
  text-align: left;
  margin-right: 20px;
  justify-content: left;
  @include tweakpoint('max-width', 1098px) {
    padding: 10px 0 10px 15px;
  }
}

.icon-image {
  display: block;
}

.icon-link {
  text-decoration: none;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 4px;
  @include tweakpoint('max-width', 599px) {
    width: 30px;
    height: 30px;
  }
}

.icon-image {
  border-radius: 4px;
  display: block;
  width: 42px;
  height: 42px;
  @include tweakpoint('max-width', 599px) {
    width: 30px;
    height: 30px;
  }
}

.icon-placeholder {
  background: $color--gray;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 1.2rem;
  border-radius: 4px;
}

.icon-wrapper {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  @include tweakpoint('max-width', 599px) {
    width: 30px;
    height: 30px;
  }
}

.name {
  margin: 0;
  margin-bottom: 0.25rem;
  font-size: 1.2rem;
  @include tweakpoint('max-width', 599px) {
    margin-bottom: 0;
    font-size: 1.1rem;
  }
}

.rank {
  margin: 0;
  margin-bottom: 2px;
  padding: 1px 3px;
  border-radius: 3px;
  background: $color--gray;
  font-size: 0.9rem;
  font-weight: 700;
  display: inline-block;
}

.teaser {
  margin: 0;
  color: lighten($color--black, 15%);
  font-size: 1.05rem;
}
</style>
