<template>
  <div 
    :class="errors && errors.length > 0 ? '--has-errors' : ''" 
    class="item">
    <p class="heading"><span class="checkmark"><IconCheckmark :fill="teaser.length >= 4 && !errors.length ? 'purple' : 'gray'"/></span>Tagline <span class="required">(required)</span></p>
    <input 
      :class="teaser.length > 0 ? '--is-filled' : ''" 
      :value="teaser" 
      class="text-input" 
      placeholder="e.g. Trade digital cats"
      maxlength="50" 
      type="text" 
      @input="updateAndValidate($event.target.value)">
    <span
      v-if="teaser.length"
      class="remaining-characters">{{ 50 - teaser.length }}</span>
    <ul 
      v-if="warnings && warnings.length > 0" 
      class="warning-list">
      <li 
        v-for="(warning, index) in warnings" 
        :key="index" 
        class="warning-item">{{ warning }}</li>
    </ul>
    <ul 
      v-if="errors && errors.length > 0" 
      class="error-list">
      <li 
        v-for="(error, index) in errors" 
        :key="index" 
        class="error-item">{{ error }}</li>
    </ul>
    <p class="help">A 5-7 word description of your ÐApp. Please don't include self-promotion or obvious words such as "blockchain", "decentralized", or "Ethereum"</p>
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
    teaser: {
      type: String,
      required: true,
      default: ''
    },
    warnings: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      validationTimer: ''
    }
  },
  methods: {
    updateAndValidate(value) {
      this.$emit('updateField', 'teaser', value)
      clearTimeout(this.validationTimer)
      const errors = {
        field: 'teaser',
        data: []
      }
      const warnings = {
        field: 'teaser',
        data: []
      }
      const warningWords = [
        { value: 'blockchain' },
        { value: 'decentralised', isHidden: true },
        { value: 'decentralized' },
        { value: 'ethereum' }
      ]
      this.validationTimer = setTimeout(() => {
        this.teaser.length > 50
          ? errors.data.push(`Tagline can't be longer than 50 characters`)
          : ''
        this.teaser.length < 4
          ? errors.data.push(`Tagline must be longer than 3 characters`)
          : ''
        var hasWarningWords = warningWords.some(word => {
          return this.teaser.toLowerCase().indexOf(word.value) !== -1
        })
        if (hasWarningWords === true) {
          let filteredWarningWords = warningWords.filter(word => {
            return word.isHidden !== true
          })
          let rowLength = filteredWarningWords.length
          let warningWordString = filteredWarningWords
            .map((word, i) => {
              let string = '"' + word.value + '"'
              if (rowLength === i + 1) {
                string = 'or "' + word.value + '"'
              }
              return string
            })
            .join(', ')
          warnings.data.push(
            `Please don't use obvious words such as ` + warningWordString
          )
        }
        this.$emit('updateErrors', errors)
        this.$emit('updateWarnings', warnings)
      }, 750)
    }
  }
}
</script>
