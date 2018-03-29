<template>
  <div class="wrapper -component-events-detail-categoriessocial">
    <div class="wrapper-inner -component-events-detail-categoriessocial">   
      <Categories/>
      <Social/>
    </div>
  </div>
</template>

<script>
  import Categories from '~/components/events/detail/categoriesSocial/Categories.vue'
  import Social from '~/components/events/detail/categoriesSocial/Social.vue'

  export default {
    components: {
      Categories,
      Social
    },
    computed: {
      item () {
        return this.$store.getters['events/detail/item']
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .-component-events-detail-categoriessocial {
    &.wrapper {
      background: lighten($color--gray, 100%);
    }
    &.wrapper-inner {
      max-width: 2000px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 15px 20px;
      @include tweakpoint('min-width', 600px) {
        justify-content: left;
        flex-direction: row;
      }
      @include tweakpoint('min-width', $tweakpoint--default) {
        padding-left: 160px;
        padding-right: 160px;
      }
    }
  }
</style>
