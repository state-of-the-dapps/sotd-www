<template>
  <ul class="component-DappListHeadings">
    <li v-for="(field, index) in fields" :key="index" class="column" :class="'-' + field.id">
      <div class="field" :class="'-' + field.id">
        <span v-if="field.title" class="field -name">{{ field.title }}</span>
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

.component-DappListHeadings {
  background: darken($color--white, 2.5%);
  display: flex;
  padding: 20px 0 17px 0;
  text-transform: uppercase;
  font-size: .85rem;
  position: sticky;
  top: -1px;
}

@include dapp-rankings-widths;
</style>
