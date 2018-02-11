<template>
  <div>
    <p class="heading">Tags <span class="required">(at least 1 required)</span></p>
    <div class="input-wrapper">
      <input v-model="query" :placeholder="selected.length < 5 ? 'Add a tag' : 'Only 5 tags max'" type="text" class="input" @input="search" @keyup.enter="add" @click="findSuggestedTags" autocomplete="off" maxlength="20" :disabled="selected.length < 5 ? false : true">
      <span v-if="selected.length < 5" class="add" :class="query.length > 1 && selected.indexOf(query) === -1 ? '--is-ready' : ''" @click="add"><span v-if="selected.length < 5">Add</span><span v-else>Max</span></span>
      <transition name="fade">
        <div class="dropdown" v-if="results.length > 0 && selected.length < 5" v-on-clickaway="resetResults">
           <ul class="dropdown-list">
              <li v-for="(result, key) in results" :key="key" class="dropdown-item" @click="select(result, key)">{{ result }}</li>
           </ul>
        </div>
      </transition>
    </div>
    <ul v-if="hasObviousTags" class="warning-list -tags">
      <li>Tags with orange outlines are a little redundant, and might not be very helpful to people searching for your event</li>
    </ul>
    <ul class="list">
      <li v-for="(tag, key) in selected" :key="key" class="item -tag" :class="hasWarning(tag) ? '--has-warning' : ''">#{{ tag }} <span @click="remove(tag, key)" class="remove"><img src="~/assets/images/close/small.png" width="9" alt="Close"></span></li>
    </ul>
  </div>
</template>

<script>
  import { directive as onClickaway } from 'vue-clickaway'

  var searchTimer
  var trackTimer

  export default {
    computed: {
      hasObviousTags () {
        return this.obviousTags.some((value) => {
          return this.selected.map(item => item.toLowerCase()).indexOf(value) >= 0
        })
      },
      name () {
        return this.$store.getters['events/form/name']
      },
      obviousTags () {
        return [
          'blockchain',
          'decentralised',
          'decentralized',
          'ethereum',
          this.name
        ].map(item => item.toLowerCase())
      },
      query: {
        get () {
          return this.$store.getters['events/form/tagQuery']
        },
        set (value) {
          this.$store.dispatch('events/form/setTagQuery', value)
        }
      },
      results () {
        return this.$store.getters['events/form/tagsResults']
      },
      selected () {
        return this.$store.getters['events/form/selectedTags']
      }
    },
    directives: {
      onClickaway: onClickaway
    },
    methods: {
      add () {
        if (this.query.length > 1 && this.selected.length < 5 && this.selected.indexOf(this.query) === -1) {
          this.$store.dispatch('events/form/addTag', this.query)
          this.$store.dispatch('events/form/resetTagResults')
          this.$mixpanel.track('New event - Add tag', { tag: this.query })
        }
      },
      hasWarning (tag) {
        return this.obviousTags.indexOf(tag.toLowerCase()) >= 0
      },
      findSuggestedTags () {
        if (this.query.length === 0 && this.selected.length === 0) {
          this.$store.dispatch('events/form/fetchTags')
        }
      },
      remove (tag, key) {
        this.$store.dispatch('events/form/removeTag', key)
        this.$mixpanel.track('New event - Remove tag', { tag: tag })
      },
      resetResults () {
        this.$store.dispatch('events/form/resetTagResults')
      },
      search () {
        clearTimeout(searchTimer)
        clearTimeout(trackTimer)
        searchTimer = setTimeout(() => {
          if (this.selected.length < 6) {
            this.$store.dispatch('events/form/fetchTags', this.query)
          }
        }, 100)
        trackTimer = setTimeout(() => {
          this.$mixpanel.track('New event - Search tags', { query: this.query })
        }, 5000)
      },
      select (item, key) {
        this.$store.dispatch('events/form/selectTag', key)
        this.$store.dispatch('events/form/resetTagResults')
        this.$mixpanel.track('New event - Select tag', { tag: item })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .add {
    background: $color--mine-shaft;
    color: $color--gallery;
    display: inline-block;
    font-size: .75rem;
    font-weight: 700;
    text-transform: uppercase;
    padding: 3px 5px;
    opacity: .4;
    line-height: 1.2;
    transition: all .2s ease;
    &:hover {
      cursor: pointer;
    }
    &.--is-ready {
      opacity: 1;
    }
  }

  .dropdown {
    position: absolute;
    background: rgba($color--gallery,.9);
    padding: 10px;
    box-shadow: 0 17px 70px rgba($color--mine-shaft,.2);
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
    background: lighten($color--gallery,2%);
    box-shadow: 0 0 20px rgba($color--mine-shaft,.1);
    text-decoration: none;
    position: relative;
    margin: 2px;
    &:hover {
      cursor: pointer;
    }
    &:after {
      content: "";
      position: absolute;
      right: 10px;
      bottom: 9px;
      background: url('~/assets/images/close/small.png') center center no-repeat;
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
    text-align: center;
    margin-top: 1.25rem;
    margin-bottom: .75rem;
  }

  .input {
    border: none;
    background: none;
    width: 100%;
    font-size: .95rem;
    &::placeholder {
      color: $color--mine-shaft;
    }
    &:focus::placeholder {
      color: rgba($color--mine-shaft,.5);
    }
  }

  .input-wrapper {
    background: rgba(lighten($color--gallery, 100%),.9);
    display: flex;
    width: 100%;
    padding: 10px;
    box-shadow: 0 0 20px rgba($color--mine-shaft,.05);
    margin-bottom: 10px;
    position: relative;
  }

  .item {
    display: flex;
    align-items: center;
    margin: 5px;
    background: rgba(lighten($color--gallery,100%),.3);
    padding: 10px;
    box-shadow: 0 0 20px rgba($color--mine-shaft,.05);
    border: 1px solid transparent;
    position: relative;
    &.--has-warning {
      border-color: $color--burning-orange;
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
