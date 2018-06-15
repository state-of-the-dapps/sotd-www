<template>
  <ul class="component-DappListHeadings">
    <li v-for="(field, index) in fields" :key="index" class="column" :class="'-' + field.id">
      <div class="field-wrapper" :class="'-' + field.id">
        <span v-if="field.title" class="field -name">
          {{ field.title }}
        </span>
        <div v-if="field.sort" class="sort-wrapper">
          <span @click="$emit('sortDapps', { order: 'asc', sort: field.id })" class="sort -asc" :class="sort === field.id && order === 'asc' ? 'is-active' : ''"/>
          <span @click="$emit('sortDapps', { order: 'desc', sort: field.id })"  class="sort -desc" :class="sort === field.id && order === 'desc' ? 'is-active' : ''"/>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['fields', 'order', 'sort']
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappListHeadings {
  background: darken($color--white, 2.5%);
  display: flex;
  padding: 20px 0 17px 0;
  text-transform: uppercase;
  font-size: .95rem;
  position: sticky;
  top: -1px;
}

.field-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  &.-dau, &.-mau, &.-vol_7d {
    .field.-name {
      margin-left: auto;
    }
  }
}

.sort-wrapper {
  display: inline-block;
  position: relative;
  margin-left: 5px;
  top: -1px;
}

.sort {
  display: block;
  width: 0; 
  height: 0; 
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 6px solid rgba($color--black, .3);
  margin: 3px 0;
  transition: all .2s ease;
  cursor: pointer;
  &.-desc {
    transform: rotate(180deg)
  }
  &.is-active, &:hover {
    border-bottom-color: $color--black;
  }
}

@include dapp-rankings-widths;
</style>
