<template>
  <ul class="component-DappListHeadings">
    <li 
      v-for="(field, index) in fields" 
      :key="index" 
      :class="'-' + field.id" 
      class="column">
      <div 
        :class="'-' + field.id" 
        class="field-wrapper">
        <span 
          v-if="field.title" 
          class="field -name" 
          @click="sortDapps(field)">
          {{ field.title }}
        </span>
        <Help 
          v-if="field.help" 
          :text="field.help" 
          :bottom="true" 
          :reversed="field.id === 'rank'"/>
        <span 
          v-if="sort === field.id" 
          class="sort-arrow"/>
      </div>
    </li>
  </ul>
</template>

<script>
import Help from './Help'

export default {
  components: {
    Help
  },
  props: {
    fields: {
      type: Array,
      required: true
    },
    order: {
      type: String,
      required: true
    },
    sort: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    sortDapps(field) {
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
  font-size: 0.95rem;
  position: sticky;
  top: -1px;
}

.field-wrapper {
  display: flex;
  align-items: center;
  height: 100%;
  &.-dau,
  &.-mau,
  &.-vol_7d,
  &.-dev_30d,
  &.-users_30d,
  &.-profile {
    .field.-name {
      margin-left: auto;
    }
  }
}

.field.-name {
  .-rank &,
  .-dau &,
  .-mau &,
  .-dev_30d & {
    border-bottom: 1px solid $color--black;
    cursor: pointer;
  }
}

.sort-arrow {
  margin-left: 4px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 8px solid $color--black;
}

@include dapp-rankings-widths;
</style>
