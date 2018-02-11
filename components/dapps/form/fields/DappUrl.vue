<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
      <input class="text-input" :class="url.length > 0 ? '--is-filled' : ''" type="text" maxlength="500" v-model="url" @input="validate">
      <label class="label">ÐApp URL<span class="required"></span></label>
      <span class="remaining-characters">{{ 500 - url.length }}</span>
      <ul v-if="errors && errors.length > 0" class="error-list">
        <li v-for="(error, index) in errors" :key="index" class="error-item">{{ error }}</li>
      </ul>
      <p class="help">A URL that will launch this ÐApp directly</p>
    </div>
</template>

<script>
  import { dispatchErrors } from '~/helpers/mixins'

  var validationTimer

  export default {
    computed: {
      errors () {
        return this.$store.getters['dapps/form/dappUrlErrors']
      },
      url: {
        get () {
          return this.$store.getters['dapps/form/dappUrl']
        },
        set (value) {
          const field = {
            name: 'dapp',
            value: value
          }
          this.$store.dispatch('dapps/form/setSiteUrl', field)
        }
      }
    },
    methods: {
      validate () {
        clearTimeout(validationTimer)
        const errors = {
          field: 'dappUrl',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.url.length > 0 && this.url.length < 3 ? errors.data.push(`ÐApp URL must be longer than 2 characters`) : ''
          this.dispatchErrors(errors, 'dapps')
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
