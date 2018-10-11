<template>
  <div class="component-dapp-list-filter">
    <button class="button">{{ allText }}</button>
    <div class="dropdown">
      <h4 class="dropdown-title">{{ title }}</h4>
      <span
        class="close"
        @click="close">x</span>
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
          @click="$emit('select', option.selection)">
          {{ option.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
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
  methods: {
    close () {}
  }
}
</script>
