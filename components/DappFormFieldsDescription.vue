<template>
  <div
    id="description"
    :class="errors && errors.length > 0 ? '--has-errors' : ''" 
    class="item">
    <p class="heading"><span class="checkmark"><IconCheckmark :fill="description.length >= 50 && !errors.length ? 'purple' : 'gray'"/></span>Full description <span class="required">(required)</span></p>
    <textarea 
      :class="description.length > 0 ? '--is-filled' : ''" 
      :value="description" 
      class="text-area" 
      maxlength="1000" 
      style="min-height: 200px" 
      placeholder="e.g. CryptoKitties allows players to purchase, collect, breed and sell various types of virtual cats. Breed your rarest cats to create the purrfect furry friend. The future is meow!"
      autocomplete="off" 
      autocorrect="off" 
      autocapitalize="off" 
      spellcheck="false" 
      type="text" 
      @input="updateAndValidate($event.target.value)"/>
    <span
      v-if="description.length"
      class="remaining-characters">{{ 1000 - description.length }}</span>
    <ul 
      v-if="errors && errors.length > 0" 
      class="error-list">
      <li 
        v-for="(error, index) in errors" 
        :key="index" 
        class="error-item">{{ error }}</li>
    </ul>
    <p class="help">The full description of your ÐApp in English.</p>
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
    description: {
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
      this.$emit('updateField', 'description', value)
      clearTimeout(this.validationTimer)
      const errors = {
        field: 'description',
        data: []
      }
      this.validationTimer = setTimeout(() => {
        this.description.length > 1000
          ? errors.data.push(`Description can't be longer than 1000 characters`)
          : ''
        this.description.length < 50
          ? errors.data.push(`Description must be longer than 50 characters`)
          : ''
        this.$emit('updateErrors', errors)
      }, 750)
    }
  }
}
</script>
