<template>
  <div class="component-base-pager">
    <div class="first-wrapper">
      <button 
        v-if="currentPage !== 1"
        class="button"
        @click="$emit('selectPage', 1)">First page</button>
    </div>
    <div class="next-prev-wrapper">
      <button
        v-if="currentPage !== 1"
        class="button prev-next"
        @click="$emit('selectPage', currentPage - 1)">Previous</button>
      <button
        v-if="currentPage !== 1"
        class="button number"
        @click="$emit('selectPage', currentPage - 1)">{{ currentPage - 1 }}</button>
      <button
        class="button number selected">{{ currentPage }}</button>
      <button
        v-if="currentPage < totalPages"
        class="button number"
        @click="$emit('selectPage', currentPage + 1)">{{ currentPage + 1 }}</button>
      <button
        v-if="currentPage < totalPages"
        class="button prev-next"
        @click="$emit('selectPage', currentPage + 1)">Next</button>
    </div>
    <div class="last-wrapper">
      <button
        v-if="currentPage < totalPages"
        class="button"
        @click="$emit('selectPage', totalPages)">Last page ({{ totalPages }})</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    limit: {
      type: Number,
      required: true
    },
    offset: {
      type: Number,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    currentPage() {
      return Number(this.$route.query.page) || 1
    },
    totalPages() {
      const totalPages = Math.ceil(this.totalCount / this.limit)
      return totalPages
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-base-pager {
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.first-wrapper {
  width: 125px;
  text-align: left;
}

.last-wrapper {
  width: 125px;
  text-align: right;
}

.next-prev-wrapper {
  flex: 1;
  justify-content: center;
  text-align: center;
}

.button {
  padding: 8px;
  background: $color--white;
  border-radius: 3px;
  border: 1px solid darken($color--gray, 10%);
  line-height: 1;
  text-align: center;
  transition: all 0.2s ease;
  &:hover {
    background: darken($color--white, 1%);
    border-color: $color--black;
  }
  &.is-active,
  &.is-active:hover {
    background: $color--black;
    color: $color--gray;
    border-color: $color--black;
  }
  &.number {
    width: 45px;
    &.selected {
      background: $color--black;
      border-color: $color--black;
      color: $color--gray;
    }
  }
  &.prev-next,
  &.number {
    margin-left: 3px;
    margin-right: 3px;
    margin-bottom: 5px;
    @include tweakpoint('min-width', 1100px) {
      margin-bottom: 0;
    }
  }
  &.prev-next {
    width: 75px;
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
