<template>
  <section class="section -search">
    <div class="wrapper-outer">
      <div class="wrapper">
        <a 
          class="search-icon" 
          href="#" 
          @click.prevent="$mixpanel.track('DApps - Search icon')"><img 
            class="search-image" 
            src="~/assets/images/icons/search.png" 
            width="20"></a>
        <ul class="input-wrapper">
          <li 
            v-for="(tag, key) in tags" 
            :key="key" 
            class="tag">{{ tag }} <span 
              class="remove" 
              @click="removeTag(tag, key)"><img 
                src="~/assets/images/close/small.png"
                alt="Close" 
                class="close"></span></li>
          <li class="input-text"><input 
            ref="search" 
            v-model="textQuery" 
            :placeholder="$t(namespace('placeholder'))" 
            class="input" 
            autocomplete="off" 
            @input="search" 
            @keyup.enter="blurTextInput" 
            @click="fetchSuggestedTagsWithNoQuery" 
            @keydown.delete="removeLastTag"></li>
        </ul>
        <DappsSearchSuggestedTags
          :text-query="textQuery"
          :tags="suggestedTags"
          @resetSuggestedTags="resetSuggestedTags"
          @resetTextQuery="resetTextQuery"/>
      </div>
    </div>
  </section>
</template>

<script>
import { dappRefineTabOptions } from '~/helpers/constants'
import { getCaretPosition } from '~/helpers/mixins'
import DappsSearchSuggestedTags from '~/components/DappsSearchSuggestedTags'

var searchTimer
var trackTimer

export default {
  components: {
    DappsSearchSuggestedTags
  },
  mixins: [getCaretPosition],
  data() {
    return {
      suggestedTags: [],
      textQuery: ''
    }
  },
  computed: {
    tags() {
      return this.$route.query.tags ? this.$route.query.tags.split(',') : []
    }
  },
  mounted() {
    this.textQuery = this.$route.query.text || ''
  },
  methods: {
    blurTextInput() {
      this.$refs.search.blur()
    },
    fetchSuggestedTags(tagsQuery) {
      this.$axios
        .get('tags', {
          params: {
            text: tagsQuery.value,
            excluded: this.$route.query.tags || undefined,
            type: 'dapps'
          }
        })
        .then(response => {
          const data = response.data
          const items = data.items
          this.suggestedTags = items
        })
    },
    fetchSuggestedTagsWithNoQuery() {
      if (!this.textQuery && this.tags.length === 0) {
        let tagsQuery = { value: '' }
        this.fetchSuggestedTags(tagsQuery)
      }
    },
    removeTagQuery() {
      let routeName = 'dapps'
      if (this.$route.params.platform) {
        routeName += '-platform'
      }
      if (this.$route.params.category) {
        routeName += '-category'
      }
      let tags = this.$route.query.tags || ''
      tags = tags.split(',').filter(Boolean)
      tags.pop()
      tags = tags.join(',')
      this.$router.push(
        this.localePath({
          name: routeName,
          params: { ...this.$route.params },
          query: {
            ...this.$route.query,
            tags: tags || undefined,
            text: undefined,
            page: 1
          }
        })
      )
    },
    removeLastTag() {
      if (!this.textQuery && this.tags.length > 0) {
        this.removeTagQuery()
        this.$mixpanel.track('DApps - Remove tag', { method: 'delete' })
      }
    },
    removeTag(tag, key) {
      this.focusTextInput()
      this.removeTagQuery()
      this.$mixpanel.track('DApps - Remove tag', { method: 'click' })
      this.fetchSuggestedTagsWithNoQuery()
    },
    resetSuggestedTags() {
      this.suggestedTags = []
    },
    resetTextQuery() {
      this.textQuery = ''
      this.focusTextInput()
    },
    search(event) {
      clearTimeout(searchTimer)
      clearTimeout(trackTimer)
      var caret = this.getCaretPosition(this.textQuery)
      var result = /\S+$/.exec(this.textQuery.slice(0, caret.end))
      var lastWord = result ? result[0] : null
      searchTimer = setTimeout(() => {
        if (this.tags.length < 3 && this.textQuery.length > 1) {
          let tagsQuery = { value: lastWord }
          this.fetchSuggestedTags(tagsQuery)
        }
        if (this.textQuery.length === 0) {
          this.fetchSuggestedTagsWithNoQuery()
        }
        let routeName = 'dapps'
        if (this.$route.params.platform) {
          routeName += '-platform'
        }
        if (this.$route.params.category) {
          routeName += '-category'
        }
        this.$router.push(
          this.localePath({
            name: routeName,
            params: { ...this.$route.params },
            query: {
              ...this.$route.query,
              page: 1,
              text: this.textQuery || undefined
            }
          })
        )
      }, 200)
      trackTimer = setTimeout(() => {
        this.$mixpanel.track('DApps - Search', { query: this.textQuery })
      }, 10000)
    },
    focusTextInput() {
      this.$refs.search.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.sub-heading {
  text-transform: uppercase;
  font-weight: normal;
  letter-spacing: 2px;
  font-size: 1rem;
  margin-bottom: 0;
}

.heading {
  text-transform: uppercase;
  font-weight: normal;
  letter-spacing: 2px;
  margin-top: 0;
  margin-bottom: 1.3rem;
}

.remove {
  display: inline-block;
  padding-left: 8px;
}

.close {
  max-width: unset;
  width: 9px;
  height: 9px;
  position: relative;
  top: 1px;
  &:hover {
    cursor: pointer;
  }
}

.wrapper-outer {
  @include margin-wrapper-main;
  position: relative;
  @include tweakpoint('min-width', $tweakpoint--default) {
    padding-top: 25px;
    padding-bottom: 10px;
  }
}

.search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 40px;
  background: $color--black;
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
  &:hover {
    cursor: default;
  }
  @include tweakpoint('min-width', $tweakpoint--default) {
    width: 55px;
    height: 60px;
  }
}

.search-image {
  margin: 0 10px;
}

.input {
  height: 100%;
  padding: 0px;
  font-size: 1.1rem;
  background: none;
  border: none;
  width: 100%;
  padding-right: 5px;
}

.input-text {
  display: flex;
  flex-grow: 1;
  height: 100%;
  padding: 0px;
  font-size: 1.1rem;
  background: none;
  border: none;
  width: 100%;
  .tag + & {
    padding-left: 5px;
  }
}

.input-wrapper {
  display: flex;
  align-items: center;
  flex-grow: 1;
  height: 100%;
  padding: 10px;
  font-size: 1.1rem;
  background: none;
  border: none;
  @include tweakpoint('min-width', $tweakpoint--default) {
    padding-left: 15px;
    padding-right: 15px;
  }
}

.tag {
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 7px 10px;
  background: darken($color--gray, 6%);
  box-shadow: 0 0 20px rgba($color--black, 0.1);
  text-decoration: none;
  position: relative;
  margin: 2px;
  margin-right: 5px;
  line-height: 0.75;
  white-space: nowrap;
  @include tweakpoint('min-width', $tweakpoint--default) {
    line-height: 1.52;
  }
}

.wrapper {
  border-radius: 4px;
  position: relative;
  z-index: 5;
  box-shadow: 0 17px 70px 0 rgba($color--black, 0.22);
  background: lighten($color--gray, 2%);
  height: 50px;
  display: flex;
  align-items: center;
  @include tweakpoint('min-width', $tweakpoint--default) {
    height: 60px;
  }
}
</style>
