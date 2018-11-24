<template>
  <div>
    <DappFormFields
      :is-edit="true"
      :suggestions="suggestions"/>
  </div>
</template>

<script>
import DappFormFields from './dapps/form/Fields'

export default {
  components: {
    DappFormFields
  },
  props: {
    suggestions: {
      type: Array,
      required: true
    }
  },
  destroyed() {
    this.$store.dispatch('dapps/form/resetForm')
  },
  mounted() {
    this.$store.dispatch('dapps/form/resetForm')
  }
}
</script>
