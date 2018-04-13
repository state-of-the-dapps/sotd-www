<template>
  <div>
    <p class="heading">ÐApp status <span class="required">(required)</span></p>
    <ul class="list">
      <li v-for="(item, index) in items" :key="index" @click="select(item)" :class="status === item ? 'item -' + item + ' --is-selected' : 'item -' + item">{{ item | formatDappStatus | capitalize }}</li>
    </ul>
  </div>
</template>

<script>
  import { dappStatuses as statusList } from '~/helpers/constants'

  export default {
    computed: {
      status () {
        return this.$store.getters['dapps/form/status']
      }
    },
    data: () => {
      return {
        items: statusList
      }
    },
    methods: {
      select (value) {
        this.$store.dispatch('dapps/form/setStatus', value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .heading {
    text-align: center;
    margin-top: 1.5rem;
    margin-bottom: .5rem;
  }

  .item {
    width: calc(50% - 10px);
    margin: 5px;
    background: $color--black;
    padding: 10px;
    box-shadow: 0 0 20px rgba($color--black,.05);
    border: 1px solid transparent;
    &:hover {
      cursor: pointer;
    }
    &.--is-selected {
      border-color:$color--black;
    }
    &.-live {
      background: $color--dapp-live;
    }
    &.-beta {
      background: $color--dapp-beta;
    }
    &.-prototype {
      background: $color--dapp-prototype;
    }
    &.-wip {
      background: $color--dapp-wip;
    }
    &.-concept {
      background: $color--dapp-concept;
    }
    &.-stealth {
      background: $color--dapp-stealth;
    }
    &.-unknown {
      background: $color--dapp-unknown;
    }
    &.-abandoned {
      background: $color--dapp-abandoned;
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    margin: 0 -5px 10px;
  }
</style>
