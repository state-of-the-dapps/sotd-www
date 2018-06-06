<template>
  <li class="contract-item">
    <span class="contract-name"><strong v-if="!excludeLabel">{{ network | capitalize }}</strong></span>
    <span class="contract-address">
      <a @click="trackContract(address, network)" :href="'https://' + (network === 'mainnet' ? '' : network + '.') + 'etherscan.io/address/' + address" class="contract-address-value" target="_blank" rel="noopener noreferrer">
        <media :query="{maxWidth: 500}">
          <span>{{ address | truncate(20) }}</span>
        </media>
        <media :query="{minWidth: 500}">
          <span>{{ address }}</span>
        </media>
      </a>
      <span class="contract-address-copy" v-clipboard:copy="address" v-clipboard:success="copy" @click="trackContractCopy(address, network)">{{ copyText }}</span>
    </span>
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
    excludeLabel: {
      required: false
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

.contract-item {
  display: flex;
  align-items: center;
  padding: 2px 0;
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
</style>
