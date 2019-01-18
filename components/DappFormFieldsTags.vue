<template>
  <div id="tags">
    <p class="heading"><span class="checkmark"><IconCheckmark :fill="selected.length > 0 ? 'purple' : 'gray'"/></span>Tags <span class="required">(at least 1 required)</span></p>
    <div class="input-wrapper">
      <input 
        :value="query" 
        :placeholder="selected.length < 5 ? 'Add a tag' : 'Only 5 tags max'" 
        :disabled="selected.length < 5 ? false : true" 
        type="text" 
        class="input" 
        autocomplete="off" 
        maxlength="20" 
        @input="search($event.target.value)" 
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
import IconCheckmark from './IconCheckmark'

export default {
  components: {
    IconCheckmark
  },
  directives: {
    onClickaway: onClickaway
  },
  props: {
    name: {
      type: String,
      required: true,
      default: ''
    },
    query: {
      type: String,
      required: true,
      default: ''
    },
    results: {
      type: Array,
      required: true,
      default: () => []
    },
    selected: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      searchTimer: '',
      sourcePath: this.$route.path,
      trackTimer: ''
    }
  },
  computed: {
    hasObviousTags() {
      return this.obviousTags.some(value => {
        return this.selected.map(item => item.toLowerCase()).indexOf(value) >= 0
      })
    },
    obviousTags() {
      return [
        'blockchain',
        'decentralised',
        'decentralized',
        'ethereum',
        this.name
      ].map(item => item.toLowerCase())
    }
  },
  methods: {
    add() {
      if (
        this.query.length > 1 &&
        this.selected.length < 5 &&
        this.selected.indexOf(this.query) === -1
      ) {
        this.$emit('addTag', this.query)
        this.$emit('resetTagResults')
        this.$mixpanel.track('DApp Form - Add tag', {
          tag: this.query,
          path: this.sourcePath
        })
      }
    },
    hasWarning(tag) {
      return this.obviousTags.indexOf(tag.toLowerCase()) >= 0
    },
    findSuggestedTags() {
      if (this.query.length === 0 && this.selected.length === 0) {
        this.$emit('fetchTags')
      }
    },
    remove(tag, key) {
      this.$emit('removeTag', key)
      this.$mixpanel.track('DApp Form - Remove tag', {
        tag: tag,
        path: this.sourcePath
      })
    },
    resetResults() {
      this.$emit('resetTagResults')
    },
    search(value) {
      this.$emit('updateTagQuery', value)
      clearTimeout(this.searchTimer)
      clearTimeout(this.trackTimer)
      this.searchTimer = setTimeout(() => {
        if (this.selected.length < 6) {
          this.$emit('fetchTags', this.query)
        }
      }, 100)
      this.trackTimer = setTimeout(() => {
        this.$mixpanel.track('DApp Form - Search tags', {
          query: this.query,
          path: this.sourcePath
        })
      }, 5000)
    },
    select(item, key) {
      if (typeof item !== 'undefined') {
        this.$emit('selectTag', key)
        this.$emit('resetTagResults')
        this.$mixpanel.track('DApp Form - Select tag', {
          tag: item,
          path: this.sourcePath
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
  margin-top: 1.6rem !important;
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
  display: inline-block;
}

.warning-list {
  &.-tags {
    margin-bottom: 10px;
    padding: 10px;
  }
}
</style>
