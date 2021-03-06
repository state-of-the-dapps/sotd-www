<template>
  <transition name="fade">
    <div
      v-on-clickaway="reset"
      v-if="tags.length"
      class="DappsSearchSuggestedTags -suggested-tags">
      <ul class="list">
        <li
          v-for="(tag, key) in tags"
          :key="key"
          class="item"
          @click="select(tag, key)">{{ tag }}</li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'
import { getCaretPosition } from '~/helpers/mixins'

export default {
  directives: {
    onClickaway: onClickaway
  },
  mixins: [getCaretPosition],
  props: {
    tags: {
      type: Array,
      default: () => []
    },
    textQuery: {
      type: String,
      default: ''
    }
  },
  methods: {
    reset() {
      this.$emit('resetSuggestedTags')
    },
    select(item, key) {
      let routeName = 'dapps'
      if (this.$route.params.platform) {
        routeName += '-platform'
      }
      if (this.$route.params.category) {
        routeName += '-category'
      }
      let tags = this.$route.query.tags || ''
      tags = tags.split(',').filter(Boolean)
      tags.push(item)
      tags = tags.join(',')
      this.$router
        .push(
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
        .catch(err => {})
      this.$emit('resetTextQuery')
      this.reset()
      this.$mixpanel.track('DApps - Select tag', { tag: item })
    }
  }
}
</script>

<style lang="scss" scoped>
.DappsSearchSuggestedTags {
  position: absolute;
  background: rgba($color--gray, 0.95);
  padding: 10px;
  box-shadow: 0 17px 70px rgba($color--black, 0.2);
  width: 250px;
  top: 100%;
  left: 40px;
  overflow: hidden;
  z-index: 10;
  @include tweakpoint('min-width', $tweakpoint--default) {
    left: 55px;
    width: 500px;
  }
}

.item {
  border-radius: 1000px;
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

.list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
