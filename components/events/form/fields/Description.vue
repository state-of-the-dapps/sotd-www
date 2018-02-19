<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <textarea class="text-area" maxlength="1000" style="min-height: 200px" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"  :class="description.length > 0 ? '--is-filled' : ''" type="text" v-model="description" @input="validate"></textarea>
    <label class="label">Full description <span class="required">(required)</span></label>
    <span class="remaining-characters">{{ 1000 - description.length }}</span>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="(error, index) in errors" :key="index" class="error-item">{{ error }}</li>
    </ul>
    <p class="help">The full description of your event</p>
  </div>
</template>

<script>
  import { dispatchErrors } from '~/helpers/mixins'

  var validationTimer

  export default {
    computed: {
      description: {
        get () {
          return this.$store.getters['events/form/description']
        },
        set (value) {
          const field = {
            name: 'description',
            value: value
          }
          this.$store.dispatch('events/form/setField', field)
        }
      },
      errors () {
        return this.$store.getters['events/form/descriptionErrors']
      }
    },
    methods: {
      validate () {
        clearTimeout(validationTimer)
        const errors = {
          field: 'description',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.description.length > 1000 ? errors.data.push(`Description can't be longer than 1000 characters`) : ''
          this.description.length < 50 ? errors.data.push(`Description must be longer than 50 characters`) : ''
          this.dispatchErrors(errors, 'events')
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
