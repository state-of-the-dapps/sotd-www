<template>
  <div class="component-DappDetailBodyContentModules">
    <div class="main-wrapper">
      <div class="module-wrapper -tier-1">
        <div class="module -status">
          <DappDetailBodyContentModulesStatus/>
        </div>
        <div class="module">
          <DappDetailBodyContentModulesAuthors/>
        </div>
        <div class="module">
          <DappDetailBodyContentModulesLicense/>
        </div>
      </div>
      <div class="module-wrapper -tier-2">
        <div class="module">
          <DappDetailBodyContentModulesSubmitted/>
        </div>
        <div class="module">
          <DappDetailBodyContentModulesUpdated/>
        </div>
      </div>
      <div class="module-wrapper -tier-3">
        <div class="module">
          <DappDetailBodyContentModulesUsers/>
        </div>
        <div class="module">
          <DappDetailBodyContentModulesTransactions/>
        </div>
      </div>
      <div class="module-wrapper -tier-4">
        <div class="module">
          <DappDetailBodyContentModulesContracts/>
        </div>
        <div class="module">
          <DappDetailBodyContentModulesCollections/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DappDetailBodyContentModulesAuthors from './DappDetailBodyContentModulesAuthors'
import DappDetailBodyContentModulesCollections from './DappDetailBodyContentModulesCollections'
import DappDetailBodyContentModulesContracts from './DappDetailBodyContentModulesContracts'
import DappDetailBodyContentModulesLicense from './DappDetailBodyContentModulesLicense'
import DappDetailBodyContentModulesStatus from './DappDetailBodyContentModulesStatus'
import DappDetailBodyContentModulesSubmitted from './DappDetailBodyContentModulesSubmitted'
import DappDetailBodyContentModulesTransactions from './DappDetailBodyContentModulesTransactions'
import DappDetailBodyContentModulesUpdated from './DappDetailBodyContentModulesUpdated'
import DappDetailBodyContentModulesUsers from './DappDetailBodyContentModulesUsers'

export default {
  components: {
    DappDetailBodyContentModulesAuthors,
    DappDetailBodyContentModulesCollections,
    DappDetailBodyContentModulesContracts,
    DappDetailBodyContentModulesLicense,
    DappDetailBodyContentModulesStatus,
    DappDetailBodyContentModulesSubmitted,
    DappDetailBodyContentModulesTransactions,
    DappDetailBodyContentModulesUpdated,
    DappDetailBodyContentModulesUsers
  },
  props: {
    dapp: {
      required: true
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.main-wrapper {
  padding: 10px;
  @include tweakpoint('min-width', 700px) {
    padding: 5px;
  }
}

.module {
  background: lighten($color--gray, 3%);
  padding: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  @include tweakpoint('min-width', 800px) {
    padding: 20px;
  }
  &.-status {
    display: flex;
    align-items: center;
  }
}

.module-wrapper {
  @include tweakpoint('min-width', 800px) {
    display: flex;
    .module {
      margin-left: 5px;
      margin-right: 5px;
    }
  }
  &.-tier-1 {
    @include tweakpoint('min-width', 800px) {
      .module {
        width: calc(33.33% - 10px);
      }
    }
  }
  &.-tier-2, &.-tier-3, &.-tier-4 {
    @include tweakpoint('min-width', 800px) {
      .module {
        width: calc(50% - 10px);
      }
    }
  }
}
</style>
