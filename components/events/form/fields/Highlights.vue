<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <textarea class="text-area" maxlength="500" style="min-height: 200px" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"  :class="highlights.length > 0 ? '--is-filled' : ''" type="text" v-model="highlights" @input="validate"></textarea>
    <label class="label">Highlights</label>
    <span class="remaining-characters">{{ 500 - highlights.length }}</span>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="(error, index) in errors" :key="index" class="error-item">{{ error }}</li>
    </ul>
    <p class="help">(e.g. Keynote by Vitalik Buterin, or Free Pizza). Put each highlight on a new line.</p>
  </div>
</template>

<script>
  import { dispatchErrors } from '~/helpers/mixins'

  var validationTimer

  export default {
    computed: {
      highlights: {
        get () {
          const values = this.$store.getters['events/form/highlights'].slice()
          return values.join('\n')
        },
        set (value) {
          const values = value.split('\n')
          const field = {
            name: 'highlights',
            value: values
          }
          this.$store.dispatch('events/form/setField', field)
        }
      },
      errors () {
        return this.$store.getters['events/form/highlightsErrors']
      }
    },
    methods: {
      validate () {
        clearTimeout(validationTimer)
        const errors = {
          field: 'highlights',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.highlights.length > 500 ? errors.data.push(`Highlights can't be longer than 500 characters`) : ''
          this.highlights.length > 0 && this.highlights.length < 10 ? errors.data.push(`Highlights must be longer than 10 characters`) : ''
          this.dispatchErrors(errors, 'events')
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
