<template>
  <div 
    :class="errors && errors.length > 0 ? '--has-errors' : ''" 
    class="item">
    <p class="heading">Software License <span class="boost">+5% {{ $t('profileStrength') }}</span></p>
    <input 
      :class="license.length > 0 ? '--is-filled' : ''" 
      :value="license" 
      class="text-input"
      placeholder="e.g. MIT" 
      type="text" 
      maxlength="50" 
      @input="updateAndValidate($event.target.value)">
    <span
      v-if="license.length"
      class="remaining-characters">{{ 50 - license.length }}</span>
    <ul 
      v-if="errors && errors.length > 0" 
      class="error-list">
      <li 
        v-for="(error, index) in errors" 
        :key="index" 
        class="error-item">{{ error }}</li>
    </ul>
    <p class="help">(e.g. MIT, GPL, Proprietary)</p>
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
    license: {
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
      this.$emit('updateField', 'license', value)
      clearTimeout(this.validationTimer)
      const errors = {
        field: 'license',
        data: []
      }
      this.validationTimer = setTimeout(() => {
        this.license.length > 50
          ? errors.data.push(`License can't be longer than 50 characters`)
          : ''
        this.$emit('updateErrors', errors)
      }, 750)
    }
  }
}
</script>
