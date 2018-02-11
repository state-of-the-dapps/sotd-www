<template>
  <section class="section">
    <div class="container">
      <ul class="count-list">
        <li class="count-item">Showing <strong @click="$mixpanel.track('DApps - Results count')">{{ itemCount }}</strong> of <strong @click="$mixpanel.track('DApps - Results count')">{{ pagerTotalCount }}</strong> result{{ itemCount == 1 ? '' : 's' }}</li>
      </ul>
      <ul>
        <li>Show
          <span class="dropdown" :class="{ '--is-active': tabDropdownIsActive }" @click="toggle('tab')">{{ selectedTab | formatDappTabOptions }}
            <TabDropdown/>
          </span> with
          <span class="dropdown" :class="{ '--is-active': statusDropdownIsActive }" @click="toggle('status')">{{ selectedStatus }}
            <StatusDropdown/>
          </span>
          status
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  import TabDropdown from '~/components/dapps/list/countRefine/TabDropdown.vue'
  import StatusDropdown from '~/components/dapps/list/countRefine/StatusDropdown.vue'

  export default {
    beforeDestroy () {
      if (this.tabDropdownIsActive === true) {
        this.toggle('categories')
      }
      if (this.statusDropdownIsActive === true) {
        this.toggle('refine')
      }
    },
    components: {
      TabDropdown,
      StatusDropdown
    },
    computed: {
      tabDropdownIsActive () {
        return this.$store.getters['dapps/list/tabDropdownIsActive']
      },
      statusDropdownIsActive () {
        return this.$store.getters['dapps/list/statusDropdownIsActive']
      },
      selectedTab () {
        return this.$store.getters['dapps/list/tabQuery']
      },
      selectedStatus () {
        return this.$store.getters['dapps/list/statusQuery']
      },
      itemCount () {
        return this.$store.getters['dapps/list/itemCount']
      },
      pagerTotalCount () {
        return this.$store.getters['dapps/list/pagerTotalCount']
      }
    },
    methods: {
      toggle (type) {
        this.$mixpanel.track('DApps - Toggle ' + type)
        this.$store.dispatch('dapps/list/toggleRefineDropdown', type)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .container {
    display: flex;
    flex-direction: column-reverse;
    @include tweakpoint('min-width', $tweakpoint--default) {
      padding: 25px 20px;
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
    border: 1px solid rgba($color--mine-shaft,.15);
    position: relative;
    &:hover {
      cursor: pointer;
    }
    &:after {
      position: absolute;
      content: "";
      background: url('~/assets/images/arrows/dropdown.png') center center no-repeat;
      background-size: 13px 8px;
      transition: transform .3s ease;
      transform: scaleY(-1);
      width: 13px;
      height: 8px;
      right: 6px;
      bottom: 6px;
    }
    &.--is-active {
      border-color: $color--mine-shaft;
      &:after {
        transform: scaleY(1);
      }
    }
    /deep/ .container {
      position: absolute;
      border: 1px solid $color--mine-shaft;
      background: rgba(lighten($color--gallery, 100%),.95);
      padding: 10px;
      width: calc(100% + 2px);
      z-index: 10;
      box-shadow: 0 0 10px rgba($color--mine-shaft,.1);
      top: 21px;
      left: -1px;
    }

    /deep/ .item {
      margin: 4px 0;
      font-size: .95rem;
      &:first-child {
        margin-top: 0;
      }
      &:last-child {
        margin-bottom: 0;
      }
      &:hover {
        border-left: 1px solid $color--mine-shaft;
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
