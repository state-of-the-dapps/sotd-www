<template>
  <div class="component-DappDetailBodyContentModulesSubmitted">
    {{ $t(namespace('submitted')) }}: <strong>{{ submitted | formatDate('MMM Do, YYYY') }}</strong>
  </div>
</template>

<script>
import { componentNamespace } from '@/helpers/mixins'
export default {
  mixins: [componentNamespace],
  props: {
    submitted: {
      type: String,
      required: true
    }
  }
}
</script>
