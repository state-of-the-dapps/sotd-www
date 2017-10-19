<template>
  <div>
    <p v-if="itemsCount < paginationTotalCount" class="button-wrapper">
      <button v-if="!loading" class="button" @click="loadMore">
        Load the <span v-if="paginationTotalCount - itemsCount > 1"> <span v-if="paginationTotalCount - itemsCount > limitQuery">next {{ limitQuery }}</span><span v-else>last {{ paginationTotalCount - itemsCount }}</span> ÐApps</span><span v-else>last ÐApp</span>
      </button>
      <button v-else class="spinner"></button>
    </p>
    <p v-else class="message">No {{ itemsCount > 0 ? 'more' : '' }} ÐApps here. You can always <nuxt-link @click.native="$mixpanel.track('DApps - New DApp')" to="/submit" class="link">submit one!</nuxt-link></p>
  </div>
</template>

<script>
  export default {
    computed: {
      itemsCount () {
        return this.$store.getters['dapps/itemsCount']
      },
      limitQuery () {
        return this.$store.getters['dapps/limitQuery']
      },
      paginationOffset () {
        return this.$store.getters['dapps/paginationOffset']
      },
      paginationTotalCount () {
        return this.$store.getters['dapps/paginationTotalCount']
      },
      loading () {
        return this.$store.getters['dapps/loading']
      }
    },
    methods: {
      loadMore () {
        this.$store.dispatch('dapps/incrementOffsetQuery')
        this.$store.dispatch('dapps/findItems')
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
    margin: .5rem auto 10rem;
  }

  .link {
    text-decoration: none;
  }

  .message {
    margin: 8rem 0;
    padding-bottom: 20px;
    text-align: center;
    font-size: 2rem;
    color: lighten($color--mine-shaft,55%);
  }
</style>
