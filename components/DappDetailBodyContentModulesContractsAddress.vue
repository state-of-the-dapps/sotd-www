<template>
  <li class="component-DappDetailBodyContentModulesContractsAddress">
    <a
      :href="addressLink"
      class="contract-address-value"
      target="_blank"
      rel="noopener noreferrer"
      @click="trackContract(address, network, platform)">
      <media :query="{maxWidth: 500}">
        <span>{{ address | truncate(20) }}</span>
      </media>
      <media :query="{minWidth: 500}">
        <span>{{ address }}</span>
      </media>
    </a>
    <span 
      v-clipboard:copy="address" 
      v-clipboard:success="copy" 
      class="contract-address-copy" 
      @click="trackContractCopy(address, network)">{{ copyText }}</span>
  </li>
</template>

<script>
import { trackDappContract, trackDappContractCopy } from '~/helpers/mixpanel'
import Media from 'vue-media'

export default {
  components: {
    Media
  },
  props: {
    address: {
      type: String,
      required: true
    },
    network: {
      type: String,
      required: true
    },
    platform: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      copyText: 'Copy'
    }
  },
  computed: {
    addressLink() {
      let addressLink = ''
      if (this.platform === 'Ethereum') {
        addressLink =
          'https://' +
          (this.network === 'mainnet' ? '' : this.network + '.') +
          'etherscan.io/address/' +
          this.address +
          '?utm_source=StateOfTheDApps'
      } else if (this.platform === 'POA') {
        addressLink =
          'https://blockscout.com/poa/' +
          (this.network === 'mainnet' ? 'core' : 'sokol') +
          '/address/' +
          this.address +
          '?utm_source=StateOfTheDApps'
      } else if (this.platform === 'EOS') {
        addressLink =
          'https://www.myeoskit.com/account/' +
          this.address +
          '?utm_source=StateOfTheDApps'
      }
      return addressLink
    }
  },
  methods: {
    copy() {
      this.copyText = 'Copied!'
      setTimeout(() => {
        this.copyText = 'Copy'
      }, 1500)
    },
    trackContract(address, network, platform) {
      const dapp = this.slug
      const action = trackDappContract(address, dapp, network, platform)
      this.$mixpanel.track(action.name, action.data)
    },
    trackContractCopy(address, network, platform) {
      const dapp = this.slug
      const action = trackDappContractCopy(address, dapp, network, platform)
      this.$mixpanel.track(action.name, action.data)
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
  font-size: 0.7rem;
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
