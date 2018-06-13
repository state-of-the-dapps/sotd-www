<template>
  <li class="component-DappListItem">
    <ul class="columns">
      <li class="column -rank">
        {{ dapp.rank }}
      </li>
      <li class="column -dapp">{{ dapp.name }}</li>
      <li class="column -tagline">{{ dapp.teaser }}</li>
      <li class="column -category"><span v-if="dapp.tags.length">{{ dapp.tags[0] }}</span></li>
      <li class="column -dau">{{ dapp.stats.dau }}</li>
      <li class="column -mau">{{ dapp.stats.mau }}</li>
      <li class="column -vol_7d">{{ dapp.stats.value_7d.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) }}</li>
    </ul>
  </li>
</template>

<script>
export default {
  props: {
    dapp: {
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-DappListItem {
  margin-bottom: 5px;
  font-size: 1rem;
  &:last-child {
    margin-bottom: 0;
  }
}

.columns {
  display: flex;
  align-items: center;
  padding: 7px 0;
  border-radius: 4px;
  background: lighten($color--white, 100%);
}

@include dapp-rankings-widths
</style>
