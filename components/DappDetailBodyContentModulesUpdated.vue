<template>
  <div class="component-DappDetailBodyContentModulesUpdated">
    {{ $t(namespace('lastUpdated')) }}: <strong>{{ updated | formatDate('MMM Do, YYYY') }}</strong>
  </div>
</template>

<script>
import { componentNamespace } from '@/helpers/mixins'
export default {
  mixins: [componentNamespace],
  props: {
    updated: {
      type: String,
      required: true
    }
  }
}
</script>
