<template>
  <li class="contract">
    <div class="contract-network">
      {{ contract.network | capitalize }}
    </div>
    <div class="contract-address"><a @click="$mixpanel.track('DApp - Contract', { network: contract.network, address: contract.address })" :href="'https://'
      + (contract.network === 'mainnet' ? '' : contract.network + '.')
      + 'etherscan.io/address/'
      + contract.address" target="_blank" rel="noopener noreferrer">{{ contract.address | truncate(20) }}</a>
    </div>
    <div class="contract-copy">
      <span v-clipboard:copy="contract.address" v-clipboard:success="copy">{{ copyStatus }}</span>
    </div>
  </li>
</template>

<script>
  export default {
    data: () => {
      return {
        copyStatus: 'Copy'
      }
    },
    methods: {
      copy () {
        this.copyStatus = 'Copied!'
        setTimeout(() => {
          this.copyStatus = 'Copy'
        }, 1500)
      }
    },
    props: ['contract']
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .contract {
    margin: 2px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    &:first-child {
      margin-top: 10px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }

  .contract-copy {
    cursor: pointer;
    margin-left: 10px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: .65rem;
    background: $color--mine-shaft;
    padding: 2px 5px;
    color: $color--gallery;
  }

  .contract-network {
    padding: 2px 0;
    width: 55px;
  }

  .contract-address {
    font-family: 'Inconsolata', monospace;
  }
</style>
