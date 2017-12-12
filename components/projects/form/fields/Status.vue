<template>
  <div>
    <p class="heading">Project status <span class="required">(required)</span></p>
    <ul class="list">
      <li v-for="item in items" @click="select(item)" :class="status === item ? 'item -' + item + ' --is-selected' : 'item -' + item">{{ item | formatProjectStatus | capitalize }}</li>
    </ul>
  </div>
</template>

<script>
  import { dappsStatusList as statusList } from '~/helpers/constants'

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
    background: $color--mine-shaft;
    padding: 10px;
    box-shadow: 0 0 20px rgba($color--mine-shaft,.05);
    border: 1px solid transparent;
    &:hover {
      cursor: pointer;
    }
    &.--is-selected {
      border-color:$color--mine-shaft;
    }
    &.-live {
      background: $color--screamin-green;
    }
    &.-demo {
      background: $color--paris-daisy;
    }
    &.-prototype {
      background: $color--golden-tainoi;
    }
    &.-wip {
      background: $color--anakiwa;
    }
    &.-concept {
      background: $color--perfume;
    }
    &.-stealth {
      background: rgba($color--mine-shaft,.5);
    }
    &.-unknown {
      background: rgba($color--mine-shaft,.2);
    }
    &.-abandoned {
      background: $color--alabaster;
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    margin: 0 -5px 10px;
  }
</style>
