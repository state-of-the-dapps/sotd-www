<template>
  <div>
    <DappFormFields :is-edit="true"/>
  </div>
</template>

<script>
import DappFormFields from './dapps/form/Fields'

export default {
  components: {
    DappFormFields
  },
  destroyed () {
    this.$store.dispatch('dapps/form/resetForm')
  },
  mounted () {
    this.$store.dispatch('dapps/form/resetForm')
  }
}
</script>
