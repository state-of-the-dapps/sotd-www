<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <input class="text-input" :class="name.length > 0 ? '--is-filled' : ''" type="text" maxlength="25" v-model="name" @input="validate">
    <label class="label">ÐApp name <span class="required">(required)</span></label>
    <span class="remaining-characters">{{ 25 - name.length }}</span>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="error in errors" class="error-item">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
  import { dispatchErrors } from '~/plugins/mixins'
  import axios from '~/plugins/axios'
  
  var validationTimer
  
  export default {
    computed: {
      errors () {
        return this.$store.getters['submit/nameErrors']
      },
      name: {
        get () {
          return this.$store.getters['submit/name']
        },
        set (value) {
          const field = {
            name: 'name',
            value: value
          }
          this.$store.dispatch('submit/updateField', field)
        }
      }
    },
    methods: {
      validate () {
        clearTimeout(validationTimer)
        const errors = {
          field: 'name',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.name.length > 25 ? errors.data.push(`Name can't be longer than 25 characters`) : ''
          this.name.length < 2 ? errors.data.push(`Name must be longer than 1 character`) : ''
          axios
            .get('dapps/' + this.name)
            .then(response => {
              if (response.data.hasOwnProperty('name') && this.name.length > 0) {
                errors.data.push(`Name has already been taken`)
              }
              this.dispatchErrors(errors)
            })
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
