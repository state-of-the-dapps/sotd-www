<template>
  <div class="component-DappDetailBodyContentModulesSubmitted">
    {{ $t(namespace('submitted')) }}: <strong>{{ submitted | formatDate('MMM Do, YYYY') }}</strong>
  </div>
</template>

<script>
export default {
  props: {
    submitted: {
      type: String,
      required: true
      // TODO default value
    }
  }
}
</script>
