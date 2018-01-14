<template>
  <div class="item" :class="errors && errors.length > 0 ? '--has-errors' : ''">
    <input class="text-input" :class="hashtag.length > 0 ? '--is-filled' : ''" type="text" maxlength="20" v-model="hashtag" @input="validate">
    <label class="label">Hashtag</label>
    <span class="remaining-characters">{{ 20 - hashtag.length }}</span>
    <ul v-if="errors && errors.length > 0" class="error-list">
      <li v-for="(error, index) in errors" :key="index" class="error-item">{{ error }}</li>
    </ul>
    <p class="help">A twitter hashtag for this event. You don't need to use the # sign.</p>
  </div>
</template>

<script>
  import { dispatchErrors } from '~/helpers/mixins'

  var validationTimer

  export default {
    computed: {
      errors () {
        return this.$store.getters['events/form/hashtagErrors']
      },
      hashtag: {
        get () {
          return this.$store.getters['events/form/hashtag']
        },
        set (value) {
          let sanitizedValue = value
            .replace(/[#\s]/g, '')
          const field = {
            name: 'hashtag',
            value: sanitizedValue
          }
          this.$store.dispatch('events/form/setField', field)
        }
      }
    },
    methods: {
      validate () {
        clearTimeout(validationTimer)
        const errors = {
          field: 'hashtag',
          data: []
        }
        validationTimer = setTimeout(() => {
          this.hashtag.length > 20 ? errors.data.push(`Hashtag can't be longer than 20 characters`) : ''
          this.hashtag.length > 0 && this.hashtag.length < 2 ? errors.data.push(`Hashtag must be longer than 2 characters`) : ''
          this.dispatchErrors(errors, 'events')
        }, 750)
      }
    },
    mixins: [dispatchErrors]
  }
</script>
