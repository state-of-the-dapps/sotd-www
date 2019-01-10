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
  props: {
    status: {
      type: String,
      required: true
      // TODO default value
    }
  },
  data: () => {
    return {
      items: statusList
    }
  },
  methods: {
    select(value) {
      this.$emit('updateStatus', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.heading {
  margin-top: 1.5rem !important;
}

.item {
  width: calc(50% - 10px);
  margin: 5px;
  padding: 10px;
  box-shadow: 0 0 20px rgba($color--black, 0.05);
  border: 1px solid $color--black;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
  &.--is-selected {
    color: $color--white;
    background-color: $color--black;
    text-decoration: none;
  }
}

.list {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  margin: 0 -5px 10px;
}
</style>
