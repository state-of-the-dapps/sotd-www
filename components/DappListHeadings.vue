<template>
  <ul class="component-DappListHeadings">
    <li v-for="(field, index) in fields" :key="index" class="row">
      <div class="column -rank">
        <span v-if="field.name" class="field -name">{{ field.name }}</span>
        <span v-if="field.help" class="field -help">?</span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['fields']
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';


</style>

