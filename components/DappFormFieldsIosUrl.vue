<template>
  <div
    id="iosUrl"
    :class="errors && errors.length > 0 ? '--has-errors' : ''"
    class="DappFormFieldsIosUrl item">
    <p class="heading"><span class="checkmark"><IconCheckmark :fill="url.length >= 3 && !errors.length ? 'purple' : 'gray'"/></span>App Store (iOS) URL</p>
    <input
      id="iosUrlField"
      :class="url.length > 0 ? '--is-filled' : ''"
      :value="url"
      class="text-input"
      type="text"
      placeholder="e.g. https://apps.apple.com/us/app/mydapp/id12345678"
      maxlength="255"
      @input="updateAndValidate($event.target.value)">
    <span
      v-if="url.length"
      class="remaining-characters">{{ 255 - url.length }}</span>
    <ul
      v-if="errors && errors.length > 0"
      class="error-list">
      <li
        v-for="(error, index) in errors"
        :key="index"
        class="error-item">{{ error }}</li>
    </ul>
    <p class="help">A URL that will launch Apple App Store for this DApp</p>
  </div>
</template>

<script>
import IconCheckmark from './IconCheckmark'

export default {
  components: {
    IconCheckmark
  },
  props: {
    errors: {
      type: Array,
      required: true,
      default: () => []
    },
    url: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      validationTimer: ''
    }
  },
  methods: {
    updateAndValidate(value) {
      this.$emit('updateSiteUrl', 'ios', value)
      clearTimeout(this.validationTimer)
      const errors = {
        field: 'iosUrl',
        data: []
      }
      this.validationTimer = setTimeout(() => {
        this.url.length > 0 && this.url.length < 3
          ? errors.data.push(`App Store URL must be longer than 2 characters`)
          : ''
        this.$emit('updateErrors', errors)
      }, 750)
    }
  }
}
</script>

<style lang="scss" scoped>
.text-input {
  @include highlight;
}
</style>
