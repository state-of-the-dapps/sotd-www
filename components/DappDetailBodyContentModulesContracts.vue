<template>
<div class="component-DappDetailBodyContentModulesContracts">
  <h4 class="subtitle">Contract address(es)</h4>
  <ul class="contract-list">
    <li class="contract-item">
      <span class="contract-name"><strong>Mainnet</strong></span>
      <span class="contract-address"><a href="#" class="contract-address-value">0x960b236A07cf12</a>&hellip;<span class="contract-address-copy">Copy</span></span>
    </li>
    <li class="contract-item">
      <span class="contract-name"><strong>Rinkeby</strong></span>
      <span class="contract-address"><a href="#" class="contract-address-value">0x960b236A07cf12</a>&hellip;<span class="contract-address-copy">Copy</span></span>
    </li>
  </ul>
</div>
</template>

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
  width: 75px;
}

.contract-address {
  flex: 1;
  position: relative;
  top: 1px;
}

.contract-address-value {
  font-family: 'Inconsolata', monospace;
}

.contract-address-copy {
  margin-left: 5px;
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

