<template>
  <div class="component-DappDetailBodyContentModulesUpdated">
    Last updated: <strong>{{ updated | formatDate('MMM Do, YYYY') }}</strong>
  </div>
</template>

<script>
export default {
  props: {
    updated: {
      type: String,
      required: true
    }
  }
}
</script>
