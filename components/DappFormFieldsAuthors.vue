<template>
  <div 
    :class="errors && errors.length > 0 ? '--has-errors' : ''" 
    class="item">
    <p class="heading"><span class="checkmark"><IconCheckmark :fill="formattedAuthors.length >= 2 && !errors.length ? 'purple' : 'gray'"/></span>ÐApp author(s) <span class="required">(required)</span></p>
    <input
      :class="formattedAuthors.length > 0 ? '--is-filled' : ''"
      :value="formattedAuthors"
      class="text-input"
      placeholder="e.g. Stephen Hawking, Ada Lovelace"
      type="text"
      maxlength="100"
      @input="updateAndValidate($event.target.value)">
    <span
      v-if="formattedAuthors.length"
      class="remaining-characters">{{ 100 - formattedAuthors.length }}</span>
    <ul 
      v-if="errors && errors.length > 0" 
      class="error-list">
      <li 
        v-for="(error, index) in errors" 
        :key="index" 
        class="error-item">{{ error }}</li>
    </ul>
    <p class="help">Separate names or organizations with a comma</p>
  </div>
</template>

<script>
import IconCheckmark from './IconCheckmark'

export default {
  components: {
    IconCheckmark
  },
  props: {
    authors: {
      type: Array,
      required: true,
      default: () => []
    },
    errors: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      validationTimer: ''
    }
  },
  computed: {
    formattedAuthors() {
      const values = this.authors.slice()
      return values.join(', ')
    }
  },
  methods: {
    updateAndValidate(value) {
      const values = value.split(', ')
      this.$emit('updateField', 'authors', values)
      clearTimeout(this.validationTimer)
      const errors = {
        field: 'authors',
        data: []
      }
      this.validationTimer = setTimeout(() => {
        this.formattedAuthors.length > 100
          ? errors.data.push(`Authors can't be longer than 100 characters`)
          : ''
        this.formattedAuthors.length < 2
          ? errors.data.push(`Authors must be longer than 1 character`)
          : ''
        this.$emit('updateErrors', errors)
      }, 750)
    }
  }
}
</script>
