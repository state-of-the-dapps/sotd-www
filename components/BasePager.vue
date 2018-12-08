<template>
  <div class="component-base-pager">
    <div class="first-wrapper">
      <button
        :class="currentPage !== 1 ? '' : 'hidden'"
        class="button"
        @click="$emit('selectPage', currentPage - 1)">
        <span class="button-inner">
          <SvgIconChevron
            :width="13"
            :height="13"
            direction="left"/>
        </span>
      </button>
    </div>
    <div class="next-prev-wrapper">
      <button 
        :class="currentPage > 2 ? '' : 'hidden'"
        class="button number first"
        @click="$emit('selectPage', 1)">
        <span class="button-inner">1</span>
      </button>
      <button
        :class="currentPage !== 1 ? '' : 'hidden'"
        class="button number"
        @click="$emit('selectPage', currentPage - 1)">
        <span class="button-inner">{{ currentPage - 1 }}</span>
      </button>
      <button
        class="button number selected">
        <span class="button-inner">{{ currentPage }}</span>
      </button>
      <button
        :class="currentPage < totalPages ? '' : 'hidden'"
        class="button number"
        @click="$emit('selectPage', currentPage + 1)">
        <span class="button-inner">{{ currentPage + 1 }}</span>
      </button>
      <button
        :class="currentPage < totalPages - 1 ? '' : 'hidden'"
        class="button number last"
        @click="$emit('selectPage', totalPages)">
        <span class="button-inner">{{ totalPages }}</span>
      </button>
    </div>
    <div class="last-wrapper">
      <button
        :class="currentPage < totalPages ? '' : 'hidden'"
        class="button"
        @click="$emit('selectPage', currentPage + 1)">
        <span class="button-inner"><SvgIconChevron
          :width="12"
          :height="12"
          direction="right"/></span>
      </button>
    </div>
  </div>
</template>

<script>
import SvgIconChevron from './SvgIconChevron'

export default {
  components: {
    SvgIconChevron
  },
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
  text-align: left;
  margin-right: 15px;
}

.last-wrapper {
  text-align: right;
  margin-left: 15px;
}

.next-prev-wrapper {
  flex: 1;
  justify-content: center;
  text-align: center;
}

.button {
  background: $color--white;
  border-radius: 3px;
  box-shadow: 0 5px 10px rgba($color--black, 0.075);
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
    &.selected {
      background: $color--black;
      border-color: $color--black;
      color: $color--gray;
    }
    &.first,
    &.last {
      position: relative;
      :after {
        content: '';
        position: absolute;
        bottom: calc(50% - 1px);
        width: 3px;
        height: 3px;
        background: rgba($color--black, 0.5);
      }
    }
    &.first {
      margin-right: 15px;
      :after {
        right: -12px;
      }
    }
    &.last {
      margin-left: 15px;
      :after {
        left: -12px;
      }
    }
  }
  &.number {
    margin-left: 3px;
    margin-right: 3px;
    margin-bottom: 5px;
    @include tweakpoint('min-width', 1100px) {
      margin-bottom: 0;
    }
  }
  &.hidden {
    visibility: hidden;
  }
}

.button-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
}
</style>
