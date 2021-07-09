<template>
  <li class="DappDetailBodyContentModulesContractsAddress">
    <a
      :href="addressLink"
      class="contract-address-value"
      target="_blank"
      rel="noopener"
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
      @click="trackContractCopy(address, network)">{{ $t(namespace(copyText)) }}</span>
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
      required: true,
      default: ''
    },
    network: {
      type: String,
      required: true,
      default: ''
    },
    platform: {
      type: String,
      required: true,
      default: ''
    },
    slug: {
      type: String,
      required: true,
      default: ''
    }
  },
  data: () => {
    return {
      copyText: 'copy'
    }
  },
  computed: {
    addressLink() {
      let addressLink = ''
      if (this.platform === 'Ethereum') {
        addressLink =
          'https://' +
          (this.network === 'Mainnet' ? '' : this.network + '.') +
          'etherscan.io/address/' +
          this.address +
          '?utm_source=StateOfTheDApps'
      } else if (this.platform === 'POA') {
        addressLink =
          'https://blockscout.com/poa/core/address/' +
          this.address +
          '?utm_source=StateOfTheDApps'
      } else if (this.platform === 'GoChain') {
        addressLink =
          'https://explorer.gochain.io/addr/' +
          this.address +
          '?utm_source=StateOfTheDApps'
      } else if (this.platform === 'Klaytn') {
        addressLink = 'https://scope.klaytn.com/account/' + this.address
        // Klaytnscope can't handle utm_source query arguments.
      } else if (this.platform === 'Neo') {
        addressLink =
          'https://scan.nel.group/contract/' +
          this.address +
          '?utm_source=StateOfTheDApps'
      } else if (this.platform === 'Obyte') {
        addressLink =
          'https://explorer.obyte.org/?utm_source=StateOfTheDApps#' +
          this.address
      } else if (this.platform === 'OST') {
        addressLink =
          'https://view.ost.com/mainnet/address/ad-1414-' +
          this.address +
          '?utm_source=StateOfTheDApps'
      } else if (this.platform === 'EOS') {
        addressLink =
          'https://eospark.com/account/' +
          this.address +
          '?utm_source=StateOfTheDApps'
      } else if (this.platform === 'Steem') {
        addressLink =
          'https://steemd.com/@' + this.address + '?utm_source=StateOfTheDApps'
      } else if (this.platform === 'Hive') {
        addressLink =
          'https://hiveblocks.com/@' +
          this.address +
          '?utm_source=StateOfTheDApps'
      } else if (this.platform === 'TRON') {
        addressLink = 'https://tronscan.org/#/contract/' + this.address
      } else if (this.platform === 'ICON') {
        addressLink =
          'https://tracker.icon.foundation/contract/' +
          this.address +
          '?utm_source=StateOfTheDApps'
      } else if (this.platform === 'NEAR') {
        addressLink =
          'https://explorer.near.org/accounts/' +
          this.address +
          '?utm_source=StateOfTheDApps'
      } else if (this.platform === 'xDai') {
        addressLink =
          'https://blockscout.com/poa/dai/address/' +
          this.address +
          '?utm_source=StateOfTheDApps'
      }
      return addressLink
    }
  },
  methods: {
    copy() {
      this.copyText = 'copied'
      setTimeout(() => {
        this.copyText = 'copy'
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
.DappDetailBodyContentModulesContractsAddress {
  padding: 2px 0;
}

.contract-address-value {
  @include font-text-mono;
  font-size: 0.9rem;
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
  border-radius: 10000px;
  cursor: pointer;
  &:active {
    top: 0;
  }
}
</style>
