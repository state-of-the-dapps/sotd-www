<template>
  <ul class="list">
    <li class="item">Show <span class="dropdown" ref="browseCategories" :class="{ '--is-active': browseCategoriesIsActive }" @click="toggleBrowseCategories">{{ selectedBrowseCategory | formatBrowseCategoryOptions }}</span> with status <span class="dropdown"  :class="{ '--is-active': browseRefineIsActive }" ref="browseRefine" @click="toggleBrowseRefine">{{ selectedBrowseRefine }}</span></li>
  </ul>
</template>

<script>
  export default {
    beforeDestroy () {
      if (this.browseCategoriesIsActive === true) {
        this.toggleBrowseCategories()
      }
      if (this.browseRefineIsActive === true) {
        this.toggleBrowseRefine()
      }
    },
    computed: {
      browseCategoriesIsActive () {
        return this.$store.getters['dapps/browseCategories/isActive']
      },
      browseRefineIsActive () {
        return this.$store.getters['dapps/browseRefine/isActive']
      },
      selectedBrowseCategory () {
        return this.$store.getters['dapps/categoryQuery']
      },
      selectedBrowseRefine () {
        return this.$store.getters['dapps/refineQuery']
      }
    },
    methods: {
      setBrowseCategoriesPosition () {
        if (this.browseCategoriesIsActive === true) {
          const browseCategoriesPosition = {
            xPos: this.$refs.browseCategories.offsetLeft,
            yPos: this.$refs.browseCategories.offsetTop
          }
          this.$store.dispatch('dapps/browseCategories/setPosition', browseCategoriesPosition)
        }
      },
      setBrowseRefinePosition () {
        if (this.browseRefineIsActive === true) {
          const browseRefinePosition = {
            xPos: this.$refs.browseRefine.offsetLeft,
            yPos: this.$refs.browseRefine.offsetTop
          }
          this.$store.dispatch('dapps/browseRefine/setPosition', browseRefinePosition)
        }
      },
      toggleBrowseCategories () {
        this.$mixpanel.track('DApps - Toggle categories')
        this.$store.dispatch('dapps/browseCategories/toggle')
        this.setBrowseCategoriesPosition()
      },
      toggleBrowseRefine () {
        this.$mixpanel.track('DApps - Toggle refine')
        this.$store.dispatch('dapps/browseRefine/toggle')
        this.setBrowseRefinePosition()
      }
    },
    mounted () {
      this.setBrowseCategoriesPosition()
      this.setBrowseRefinePosition()
      window.addEventListener('resize', this.setBrowseCategoriesPosition)
      window.addEventListener('resize', this.setBrowseRefinePosition)
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/settings';

  .dropdown {
    display: inline-block;
    padding: 3px 16px 3px 6px;
    margin: 0 5px;
    width: 145px;
    white-space: nowrap;
    border: 1px solid rgba($color--mine-shaft,.15);
    position: relative;
    &:hover {
      cursor: pointer;
    }
    &:after {
      position: absolute;
      content: "";
      background: url('/images/arrows/dropdown.png') center center no-repeat;
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
    &:last-child {
      margin-right: 0;
      width: 100px;
    }
  }
</style>
