<template>
  <div class="DappFormFieldsEmail">
    <FormText
      :errors="errors"
      :field="email"
      :max-length="50"
      :help="help"
      :required="true"
      :value="email"
      label="Email"
      placeholder="e.g. email@example.com"
      type="text"
      @update="updateAndValidate"/>
  </div>
</template>

<script>
import { isValidEmail } from '~/helpers/validators'
import FormText from './FormText'

export default {
  components: {
    FormText
  },
  props: {
    email: {
      type: String,
      required: true,
      default: ''
    },
    errors: {
      type: Array,
      required: true,
      default: () => []
    },
    formType: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      validationTimer: ''
    }
  },
  computed: {
    help() {
      if (this.formType === 'new') {
        return 'The primary contact (this will not be made public)'
      } else if (this.formType === 'edit') {
        return 'Your email address (this will not be made public)'
      }
      return ''
    }
  },
  methods: {
    updateAndValidate(value) {
      this.$emit('updateField', 'email', value)
      clearTimeout(this.validationTimer)
      const errors = {
        field: 'email',
        data: []
      }
      this.validationTimer = setTimeout(() => {
        isValidEmail(this.email)
          ? ''
          : errors.data.push(`Please enter a valid email address`)
        this.$emit('updateErrors', errors)
      }, 750)
    }
  }
}
</script>

<style lang="scss" scoped>
.DappFormFieldsEmail {
  margin: 0 auto;
  width: 300px;
  @include tweakpoint('min-width', 1000px) {
    margin-left: 0;
  }
}
</style>
