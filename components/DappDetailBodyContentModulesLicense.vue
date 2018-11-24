<template>
  <div class="component-DappDetailBodyContentModulesLicense">
    <h4 class="license-title">Software license</h4>
    <p 
      v-if="license" 
      class="license-data">{{ license }}</p>
    <p 
      v-else 
      class="license-data">Unknown license</p>
  </div>
</template>

<script>
export default {
  props: {
    license: {
      type: String,
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
