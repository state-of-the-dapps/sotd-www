<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <input class="text-input" :class="author.length > 0 ? '--is-filled' : ''" type="text" maxlength="25" v-model="author" @input="validate">
    <label class="label">ÐApp founder <span class="required">(required)</span></label>
    <span class="remaining-characters">{{ 25 - author.length }}</span>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="error in errors" class="error-item">{{ error }}</li>
    </ul>
    <p class="help">This can be a person or organization</p>
  </div>
</template>

<script>
  import { dispatchErrors } from '~/helpers/mixins'

  var validationTimer

  export default {
    computed: {
      author: {
        get () {
          return this.$store.getters['dapps/form/author']
        },
        set (value) {
          const field = {
            name: 'author',
            value: value
          }
          this.$store.dispatch('dapps/form/setField', field)
        }
      },
      errors () {
        return this.$store.getters['dapps/form/authorErrors']
      }
    },
    methods: {
      validate () {
        clearTimeout(validationTimer)
        const errors = {
          field: 'author',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.author.length > 25 ? errors.data.push(`Founder can't be longer than 25 characters`) : ''
          this.author.length < 2 ? errors.data.push(`Founder must be longer than 1 character`) : ''
          this.dispatchErrors(errors)
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
