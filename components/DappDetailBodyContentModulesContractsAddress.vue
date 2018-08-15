<template>
  <li class="component-DappDetailBodyContentModulesContractsAddress">
    <a @click="trackContract(address, network)" :href="'https://' + (network === 'mainnet' ? '' : network + '.') + 'etherscan.io/address/' + address + '?utm_source=StateOfTheDApps'" class="contract-address-value" target="_blank" rel="noopener noreferrer">
      <media :query="{maxWidth: 500}">
        <span>{{ address | truncate(20) }}</span>
      </media>
      <media :query="{minWidth: 500}">
        <span>{{ address }}</span>
      </media>
    </a>
    <span class="contract-address-copy" v-clipboard:copy="address" v-clipboard:success="copy" @click="trackContractCopy(address, network)">{{ copyText }}</span>
  </li>
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
    address: {
      required: true
    },
    network: {
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

.component-DappDetailBodyContentModulesContractsAddress {
  padding: 2px 0;
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
</style>
