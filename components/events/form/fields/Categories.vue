<template>
  <div>
    <p class="heading">What this event will contain (select up to 4)</p>
    <ul class="list">
      <li v-for="(item, index) in items" :key="index" @click="toggle(item)" :class="categories.includes(item) ? 'item --' + item + ' --is-selected' : 'item --' + item">{{ item | formatEventCategory | capitalize }}</li>
    </ul>
  </div>
</template>

<script>
  import { eventCategories as categoryList } from '~/helpers/constants'

  export default {
    computed: {
      categories () {
        return this.$store.getters['events/form/categories']
      }
    },
    data: () => {
      return {
        items: categoryList
      }
    },
    methods: {
      toggle (category) {
        this.$store.dispatch('events/form/toggleCategory', category)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .heading {
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: .5rem;
  }

  .item {
    width: calc(50% - 10px);
    margin: 5px;
    background: lighten($color--gallery, 100%);
    padding: 10px;
    box-shadow: 0 0 20px rgba($color--mine-shaft,.05);
    border: 1px solid transparent;
    transition: all .2s ease;
    user-select: none;
    font-size: .95rem;
    &:hover {
      cursor: pointer;
      border: 1px solid $color--mine-shaft;
    }
    &.--is-selected {
      &.--ico {
        background: $color--event-crimson;
      }
      &.--hackathon {
        background: $color--event-orange;
      }
      &.--summit {
        background: $color--event-yellow;
      }
      &.--crowdsale {
        background: $color--event-green;
      }
      &.--conference {
        background: $color--event-aquamarine;
      }
      &.--meetup {
        background: $color--event-blue;
      }
      &.--release {
        background: $color--event-burple;
      }
      &.--workshop {
        background: $color--event-purple;
      }
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    margin: 0 -5px 10px;
  }
</style>
