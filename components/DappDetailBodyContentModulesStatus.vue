<template>
  <div class="component-DappDetailBodyContentModulesStatus">
    Status: <strong>{{ status | capitalize }}</strong>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      required: true
    }
  }
}
</script>
