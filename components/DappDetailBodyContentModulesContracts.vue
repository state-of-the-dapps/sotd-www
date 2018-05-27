<template>
<div class="component-DappDetailBodyContentModulesContracts">
  <h4 class="subtitle">Contract address<span v-if="contracts.length > 1">(es)</span></h4>
  <ul class="contract-list">
    <li v-for="(contract, index) in contracts" :key="index" class="contract-item">
      <span class="contract-name"><strong>{{ contract.network | capitalize }}</strong></span>
      <span class="contract-address">
        <a @click="trackContract(contract.address, contract.network)" :href="'https://' + (contract.network === 'mainnet' ? '' : contract.network + '.') + 'etherscan.io/address/' + contract.address" class="contract-address-value" target="_blank" rel="noopener noreferrer">
          <media :query="{maxWidth: 500}">
            <span>{{ contract.address | truncate(20) }}</span>
          </media>
          <media :query="{minWidth: 500}">
            <span>{{ contract.address }}</span>
          </media>
        </a>
        <span class="contract-address-copy" v-clipboard:copy="contract.address" v-clipboard:success="copy" @click="trackContractCopy(contract.address, contract.network)">{{ copyText }}</span>
      </span>
    </li>
  </ul>
</div>
</template>

<script>
import { trackDappContract, trackDappContractCopy } from '~/helpers/mixpanel'
import Media from 'vue-media'

export default {
  components: {
    Media
  },
  data: () => {
    return {
      copyText: 'Copy'
    }
  },
  methods: {
    copy () {
      this.copyText = 'Copied!'
      setTimeout(() => {
        this.copyText = 'Copy'
      }, 1500)
    },
    trackContract (address, network) {
      const dapp = this.slug
      const action = trackDappContract(address, dapp, network)
      this.$mixpanel.track(action.name, action.data)
    },
    trackContractCopy (address, network) {
      const dapp = this.slug
      const action = trackDappContractCopy(address, dapp, network)
      this.$mixpanel.track(action.name, action.data)
    }
  },
  props: {
    contracts: {
      required: true
    },
    slug: {
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.contract-item {
  display: flex;
  align-items: center;
  padding: 2px 0;
}

.contract-list {
  margin-top: 10px;
}

.contract-name {
  min-width: 70px;
}

.contract-address {
  flex: 1;
}

.contract-address-value {
  font-family: 'Inconsolata', monospace;
}

.contract-address-copy {
  margin-left: 8px;
  font-size: .7rem;
  color: $color--white;
  background: $color--black;
  padding: 2px 5px;
  text-transform: uppercase;
  font-weight: 600;
  position: relative;
  top: -1px;
  cursor: pointer;
  &:active {
    top: 0;
  }
}

.subtitle {
  margin: 0;
}
</style>

