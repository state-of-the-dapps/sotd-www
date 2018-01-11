<template>
  <div>
    <p class="heading">Related ÐApps</p>
    <div class="input-wrapper">
      <input v-model="query" :placeholder="selected.length < 5 ? 'Search for a ÐApp' : 'Only 5 ÐApps max'" type="text" class="input" @input="search" autocomplete="off" maxlength="50" :disabled="selected.length < 5 ? false : true">
      <transition name="fade">
        <div class="dropdown" v-if="results.length > 0 && selected.length < 10" v-on-clickaway="resetResults">
           <ul class="dropdown-list">
              <li v-for="(item, index) in results" :key="index" class="dropdown-item" @click="select(item.slug, index)">{{ item.name }}</li>
           </ul>
        </div>
      </transition>
    </div>
    <ul class="list">
      <li v-for="(item, index) in selected" :key="index" class="item -dapp">{{ item.name }} <span @click="remove(item.slug, index)" class="remove"><img src="~/assets/images/close/small.png" width="9" alt="Close"></span></li>
    </ul>
  </div>
</template>

<script>
  import { directive as onClickaway } from 'vue-clickaway'

  var searchTimer
  var trackTimer

  export default {
    computed: {
      query: {
        get () {
          return this.$store.getters['events/form/relatedDappQuery']
        },
        set (value) {
          this.$store.dispatch('events/form/setRelatedDappQuery', value)
        }
      },
      results () {
        return this.$store.getters['events/form/relatedDappsResults']
      },
      selected () {
        return this.$store.getters['events/form/selectedRelatedDapps']
      }
    },
    directives: {
      onClickaway: onClickaway
    },
    methods: {
      findSuggestedRelatedDapps () {
        if (this.query.length === 0 && this.selected.length === 0) {
          this.$store.dispatch('events/form/fetchRelatedDapps')
        }
      },
      remove (tag, key) {
        this.$store.dispatch('events/form/removeRelatedDapp', key)
        this.$mixpanel.track('New event - Remove related DApp', { tag: tag })
      },
      resetResults () {
        this.$store.dispatch('events/form/resetRelatedDappsResults')
      },
      search () {
        clearTimeout(searchTimer)
        clearTimeout(trackTimer)
        searchTimer = setTimeout(() => {
          if (this.selected.length < 5) {
            this.$store.dispatch('events/form/fetchRelatedDapps', this.query)
          }
        }, 250)
        trackTimer = setTimeout(() => {
          this.$mixpanel.track('New event - Search related DApps', { query: this.query })
        }, 2000)
      },
      select (slug, key) {
        this.$store.dispatch('events/form/selectRelatedDapp', key)
        this.$store.dispatch('events/form/resetRelatedDappsResults')
        this.$mixpanel.track('New event - Select related DApp', { slug: slug })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

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
</style>
