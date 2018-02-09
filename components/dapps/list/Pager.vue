<template>
  <section class="section">
    <div class="container">
      <p v-if="itemCount < totalCount && !isLoading" class="button-wrapper">
        <button class="button" @click="loadMore">
          Load the <span v-if="totalCount - itemCount > 1"> <span v-if="totalCount - itemCount > itemQueryLimit">next {{ itemQueryLimit }}</span><span v-else>last {{ totalCount - itemCount }}</span> ÐApps</span><span v-else>last ÐApp</span>
        </button>
      </p>
      <p v-if="itemCount >= totalCount && !isLoading" class="message">No {{ itemCount > 0 ? 'more' : '' }} ÐApps here. You can always <nuxt-link @click.native="$mixpanel.track('DApps - New DApp')" :to="{ name: 'dapps-new' }" class="link">submit one!</nuxt-link></p>
      <p v-if="isLoading" class="loader-wrapper"><button v-if="isLoading" class="loader"></button></p>
    </div>
  </section>
</template>

<script>
  export default {
    computed: {
      itemCount () {
        return this.$store.getters['dapps/list/itemCount']
      },
      itemQueryLimit () {
        return this.$store.getters['dapps/list/itemQueryLimit']
      },
      offset () {
        return this.$store.getters['dapps/list/pagerOffset']
      },
      totalCount () {
        return this.$store.getters['dapps/list/pagerTotalCount']
      },
      isLoading () {
        return this.$store.getters['dapps/list/isLoading']
      }
    },
    methods: {
      loadMore () {
        this.$store.dispatch('dapps/list/incrementOffsetQuery')
        this.$store.dispatch('dapps/list/fetchItems')
        this.$mixpanel.track('DApps - Load more')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .button {
    padding: 12px 25px;
    color: $color--gallery;
    background: $color--mine-shaft;
    box-shadow: 0 17px 70px rgba($color--mine-shaft,.2);
    cursor: pointer;
    position: relative;
    &:active {
      top: 1px;
    }
  }

  .button-wrapper {
    text-align: center;
    height: 65px;
    margin: .5rem auto 10rem;
  }

  .link {
    text-decoration: none;
  }

  .loader-wrapper {
    height: 65px;
    margin: .5rem auto 10rem;
  }

  .message {
    margin: 8rem 0;
    padding-bottom: 20px;
    text-align: center;
    font-size: 2rem;
    color: lighten($color--mine-shaft,55%);
  }
</style>
