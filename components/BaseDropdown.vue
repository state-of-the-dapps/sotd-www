<template>
  <div
    :class="theme"
    class="BaseDropdown">
    <h3
      v-if="name"
      class="dropdown-title">{{ name }}</h3>
    <div class="dropdown-wrapper">
      <button
        :class="important ? 'important' : ''"
        class="button"
        @click="open">
        <img
          v-if="icon === 'globe' && theme === 'menu home'"
          src="~/assets/images/icons/globe-white.png"
          class="icon"
          width="18"
          height="18">
        <img
          v-else-if="icon === 'globe'"
          src="~/assets/images/icons/globe.png"
          class="icon"
          width="18"
          height="18">
        <span
          :class="selected ? 'is-active' : ''"
          class="selected-option">{{ $options.filters.capitalize(selected) || allText }}</span>
        <span class="arrow-wrapper"><SvgIconChevron
          :width="11"
          :height="11"
          :fill="color"/></span>
      </button>
      <transition name="fade">
        <div
          v-on-clickaway="close"
          v-if="dropdown"
          class="dropdown-content">
          <h4
            class="dropdown-content-title"
            @click="close">{{ title }}</h4>
          <ul class="option-list">
            <li
              v-if="allText"
              class="option-item"
              role="button"
              @click="select('')"
            ><strong>{{ allText }}</strong></li>
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
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'
import SvgIconChevron from './SvgIconChevron'

export default {
  components: {
    SvgIconChevron
  },
  directives: {
    onClickaway: onClickaway
  },
  props: {
    allText: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    important: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    selected: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      required: true,
      default: ''
    },
    theme: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dropdown: false
    }
  },
  computed: {
    color() {
      if (this.theme === 'menu home') {
        return 'white'
      } else {
        return 'black'
      }
    }
  },
  destroyed() {
    this.close()
  },
  methods: {
    open() {
      this.dropdown = true
    },
    close() {
      this.dropdown = false
    },
    select(selection) {
      this.close()
      this.$emit('select', selection)
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseDropdown {
  width: 100%;
  text-align: left;
  color: $color--black;
  &.inline {
    display: flex;
    align-items: center;
    .dropdown-title {
      margin: 0;
      padding-right: 8px;
    }
  }
}

.dropdown-wrapper {
  position: relative;
  min-width: 100px;
  flex: 1;
}

.selected-option {
  flex: 1;
  &.is-active {
    font-weight: 700;
    .menu & {
      font-weight: normal;
    }
  }
}

.dropdown-title {
  margin-top: 0;
  margin-bottom: 5px;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.35px;
}

.button {
  font-size: 1.1rem;
  padding: 5px 10px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid transparent;
  display: flex;
  align-items: center;
  text-align: left;
  background: rgba($color--black, 0.1);
  &.important {
    border-color: $color--black;
    background: transparent;
  }
  .inline & {
    padding: 3px 10px;
  }
  .menu & {
    border: none;
    color: $color--black;
  }
  .menu.home & {
    color: $color--white;
  }
}

.dropdown-content {
  position: absolute;
  top: 0;
  left: 0;
  background: $color--gray;
  width: 100%;
  z-index: 10;
  box-shadow: 0 0 20px rgba($color--black, 0.1);
  border: 1px solid $color--black;
  border-radius: 4px;
  padding-bottom: 10px;
}

.dropdown-content-title {
  padding: 0 10px 10px 10px;
  margin: 8px 0 8px 0;
  border-bottom: 1px solid darken($color--gray, 10%);
}

.option-item {
  padding: 3px 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}

.icon {
  margin-right: 5px;
}
</style>
