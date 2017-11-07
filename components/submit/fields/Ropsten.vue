<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <input class="text-input" :class="ropsten.length > 0 ? '--is-filled' : ''" type="text" maxlength="42" v-model="ropsten" @input="validate">
    <label class="label">Ropsten address</label>
    <span class="remaining-characters">{{ 42 - ropsten.length }}</span>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="error in errors" class="error-item">{{ error }}</li>
    </ul>
    <p class="help">(e.g. 0xab7c74abC0C4d48d1bdad5DCB26153FC8780f83E)</p>
  </div>
</template>

<script>
  import { dispatchErrors } from '~/plugins/mixins'

  var validationTimer

  export default {
    computed: {
      errors () {
        return this.$store.getters['submit/ropstenErrors']
      },
      ropsten: {
        get () {
          return this.$store.getters['submit/ropsten']
        },
        set (value) {
          const field = {
            name: 'ropsten',
            value: value
          }
          this.$store.dispatch('submit/updateContract', field)
        }
      }
    },
    methods: {
      validate () {
        clearTimeout(validationTimer)
        const errors = {
          field: 'ropsten',
          data: []
        }
        validationTimer = setTimeout(() => {
          (this.ropsten.length > 42 || this.ropsten.length < 42) && this.ropsten.length !== 0 ? errors.data.push(`Ropsten address must be 42 characters`) : ''
          this.dispatchErrors(errors)
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
