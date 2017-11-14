<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <input class="text-input" :class="name.length > 0 ? '--is-filled' : ''" type="text" maxlength="25" v-model="name" @input="validate">
    <label class="label">ÐApp name <span class="required">(required)</span></label>
    <span class="remaining-characters">{{ 25 - name.length }}</span>
    <ul v-if="warnings && warnings.length > 0" class="warning-list">
      <li v-for="warning in warnings" class="warning-item">{{ warning }}</li>
    </ul>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="error in errors" class="error-item">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
  import { dispatchErrors, dispatchWarnings } from '~/plugins/mixins'
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
      },
      warnings () {
        return this.$store.getters['submit/nameWarnings']
      }
    },
    methods: {
      validate () {
        clearTimeout(validationTimer)
        const errors = {
          field: 'name',
          data: []
        }
        const warnings = {
          field: 'name',
          data: []
        }
        const warningWords = [
          'http',
          'www'
        ]
        validationTimer = setTimeout(() => {
          this.name.length > 25 ? errors.data.push(`Name can't be longer than 25 characters`) : ''
          this.name.length < 2 ? errors.data.push(`Name must be longer than 1 character`) : ''
          var hasWarningWords = warningWords.some((word) => {
            return this.name.toLowerCase().startsWith(word)
          })
          hasWarningWords === true ? warnings.data.push(`Your ÐApp name should not be a url`) : null
          axios
            .get('dapps/' + this.name)
            .then(response => {
              if (response.data.hasOwnProperty('name') && this.name.length > 0) {
                errors.data.push(`Name has already been taken`)
              }

              this.dispatchErrors(errors)
              this.dispatchWarnings(warnings)
            })
            .catch((error) => {
              console.log(error)
            })
        }, 750)
      }
    },
    mixins: [dispatchErrors, dispatchWarnings]
  }
</script>
