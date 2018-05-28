<template>
<div class="component-DappDetailBodyContentModulesSubmitted">
  Submitted: <strong>{{ submitted | formatDate('MMM Do, YYYY') }}</strong>
</div>
</template>

<script>
export default {
  props: {
    submitted: {
      required: true
    }
  }
}
</script>
