<template>
  <div 
    :class="[errors && errors.length > 0 ? '--has-errors' : '', formType ==='edit' ? 'is-edit' : '']" 
    class="item">
    <p class="heading">ÐApp name <span class="required">(required)</span></p>
    <input 
      :disabled="formType === 'edit'"
      :class="name.length > 0 ? '--is-filled' : ''" 
      :value="name"
      placeholder="e.g. Cryptokitties"
      class="text-input" 
      type="text" 
      maxlength="25" 
      @input="updateAndValidate($event.target.value)">
    <span
      v-if="name.length"
      class="remaining-characters">{{ 25 - name.length }}</span>
    <ul 
      v-if="warnings && warnings.length > 0" 
      class="warning-list">
      <li 
        v-for="(warning, index) in warnings" 
        :key="index" 
        class="warning-item">{{ warning }}</li>
    </ul>
    <ul 
      v-if="errors && errors.length > 0" 
      class="error-list">
      <li 
        v-for="(error, index) in errors" 
        :key="index" 
        class="error-item">{{ error }}
      </li>
      <li
        v-if="existingDapp"
        class="error-item">You can 
        <nuxt-link 
          :to="localePath({ name: 'dapp-detail', params: { slug: existingDapp } })"
          class="error-link">review</nuxt-link> or 
        <nuxt-link
          :to="localePath({ name: 'dapp-detail-edit', params: { slug: existingDapp }})"
          class="error-link">submit edits</nuxt-link> to that ÐApp
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      required: true
    },
    existingDapp: {
      type: String,
      required: true
    },
    formType: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    warnings: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      validationTimer: ''
    }
  },
  methods: {
    updateAndValidate(value) {
      this.$emit('updateField', 'name', value)
      clearTimeout(this.validationTimer)
      const errors = {
        field: 'name',
        data: []
      }
      const warnings = {
        field: 'name',
        data: []
      }
      const warningWords = ['.']
      this.validationTimer = setTimeout(() => {
        this.name.length > 25
          ? errors.data.push(`Name can't be longer than 25 characters`)
          : ''
        this.name.length < 2
          ? errors.data.push(`Name must be longer than 1 character`)
          : ''
        var hasWarningWords = warningWords.some(word => {
          return this.name.toLowerCase().includes(word)
        })
        hasWarningWords === true
          ? warnings.data.push(`Your ÐApp name should not be a URL`)
          : null
        this.$axios
          .get('dapps/lookup', {
            params: {
              name: this.name
            }
          })
          .then(response => {
            this.$emit('updateExistingDapp', '')
            const data = response.data
            const item = data.item
            if (item.slug) {
              errors.data.push(`That name has already been taken`)
              if (!item.queue) {
                this.$emit('updateExistingDapp', item.slug)
              }
            }
            this.$emit('updateErrors', errors)
            this.$emit('updateWarnings', warnings)
          })
          .catch(error => {
            console.log(error)
          })
      }, 750)
    }
  }
}
</script>
