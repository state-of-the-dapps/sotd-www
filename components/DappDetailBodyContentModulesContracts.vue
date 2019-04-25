<template>
  <div class="DappDetailBodyContentModulesContracts">
    <ul class="contract-list">
      <template v-for="(network, index) in networks">
        <DappDetailBodyContentModulesContractsItem
          v-if="network.addresses.length"
          :key="index"
          :addresses="network.addresses"
          :slug="slug"
          :platform="network.platform"
          :network="network.name"/>
      </template>
    </ul>
  </div>
</template>

<script>
import { platforms, platformNetworkList } from '@/helpers/constants'
import DappDetailBodyContentModulesContractsItem from './DappDetailBodyContentModulesContractsItem'

const contractProps = () => {
  const obj = {}
  const networks = platformNetworkList()
  networks.map(network => {
    obj[network] = {
      type: Array,
      required: true,
      default: () => []
    }
  })
  return obj
}

export default {
  components: {
    DappDetailBodyContentModulesContractsItem
  },
  props: {
    ...contractProps(),
    slug: {
      type: String,
      required: true
    }
  },
  computed: {
    networks() {
      const list = []
      const platformList = platforms
      platformList.map(platform => {
        if (
          platform.name &&
          platform.contracts &&
          platform.contracts.networks &&
          platform.contracts.networks.length
        ) {
          platform.contracts.networks.map(network => {
            if (network.id && network.name) {
              list.push({
                name: network.name,
                addresses: this[network.id],
                platform: platform.name
              })
            }
          })
        }
      })
      return list
    }
  }
}
</script>

<style lang="scss" scoped>
.subtitle {
  margin: 0;
}
</style>
