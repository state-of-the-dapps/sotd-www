<template>
  <div class="component-DappDetailBodyContentModulesStatus">
    {{ $t('status') }}: <strong>{{ $t(`statusOptions.${status}`) | capitalize }}</strong>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: String,
      required: true,
      default: ''
    }
  }
}
</script>
