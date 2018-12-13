<template>
  <div 
    :class="errors && errors.length > 0 ? '--has-errors' : ''" 
    class="item">
    <input 
      :class="url.length > 0 ? '--is-filled' : ''" 
      :value="url" 
      class="text-input" 
      type="text" 
      maxlength="255" 
      @input="updateAndValidate($event.target.value)">
    <label class="label">ÐApp URL<span class="required"/></label>
    <span class="remaining-characters">{{ 255 - url.length }}</span>
    <ul 
      v-if="errors && errors.length > 0" 
      class="error-list">
      <li 
        v-for="(error, index) in errors" 
        :key="index" 
        class="error-item">{{ error }}</li>
    </ul>
    <p class="help">A URL that will launch this ÐApp directly</p>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      validationTimer: ''
    }
  },
  methods: {
    updateAndValidate(value) {
      this.$emit('updateSiteUrl', 'dapp', value)
      clearTimeout(this.validationTimer)
      const errors = {
        field: 'dappUrl',
        data: []
      }
      this.validationTimer = setTimeout(() => {
        this.url.length > 0 && this.url.length < 3
          ? errors.data.push(`ÐApp URL must be longer than 2 characters`)
          : ''
        this.$emit('updateErrors', errors)
      }, 750)
    }
  }
}
</script>
