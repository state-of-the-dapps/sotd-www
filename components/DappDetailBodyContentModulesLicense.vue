<template>
<div class="component-DappDetailBodyContentModulesLicense">
  <h4 class="license-title">Software license</h4>
  <p class="license-data">{{ license }}</p>
</div>
</template>

<script>
export default {
  props: {
    license: {
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.license-data {
  margin: 0;
}

.license-title {
  margin: 0;
}
</style>
