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
  }
}
</script>
