<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <input class="text-input" :class="organizer.length > 0 ? '--is-filled' : ''" type="text" maxlength="30" v-model="organizer" @input="validate">
    <label class="label">Organizer <span class="required">(required)</span></label>
    <span class="remaining-characters">{{ 30 - organizer.length }}</span>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="(error, index) in errors" :key="index" class="error-item">{{ error }}</li>
    </ul>
    <p class="help">The main person or company responsible for organizing the event</p>
  </div>
</template>

<script>
  import { dispatchErrors } from '~/helpers/mixins'

  var validationTimer

  export default {
    computed: {
      errors () {
        return this.$store.getters['events/form/organizerErrors']
      },
      organizer: {
        get () {
          return this.$store.getters['events/form/organizer']
        },
        set (value) {
          const field = {
            name: 'organizer',
            value: value
          }
          this.$store.dispatch('events/form/setField', field)
        }
      }
    },
    methods: {
      validate () {
        clearTimeout(validationTimer)
        const errors = {
          field: 'organizer',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.organizer.length > 30 ? errors.data.push(`Organizer can't be longer than 30 characters`) : ''
          this.organizer.length < 2 ? errors.data.push(`Organizer must be longer than 2 characters`) : ''
          this.dispatchErrors(errors, 'events')
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
