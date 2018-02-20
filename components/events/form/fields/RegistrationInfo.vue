<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
      <textarea class="text-area" maxlength="100" :class="registrationInfo.length > 0 ? '--is-filled' : ''" type="text" v-model="registrationInfo" @input="validate"></textarea>
      <label class="label">Registration info <span class="required">(required)</span></label>
      <span class="remaining-characters">{{ 100 - registrationInfo.length }}</span>
      <ul v-if="errors && errors.length > 0" class="error-list">
        <li v-for="(error, index) in errors" :key="index" class="error-item">{{ error }}</li>
      </ul>
      <p class="help">Cost and other important registration details</p>
    </div>
</template>

<script>
  import { dispatchErrors } from '~/helpers/mixins'

  var validationTimer

  export default {
    computed: {
      errors () {
        return this.$store.getters['events/form/registrationInfoErrors']
      },
      registrationInfo: {
        get () {
          return this.$store.getters['events/form/registrationInfo']
        },
        set (value) {
          const field = {
            name: 'registrationInfo',
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
          field: 'registrationInfo',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.registrationInfo.length > 100 ? errors.data.push(`Registration info can't be longer than 100 characters`) : ''
          this.registrationInfo.length < 2 ? errors.data.push(`Registration info must be longer than 2 characters`) : ''
          this.dispatchErrors(errors, 'events')
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
