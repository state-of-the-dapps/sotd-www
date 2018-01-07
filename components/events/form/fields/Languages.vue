<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <input class="text-input" :class="languages.length > 0 ? '--is-filled' : ''" type="text" maxlength="75" v-model="languages" @input="validate">
    <label class="label">Languages <span class="required">(required)</span></label>
    <span class="remaining-characters">{{ 75 - languages.length }}</span>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="(error, index) in errors" :key="index" class="error-item">{{ error }}</li>
    </ul>
    <p class="help">Languages spoken at this event (separate multiple languages with commas)</p>
  </div>
</template>

<script>
  import { dispatchErrors } from '~/helpers/mixins'

  var validationTimer

  export default {
    computed: {
      errors () {
        return this.$store.getters['events/form/languagesErrors']
      },
      languages: {
        get () {
          const values = this.$store.getters['events/form/languages'].slice()
          return values.join(',')
        },
        set (value) {
          const values = value.split(',')
          const field = {
            name: 'languages',
            value: values
          }
          this.$store.dispatch('events/form/setField', field)
        }
      }
    },
    methods: {
      validate () {
        clearTimeout(validationTimer)
        const errors = {
          field: 'languages',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.languages.length > 75 ? errors.data.push(`languages can't be longer than 75 characters`) : ''
          this.languages.length < 2 ? errors.data.push(`languages must be longer than 2 characters`) : ''
          this.dispatchErrors(errors, 'events')
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
