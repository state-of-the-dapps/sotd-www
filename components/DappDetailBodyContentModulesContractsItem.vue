<template>
  <li class="DappDetailBodyContentModulesContractsItem">
    <h4 class="contract-name">{{ network | capitalize }} {{ $t(namespace(label)) | pluralize(addresses.length) }} ({{ platform }})</h4>
    <ul class="contract-addresses">
      <DappDetailBodyContentModulesContractsAddress
        v-for="(address, index) in visibleAddresses"
        :key="index"
        :slug="slug"
        :platform="platform"
        :network="network"
        :address="address"/>
      <DappDetailBodyContentModulesContractsAddress
        v-for="(address, index) in hiddenAddresses"
        :key="index + 10"
        :slug="slug"
        :platform="platform"
        :network="network"
        :address="address"/>
      <li v-if="addresses.length > 10"><span
        class="show-hide"
        @click="toggleHidden">{{ hiddenIsVisible ? 'Hide ' + addresses.slice(visibleLimit).length + ' contracts' : 'Show ' + addresses.slice(visibleLimit).length + ' more contracts' }}</span></li>
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
      type: Array,
      required: true,
      default: () => []
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
  data() {
    return {
      hiddenIsVisible: false,
      visibleLimit: 10
    }
  },
  computed: {
    label() {
      if (this.platform === 'Steem' || this.platform === 'Hive') {
        return 'address'
      } else {
        return 'contract'
      }
    },
    visibleAddresses() {
      const addresses = this.addresses.slice(0, this.visibleLimit)
      return addresses
    },
    hiddenAddresses() {
      const addresses = this.hiddenIsVisible
        ? this.addresses.slice(this.visibleLimit)
        : []
      return addresses
    }
  },
  methods: {
    toggleHidden() {
      this.hiddenIsVisible = !this.hiddenIsVisible
    }
  }
}
</script>

<style lang="scss" scoped>
.contract-name {
  margin: 0;
}

.contract-addresses {
  margin: 5px 0 15px 0;
  flex: 1;
}

.show-hide {
  display: inline-block;
  background: rgba($color--black, 0.15);
  border-radius: 4px;
  padding: 5px 7px 4px 7px;
  font-weight: 700;
  margin-top: 5px;
  font-size: 0.8rem;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
