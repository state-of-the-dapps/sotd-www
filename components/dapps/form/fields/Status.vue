<template>
  <div>
    <p class="heading">ÐApp status <span class="required">(required)</span></p>
    <ul class="list">
      <li 
        v-for="(item, index) in items" 
        :key="index" 
        :class="status === item ? 'item -' + item + ' --is-selected' : 'item -' + item" 
        @click="select(item)">{{ item | formatDappStatus | capitalize }}</li>
    </ul>
  </div>
</template>

<script>
import { dappStatuses as statusList } from '~/helpers/constants'

export default {
  data: () => {
    return {
      items: statusList
    }
  },
  computed: {
    status() {
      return this.$store.getters['dapps/form/status']
    }
  },
  methods: {
    select(value) {
      this.$store.dispatch('dapps/form/setStatus', value)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.heading {
  margin-top: 1.5rem !important;
}

.item {
  width: calc(50% - 10px);
  margin: 5px;
  background: $color--white;
  padding: 10px;
  box-shadow: 0 0 20px rgba($color--black, 0.05);
  border: 1px solid transparent;
  &:hover {
    cursor: pointer;
  }
  &.--is-selected {
    border-color: $color--black;
  }
}

.list {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin: 0 -5px 10px;
}
</style>
