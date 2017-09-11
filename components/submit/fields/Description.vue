<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <textarea class="text-area" maxlength="500" style="min-height: 200px" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"  :class="description.length > 0 ? '--is-filled' : ''" type="text" v-model="description" @input="validate"></textarea>
    <label class="label">Full description <span class="required">(required)</span></label>
    <span class="remaining-characters">{{ 500 - description.length }}</span>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="error in errors" class="error-item">{{ error }}</li>
    </ul>
    <p class="help">The full description of your ÐApp</p>
  </div>
</template>

<script>
  import { dispatchErrors } from '~/plugins/mixins'
  
  var validationTimer

  export default {
    computed: {
      description: {
        get () {
          return this.$store.getters['submit/description']
        },
        set (value) {
          const field = {
            name: 'description',
            value: value
          }
          this.$store.dispatch('submit/updateField', field)
        }
      },
      errors () {
        return this.$store.getters['submit/descriptionErrors']
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
          this.description.length > 500 ? errors.data.push(`Description can't be longer than 500 characters`) : ''
          this.description.length < 21 ? errors.data.push(`Description must be longer than 20 characters`) : ''
          this.dispatchErrors(errors)
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
