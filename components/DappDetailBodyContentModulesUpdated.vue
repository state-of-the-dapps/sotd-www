<template>
  <div class="DappDetailBodyContentModulesUpdated">
    {{ $t(namespace('lastUpdated')) }}: <strong>{{ updated | formatDate('MMM Do, YYYY') }}</strong>
  </div>
</template>

<script>
export default {
  props: {
    updated: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>
