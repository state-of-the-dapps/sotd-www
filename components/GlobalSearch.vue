<template>
  <div class="component-global-search" :class="search.length? 'is-searching' : ''">
    <span class="nav-link -search" :class="'-' + color"><SvgIconMagnifier :theme="color"/></span>
    <div class="search-input-wrapper"><input :class="'-' + color" class="search-input" placeholder="Discover awesome ÐApps…" v-model="search"></div>
  </div>
</template>

<script>
import SvgIconMagnifier from './SvgIconMagnifier'

export default {
  props: {
    color: {
      type: String
    }
  },
  components: {
    SvgIconMagnifier
  },
  mounted () {
    console.log('mounted')
  },
  computed: {
    search: {
      get () {
        return this.$store.getters['search']
      },
      set (value) {
        this.$store.dispatch('setSearch', value)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.component-global-search {
  display: flex;
  align-items: center;
  background: rgba($color--black, .1);
  padding: 8px 12px;
  border-radius: 4px;
  min-width: 250px;
  transition: all 0.2s ease;
  &.is-searching {
    min-width: 450px;
    margin: 0 auto;
  }
}

.nav-link {
  &.-search {
    width: 17px;
    height: 17px;
  }
}

.search-input-wrapper {
  flex-grow: 1;
  padding-left: 8px;
}

.search-input {
  width: 100%;
  border: none;
  background: transparent;
  color: $color--black;
  &::placeholder {
    color: $color--black;
  }
  &.-white {
    color: $color--white;
    &::placeholder {
      color: $color--white;
    }
  }
}
</style>
