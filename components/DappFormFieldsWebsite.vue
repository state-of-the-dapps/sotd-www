<template>
  <div 
    :class="errors && errors.length > 0 ? '--has-errors' : ''" 
    class="item">
    <p class="heading">Website URL <span class="required">(required)</span></p>
    <input 
      :class="url.length > 0 ? '--is-filled' : ''" 
      :value="url" 
      class="text-input" 
      type="text"
      placeholder="e.g. https://www.websiteurl.com"
      maxlength="500" 
      @input="updateAndValidate($event.target.value)">
    <span
      v-if="url.length"
      class="remaining-characters">{{ 500 - url.length }}</span>
    <ul 
      v-if="errors && errors.length > 0" 
      class="error-list">
      <li 
        v-for="(error, index) in errors" 
        :key="index" 
        class="error-item">{{ error }}</li>
    </ul>
    <p class="help">A URL to this ÐApp's website</p>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      required: true
      // TODO default value
    },
    url: {
      type: String,
      required: true
      // TODO default value
    }
  },
  data() {
    return {
      validationTimer: ''
    }
  },
  methods: {
    updateAndValidate(value) {
      this.$emit('updateSiteUrl', 'website', value)
      clearTimeout(this.validationTimer)
      const errors = {
        field: 'websiteUrl',
        data: []
      }
      this.validationTimer = setTimeout(() => {
        this.url.length < 3
          ? errors.data.push(`Website URL must be longer than 2 characters`)
          : ''
        this.$emit('updateErrors', errors)
      }, 750)
    }
  }
}
</script>
