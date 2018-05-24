<template>
  <div class="component-DappDetailBodyContentModules">
    <div class="main-wrapper">
      <div class="module-wrapper -tier-1">
        <div class="module -status">
          <div>
            <span class="status -live"></span> Status: <strong>Live</strong>
          </div>
        </div>
        <div class="module">
          <h4 class="subtitle">Author(s)</h4>
          <p class="details">Axie Infinity Inc.</p>
        </div>
        <div class="module">
          <h4 class="subtitle">Software license</h4>
          <p class="details">MIT</p>
        </div>
      </div>
      <div class="module-wrapper -tier-2">
        <div class="module">
          Submitted: <strong>Jun 13, 2017</strong>
        </div>
        <div class="module">
          Last updated: <strong>Jun 20, 2017</strong>
        </div>
      </div>
      <div class="module-wrapper -tier-3">
        <div class="module">
          <h4 class="subtitle">Active users</h4>
          <div class="sparkline">
            <trend
              :data="[0,1,1,2,3,5,8,5,3,2,1,1,0]"
              :gradient="['#333']"
              :stroke-width="2"
              :padding="4"
              :height="40"
              auto-draw
              smooth>
            </trend>
          </div>
          <ul class="stat-list">
            <li class="stat-item">
              <span>Monthly</span>
              <span class="stat-value">1,208,982</span>
            </li>
            <li class="stat-item">
              <span>Weekly</span>
              <span class="stat-value">1,208,982</span>
            </li>
            <li class="stat-item">
              <span>Daily</span>
              <span class="stat-value">1,208,982</span>
            </li>
          </ul>
        </div>
        <div class="module">
          <h4 class="subtitle">Transactions</h4>
          <div class="sparkline">
            <trend
              :data="[0,1]"
              :gradient="['#333']"
              :stroke-width="2"
              :height="40"
              auto-draw
              smooth>
            </trend>
          </div>
          <ul class="stat-list">
            <li class="stat-item">
              <span>Monthly</span>
              <span class="stat-value">1,208,982</span>
            </li>
            <li class="stat-item">
              <span>Weekly</span>
              <span class="stat-value">1,208,982</span>
            </li>
            <li class="stat-item">
              <span>Daily</span>
              <span class="stat-value">1,208,982</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="module-wrapper -tier-4">
        <div class="module">
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
        <div class="module">
          <h4 class="subtitle">Featured in these collections</h4>
          <ul class="collection-list">
            <li class="collection-item">
              <span class="collection-icon"></span>
              <span class="collection-name"><SvgBadgeFeatured fill="black" :width="12" :height="14"/> <span class="collection-name-description"><a href="#">Best games of 2018</a></span></span>
            </li>
            <li class="collection-item">
              <span class="collection-icon"></span>
              <span class="collection-name"><SvgBadgeFeatured fill="black" :width="12" :height="14"/> <span class="collection-name-description"><a href="#">Best games of 2018</a></span></span>
            </li>
            <li class="collection-item">
              <span class="collection-icon"></span>
              <span class="collection-name"><SvgBadgeFeatured fill="black" :width="12" :height="14"/> <span class="collection-name-description"><a href="#">Best games of 2018</a></span></span>
            </li>
            <li class="collection-item">
              <span class="collection-icon"></span>
              <span class="collection-name"><SvgBadgeFeatured fill="black" :width="12" :height="14"/> <span class="collection-name-description"><a href="#">Best games of 2018</a></span></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Trend from 'vuetrend'
import SvgBadgeFeatured from './SvgBadgeFeatured'

export default {
  components: {
    SvgBadgeFeatured,
    Trend
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.collection-list {
  margin-top: 9px;
}

.collection-item {
  padding: 3px 0;
}

.collection-name {
  display: flex;
  align-items: center;
}

.collection-name-description {
  margin-left: 5px;
}

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

.details {
  margin: 0;
}

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

.sparkline {
  margin: 10px 0;
}

.subtitle {
  margin: 0;
}

.stat-item {
  padding: 4px 5px;
  &:nth-child(odd) {
    background: lighten($color--white, 100%);
  }
  display: flex;
  align-items: center;
  span {
    width: 50%;
    &:last-child {
      text-align: right;
    }
  }
}

.stat-value {
  font-family: 'Inconsolata', monospace;
}

.status {
  display: inline-block;
  width: 15px;
  height: 15px;
  position: relative;
  top: 3px;
  margin-right: 3px;
  border-radius: 50%;
  @include dapp-background-colors
}
</style>
