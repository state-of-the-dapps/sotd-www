<template>
  <section class="section">
    <div class="container">
      <p 
        v-if="itemCount < totalCount && !isLoading" 
        class="button-wrapper">
        <button 
          class="button" 
          @click="loadMore">
          Load the <span v-if="totalCount - itemCount > 1"> <span v-if="totalCount - itemCount > itemQueryLimit">next {{ itemQueryLimit }}</span><span v-else>last {{ totalCount - itemCount }}</span> ÐApps</span><span v-else>last ÐApp</span>
        </button>
      </p>
      <p 
        v-if="itemCount >= totalCount && !isLoading" 
        class="message">No {{ itemCount > 0 ? 'more' : '' }} ÐApps here. You can always <nuxt-link 
          :to="{ name: 'dapps-new' }" 
          class="link" 
          @click.native="$mixpanel.track('DApps - New DApp')">submit one</nuxt-link>!</p>
      <p 
        v-if="isLoading" 
        class="loader-wrapper"><button 
          v-if="isLoading" 
          class="loader"/></p>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    itemCount() {
      return this.$store.getters['dapps/search/itemCount']
    },
    itemQueryLimit() {
      return this.$store.getters['dapps/search/itemQueryLimit']
    },
    offset() {
      return this.$store.getters['dapps/search/pagerOffset']
    },
    totalCount() {
      return this.$store.getters['dapps/search/pagerTotalCount']
    },
    isLoading() {
      return this.$store.getters['dapps/search/isLoading']
    }
  },
  methods: {
    loadMore() {
      this.$store.dispatch('dapps/search/incrementOffsetQuery')
      this.$store.dispatch('dapps/search/fetchItems')
      this.$mixpanel.track('DApps - Load more', { offset: this.offset })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.button {
  border-radius: 4px;
  padding: 12px 25px;
  color: $color--gray;
  background: $color--black;
  box-shadow: 0 17px 70px rgba($color--black, 0.2);
  cursor: pointer;
  position: relative;
  &:active {
    top: 1px;
  }
}

.button-wrapper {
  text-align: center;
  height: 65px;
  margin: 0.5rem auto 10rem;
}

.link {
  text-decoration: none;
  border-bottom: 1px solid $color--black;
}

.loader-wrapper {
  height: 65px;
  margin: 0.5rem auto 10rem;
}

.message {
  margin: 8rem 0;
  padding-bottom: 20px;
  text-align: center;
  font-size: 2rem;
  color: lighten($color--black, 30%);
}
</style>
