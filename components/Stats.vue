<template>
  <div class="component-Stats">
    <ul class="list">
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">Total ÐApps</h2>
          <p class="value">{{ 15000 | abbreviateNumber(2) }}</p>
        </div>
      </li>
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">Daily active users</h2>
          <p class="value">{{ 15000 | abbreviateNumber(2) }}</p>
        </div>
      </li>
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">24 HR transactions</h2>
          <p class="value">{{ 15000 | abbreviateNumber(2) }}</p>
        </div>
      </li>
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">24 HR volume (ETH)</h2>
          <p class="value">{{ 15000 | abbreviateNumber(2) }}</p>
        </div>
      </li>
      <li class="item">
        <div class="wrapper">
          <h2 class="heading">Smart contracts</h2>
          <p class="value">{{ 15000 | abbreviateNumber(2) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/settings';

.list {
  display: block;
  text-align: center;
  @include tweakpoint('min-width', 1000px) {
    display: flex;
    flex-wrap: wrap;
    padding-top: 10px;
    justify-content: center;
    text-align: left;
  }
}

.item {
  &:last-child .wrapper {
    border: none;
    margin-right: 0;
    padding-right: 0;
  }
}

.heading {
  @include title;
  text-transform: uppercase;
  font-size: 2.5rem;
  margin-bottom: 0;
}

.value {
  @include title;
  font-size: 7rem;
  margin: 0;
  line-height: 1;
  text-transform: uppercase;
}

.wrapper {
  @include tweakpoint('min-width', 1000px) {
    margin-right: 20px;
    padding-right: 20px;
    border-right: 1px solid rgba($color--black, .2);
  }
}
</style>
