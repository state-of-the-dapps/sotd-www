<template>
    <div class="component-dapp-list-filter">
      <button
        class="button"
        @click="open">{{ selected || allText }} &nbsp;
          <SvgIconChevron
            :width="12"
            :height="12"/></button>
      <transition name="fade">
        <div
          v-if="dropdown"
          v-on-clickaway="close"
          class="dropdown">
          <h4 class="dropdown-title">{{ title }}</h4>
          <ul class="option-list">
            <li
              class="option-item"
              role="button"
              @click="$emit('select', '')"
              >{{ allText }}</li>
            <li
              v-for="(option, index) in options"
              :key="index"
              class="option-item"
              role="button"
              @click="select(option.selection)">
              {{ option.text }}
            </li>
          </ul>
        </div>
      </transition>
    </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'
import SvgIconChevron from './SvgIconChevron'

export default {
  components: {
    SvgIconChevron
  },
  props: {
    allText: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    selected: {
      type: String
    },
    title: {
      type: String,
      requied: true
    }
  },
  data () {
    return {
      dropdown: false
    }
  },
  methods: {
    open () {
      this.dropdown = true
    },
    close () {
      this.dropdown = false
    },
    select (selection) {
      this.close()
      this.$emit('select', selection)
    }
  },
  directives: {
    onClickaway: onClickaway
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-dapp-list-filter {
  position: relative;
  margin: 0 5px;
}

.button {
  font-size: 1.2rem;
  padding: 8px 20px;
  border-radius: 4px;
  border: 1px solid $color--black;
  display: flex;
  align-items: center;
}

.dropdown {
  position: absolute;
  top: 0;
  left: 0;
  background: $color--gray;
  width: 100%;
  z-index: 10;
  box-shadow: 0 0 20px rgba($color--black, .1);
  border-radius: 4px;
}

.dropdown-title {
  text-align: center;
}
</style>
