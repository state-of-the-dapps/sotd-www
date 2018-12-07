<template>
  <section class="section">
    <div class="outer-wrapper">
      <ul class="count-list">
        <li class="count-item">Showing <strong @click="$mixpanel.track('DApps - Results count')">{{ itemCount }}</strong> of <strong @click="$mixpanel.track('DApps - Results count')">{{ pagerTotalCount }}</strong> result{{ itemCount == 1 ? '' : 's' }}</li>
      </ul>
    </div>
  </section>
</template>

<script>
import TabDropdown from '~/components/dapps/search/countRefine/TabDropdown.vue'
import StatusDropdown from '~/components/dapps/search/countRefine/StatusDropdown.vue'

export default {
  components: {
    TabDropdown,
    StatusDropdown
  },
  computed: {
    tabDropdownIsActive() {
      return this.$store.getters['dapps/search/tabDropdownIsActive']
    },
    statusDropdownIsActive() {
      return this.$store.getters['dapps/search/statusDropdownIsActive']
    },
    selectedTab() {
      return this.$store.getters['dapps/search/tabQuery']
    },
    selectedStatus() {
      return this.$store.getters['dapps/search/statusQuery']
    },
    itemCount() {
      return this.$store.getters['dapps/search/itemCount']
    },
    pagerTotalCount() {
      return this.$store.getters['dapps/search/pagerTotalCount']
    }
  },
  beforeDestroy() {
    if (this.tabDropdownIsActive === true) {
      this.toggle('categories')
    }
    if (this.statusDropdownIsActive === true) {
      this.toggle('refine')
    }
  },
  methods: {
    toggle(type) {
      this.$mixpanel.track('DApps - Toggle ' + type)
      this.$store.dispatch('dapps/search/toggleRefineDropdown', type)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.outer-wrapper {
  display: flex;
  flex-direction: column-reverse;
  @include tweakpoint('min-width', 640px) {
    padding-left: 0;
    padding-right: 0;
  }
  @include tweakpoint('min-width', $tweakpoint--default) {
    padding: 17px 0 5px 0;
    flex-direction: row;
    align-items: center;
    > :nth-child(1) {
      flex-grow: 1;
    }
  }
}

.dropdown {
  display: inline-block;
  padding: 3px 16px 3px 6px;
  margin: 0 5px;
  width: 112px;
  white-space: nowrap;
  border: 1px solid rgba($color--black, 0.15);
  position: relative;
  &:hover {
    cursor: pointer;
  }
  &:after {
    position: absolute;
    content: '';
    background: url('~assets/images/arrows/dropdown.png') center center
      no-repeat;
    background-size: 13px 8px;
    transition: transform 0.3s ease;
    transform: scaleY(-1);
    width: 13px;
    height: 8px;
    right: 6px;
    bottom: 6px;
  }
  &.--is-active {
    border-color: $color--black;
    &:after {
      transform: scaleY(1);
    }
  }
  /deep/ .container {
    position: absolute;
    border: 1px solid $color--black;
    background: rgba(lighten($color--gray, 100%), 0.95);
    padding: 10px;
    width: calc(100% + 2px);
    z-index: 10;
    box-shadow: 0 0 10px rgba($color--black, 0.1);
    top: 21px;
    left: -1px;
  }

  /deep/ .item {
    margin: 4px 0;
    font-size: 0.95rem;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
    &:hover {
      border-left: 1px solid $color--black;
      padding-left: 3px;
      margin-left: -4px;
      cursor: pointer;
    }
  }
}

.count-list {
  margin-top: 10px;
  @include tweakpoint('min-width', $tweakpoint--default) {
    margin-top: 0;
  }
}
</style>
