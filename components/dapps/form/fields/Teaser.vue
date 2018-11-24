<template>
  <div 
    :class="errors && errors.length > 0 ? '--has-errors' : ''" 
    class="item">
    <textarea 
      :class="teaser.length > 0 ? '--is-filled' : ''" 
      v-model="teaser" 
      class="text-area" 
      maxlength="50" 
      type="text" 
      @input="validate"/>
    <label class="label">Tagline <span class="required">(required)</span></label>
    <span class="remaining-characters">{{ 50 - teaser.length }}</span>
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
import { dispatchErrors, dispatchWarnings } from '~/helpers/mixins'

var validationTimer

export default {
  mixins: [dispatchErrors, dispatchWarnings],
  computed: {
    errors() {
      return this.$store.getters['dapps/form/teaserErrors']
    },
    teaser: {
      get() {
        return this.$store.getters['dapps/form/teaser']
      },
      set(value) {
        const field = {
          name: 'teaser',
          value: value
        }
        this.$store.dispatch('dapps/form/setField', field)
      }
    },
    warnings() {
      return this.$store.getters['dapps/form/teaserWarnings']
    }
  },
  methods: {
    validate() {
      clearTimeout(validationTimer)
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
      validationTimer = setTimeout(() => {
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
        this.dispatchErrors(errors, 'dapps')
        this.dispatchWarnings(warnings, 'dapps')
      }, 750)
    }
  }
}
</script>
