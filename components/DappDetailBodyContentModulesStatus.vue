<template>
  <div class="component-DappDetailBodyContentModulesStatus">
    {{ $t(namespace('status')) }}: <strong>{{ status | capitalize }}</strong>
  </div>
</template>

<script>
import { componentNamespace } from '@/helpers/mixins'
export default {
  mixins: [componentNamespace],
  props: {
    status: {
      type: String,
      required: true
    }
  }
}
</script>
