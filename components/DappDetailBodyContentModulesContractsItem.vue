<template>
  <li class="contract-item">
    <h4 class="contract-name">{{ network | capitalize }} contract<span v-if="addresses.length > 1">s</span></h4>
    <ul class="contract-addresses">
      <DappDetailBodyContentModulesContractsAddress
        v-for="(address, index) in addresses"
        :key="index"
        :slug="slug"
        :network="network"
        :address="address"/>
    </ul>
  </li>
</template>

<script>
import DappDetailBodyContentModulesContractsAddress from './DappDetailBodyContentModulesContractsAddress'

export default {
  components: {
    DappDetailBodyContentModulesContractsAddress
  },
  props: {
    addresses: {
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

.contract-name {
  margin: 0;
}

.contract-addresses {
  margin: 5px 0 15px 0;
  flex: 1;
}
</style>
