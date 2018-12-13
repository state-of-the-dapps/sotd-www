<template>
  <div 
    :class="errors && errors.length > 0 ? '--has-errors' : ''" 
    class="item">
    <input 
      :class="email.length > 0 ? '--is-filled' : ''" 
      :value="email" 
      class="text-input" 
      type="text" 
      maxlength="50" 
      @input="updateAndValidate($event.target.value)">
    <label class="label">Email <span class="required">(required)</span></label>
    <span class="remaining-characters">{{ 50 - email.length }}</span>
    <ul 
      v-if="errors && errors.length > 0" 
      class="error-list">
      <li 
        v-for="(error, index) in errors" 
        :key="index" 
        class="error-item">{{ error }}</li>
    </ul>
    <p class="help">Email of the primary contact (this will not be made public)</p>
  </div>
</template>

<script>
import { isValidEmail } from '~/helpers/validators'

export default {
  props: {
    email: {
      type: String,
      required: true
    },
    errors: {
      type: Array,
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
      this.$emit('updateField', 'email', value)
      clearTimeout(this.validationTimer)
      const errors = {
        field: 'email',
        data: []
      }
      this.validationTimer = setTimeout(() => {
        isValidEmail(this.email)
          ? ''
          : errors.data.push(`Please enter a valid email address`)
        this.$emit('updateErrors', errors)
      }, 750)
    }
  }
}
</script>
