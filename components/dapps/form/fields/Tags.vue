<template>
  <div>
    <p class="heading">Tags <span class="required">(at least 1 required)</span></p>
    <div class="input-wrapper">
      <input 
        v-model="query" 
        :placeholder="selected.length < 5 ? 'Add a tag' : 'Only 5 tags max'" 
        :disabled="selected.length < 5 ? false : true" 
        type="text" 
        class="input" 
        autocomplete="off" 
        maxlength="20" 
        @input="search" 
        @keyup.enter="add" 
        @click="findSuggestedTags">
      <span 
        v-if="selected.length < 5" 
        :class="query.length > 1 && selected.indexOf(query) === -1 ? '--is-ready' : ''" 
        class="add" 
        @click="add"><span v-if="selected.length < 5">Add</span><span v-else>Max</span></span>
      <transition name="fade">
        <div 
          v-on-clickaway="resetResults" 
          v-if="results.length > 0 && selected.length < 5" 
          class="dropdown">
          <ul class="dropdown-list">
            <li 
              v-for="(result, key) in results" 
              :key="key" 
              class="dropdown-item" 
              @click="select(result, key)">{{ result }}</li>
          </ul>
        </div>
      </transition>
    </div>
    <ul 
      v-if="hasObviousTags" 
      class="warning-list -tags">
      <li>Tags with orange outlines are a little redundant, and might not be very helpful to people searching for your ÐApp</li>
    </ul>
    <ul class="list">
      <li 
        v-for="(tag, key) in selected" 
        :key="key" 
        :class="hasWarning(tag) ? '--has-warning' : ''" 
        class="item -tag">#{{ tag }} <span 
          class="remove" 
          @click="remove(tag, key)"><img 
            src="~/assets/images/close/small.png" 
            width="9" 
            alt="Close"></span></li>
    </ul>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'

var searchTimer
var trackTimer

export default {
  directives: {
    onClickaway: onClickaway
  },
  computed: {
    hasObviousTags() {
      return this.obviousTags.some(value => {
        return this.selected.map(item => item.toLowerCase()).indexOf(value) >= 0
      })
    },
    name() {
      return this.$store.getters['dapps/form/name']
    },
    obviousTags() {
      return [
        'blockchain',
        'decentralised',
        'decentralized',
        'ethereum',
        this.name
      ].map(item => item.toLowerCase())
    },
    query: {
      get() {
        return this.$store.getters['dapps/form/tagQuery']
      },
      set(value) {
        this.$store.dispatch('dapps/form/setTagQuery', value)
      }
    },
    results() {
      return this.$store.getters['dapps/form/tagsResults']
    },
    selected() {
      return this.$store.getters['dapps/form/selectedTags']
    }
  },
  methods: {
    add() {
      if (
        this.query.length > 1 &&
        this.selected.length < 5 &&
        this.selected.indexOf(this.query) === -1
      ) {
        this.$store.dispatch('dapps/form/addTag', this.query)
        this.$store.dispatch('dapps/form/resetTagResults')
        this.$mixpanel.track('New DApp - Add tag', { tag: this.query })
      }
    },
    hasWarning(tag) {
      return this.obviousTags.indexOf(tag.toLowerCase()) >= 0
    },
    findSuggestedTags() {
      if (this.query.length === 0 && this.selected.length === 0) {
        this.$store.dispatch('dapps/form/fetchTags')
      }
    },
    remove(tag, key) {
      this.$store.dispatch('dapps/form/removeTag', key)
      this.$mixpanel.track('New DApp - Remove tag', { tag: tag })
    },
    resetResults() {
      this.$store.dispatch('dapps/form/resetTagResults')
    },
    search() {
      clearTimeout(searchTimer)
      clearTimeout(trackTimer)
      searchTimer = setTimeout(() => {
        if (this.selected.length < 6) {
          this.$store.dispatch('dapps/form/fetchTags', this.query)
        }
      }, 100)
      trackTimer = setTimeout(() => {
        this.$mixpanel.track('New DApp - Search tags', { query: this.query })
      }, 5000)
    },
    select(item, key) {
      this.$store.dispatch('dapps/form/selectTag', key)
      this.$store.dispatch('dapps/form/resetTagResults')
      this.$mixpanel.track('New DApp - Select tag', { tag: item })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.add {
  background: $color--black;
  color: $color--gray;
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  padding: 3px 5px;
  opacity: 0.4;
  line-height: 1.2;
  transition: all 0.2s ease;
  &:hover {
    cursor: pointer;
  }
  &.--is-ready {
    opacity: 1;
  }
}

.dropdown {
  position: absolute;
  background: rgba($color--gray, 0.9);
  padding: 10px;
  box-shadow: 0 17px 70px rgba($color--black, 0.2);
  width: 320px;
  top: 37px;
  left: 0;
  overflow: hidden;
  z-index: 10;
  @include tweakpoint('min-width', $tweakpoint--default) {
    width: 350px;
  }
}

.dropdown-item {
  display: block;
  padding: 7px 28px 7px 10px;
  background: lighten($color--gray, 2%);
  box-shadow: 0 0 20px rgba($color--black, 0.1);
  text-decoration: none;
  position: relative;
  margin: 2px;
  &:hover {
    cursor: pointer;
  }
  &:after {
    content: '';
    position: absolute;
    right: 10px;
    bottom: 9px;
    background: url('~assets/images/close/small.png') center center no-repeat;
    background-size: 9px 9px;
    width: 9px;
    height: 9px;
    transform: rotate(45deg);
  }
}

.dropdown-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.heading {
  margin-top: 1.45rem !important;
  margin-bottom: 1rem !important;
}

.input {
  border: none;
  background: none;
  width: 100%;
  &::placeholder {
    color: $color--black;
  }
  &:focus::placeholder {
    color: rgba($color--black, 0.5);
  }
}

.input-wrapper {
  background: rgba(lighten($color--gray, 100%), 0.9);
  display: flex;
  width: 100%;
  padding: 10px;
  box-shadow: 0 0 20px rgba($color--black, 0.05);
  margin-bottom: 10px;
  position: relative;
}

.item {
  display: flex;
  align-items: center;
  margin: 5px;
  background: rgba(lighten($color--gray, 100%), 0.3);
  padding: 10px;
  box-shadow: 0 0 20px rgba($color--black, 0.05);
  border: 1px solid transparent;
  position: relative;
  &.--has-warning {
    border-color: $color--warning;
  }
}

.list {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin: -5px -5px 10px -5px;
}

.remove {
  cursor: pointer;
  margin-left: 8px;
  position: relative;
  top: 1px;
}

.warning-list {
  &.-tags {
    margin-bottom: 10px;
    padding: 10px;
  }
}
</style>
