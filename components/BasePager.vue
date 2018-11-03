<template>
  <ul class="component-base-pager">
    <li 
      v-for="(page, index) in pages"
      :key="index"
      class="item">
      <button
        :class="page == currentPage ? 'is-active' : ''"
        class="button"
        @click="$emit('selectPage', page)">{{ page }}</button>
    </li>
  </ul>
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
  data () {
    return {
      currentPage: this.$route.query.page || 1
    }
  },
  computed: {
    pages () {
      const totalPages = Math.ceil(this.totalCount / this.limit)
      let pages = []
      for (let i = 0; i < totalPages; i++) {
        pages.push(i + 1)
      }
      return pages
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
  max-width: 1200px;
  justify-content: center;
}

.item {
  margin: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  width: 40px;
  height: 40px;
  padding: 10px;
  background: $color--white;
  border-radius: 3px;
  border: 1px solid darken($color--gray, 10%);
  line-height: 1;
  &:hover {
    background: $color--gray;
  }
  &.is-active, &.is-active:hover {
    background: $color--black;
    color: $color--gray;
    border-color: $color--black;
  }
}
</style>
