<template>
<div class="component-DappDetailBodyContentModulesContracts">
  <h4 class="subtitle">Contract address<span v-if="contracts.length > 1">(es)</span></h4>
  <ul class="contract-list">
    <li v-for="(contract, index) in contracts" :key="index" class="contract-item">
      <span class="contract-name"><strong>{{ contract.network | capitalize }}</strong></span>
      <span class="contract-address">
        <a :href="'https://etherscan.io/address/' + contract.address" class="contract-address-value" target="_blank" rel="noopener noreferrer">
          <media :query="{maxWidth: 500}">
            <span>{{ contract.address | truncate(20) }}</span>
          </media>
          <media :query="{minWidth: 500}">
            <span>{{ contract.address }}</span>
          </media>
        </a><span class="contract-address-copy">Copy</span></span>
    </li>
  </ul>
</div>
</template>

<script>
import Media from 'vue-media'

export default {
  components: {
    Media
  },
  props: {
    contracts: {
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
}

.subtitle {
  margin: 0;
}
</style>

