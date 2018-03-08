<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <input class="text-input" :class="sponsors.length > 0 ? '--is-filled' : ''" type="text" maxlength="75" v-model="sponsors" @input="validate">
    <label class="label">Sponsors</label>
    <span class="remaining-characters">{{ 75 - sponsors.length }}</span>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="(error, index) in errors" :key="index" class="error-item">{{ error }}</li>
    </ul>
    <p class="help">Sponsors of this event (separate multiple sponsors with commas)</p>
  </div>
</template>

<script>
  import { dispatchErrors } from '~/helpers/mixins'

  var validationTimer

  export default {
    computed: {
      errors () {
        return this.$store.getters['events/form/sponsorsErrors']
      },
      sponsors: {
        get () {
          const values = this.$store.getters['events/form/sponsors'].slice()
          return values.join(', ')
        },
        set (value) {
          const values = value.split(', ')
          const field = {
            name: 'sponsors',
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
          field: 'sponsors',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.sponsors.length > 75 ? errors.data.push(`Sponsors can't be longer than 75 characters`) : ''
          this.sponsors.length > 0 && this.sponsors.length < 2 ? errors.data.push(`Sponsors must be longer than 2 characters`) : ''
          this.dispatchErrors(errors, 'events')
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
