<template>
  <div class="component-DappDetailBodyContentModulesStatus">
    {{ $t(namespace('status')) }}: <strong>{{ status | capitalize }}</strong>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true
    }
  }
}
</script>
