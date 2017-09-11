<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
      <textarea class="text-area" maxlength="75" :class="teaser.length > 0 ? '--is-filled' : ''" type="text" v-model="teaser" @input="validate"></textarea>
      <label class="label">Teaser description<span class="required">(required)</span></label>
      <span class="remaining-characters">{{ 75 - teaser.length }}</span>
      <ul v-if="errors && errors.length > 0" class="error-list">
        <li v-for="error in errors" class="error-item">{{ error }}</li>
      </ul>
      <p class="help">A short sentence that will be displayed on the ÐApp card</p>
    </div>
</template>

<script>
  import { dispatchErrors } from '~/plugins/mixins'
  
  var validationTimer
  
  export default {
    computed: {
      errors () {
        return this.$store.getters['submit/teaserErrors']
      },
      teaser: {
        get () {
          return this.$store.getters['submit/teaser']
        },
        set (value) {
          const field = {
            name: 'teaser',
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
          field: 'teaser',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.teaser.length > 75 ? errors.data.push(`Teaser can't be longer than 75 characters`) : ''
          this.teaser.length < 4 ? errors.data.push(`Teaser must be longer than 3 characters`) : ''
          this.dispatchErrors(errors)
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
