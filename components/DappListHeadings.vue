<template>
  <ul class="component-DappListHeadings">
    <li v-for="(field, index) in fields" :key="index" class="column" :class="'-' + field.id">
      <div class="field-wrapper" :class="'-' + field.id">
        <span v-if="field.title" @click="sortDapps(field)" class="field -name" :class="sort === field.id ? 'is-active' : ''">
          {{ field.title }}
        </span>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['fields', 'order', 'sort'],
  methods: {
    sortDapps (field) {
      if (field.order) {
        this.$emit('sortDapps', { order: field.order, sort: field.id })
      }
    }
  }
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
  &.-dau, &.-mau, &.-vol_7d, &.-users_30d {
    .field.-name {
      margin-left: auto;
    }
  }
}

.field.-name {
  .-rank &, .-dau &, .-mau &, .-vol_7d & {
    border-bottom: 1px solid darken($color--gray, 20%);
    cursor: pointer;
    &.is-active {
      border-color: $color--black;
    }
  }
}

@include dapp-rankings-widths;
</style>
