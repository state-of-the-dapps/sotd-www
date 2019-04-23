<template>
  <div
    id="platform"
    class="DappFormFieldsPlatform item"
  >
    <p class="heading"><span class="checkmark"><IconCheckmark :fill="platform.length ? 'purple' : 'gray'"/></span>Platform <span class="required">(required)</span></p>
    <div
      id="platformField"
      class="selection-wrapper"
    >
      <BaseDropdown
        :important="true"
        :options="platforms"
        :selected="platform ? $t(`platformOptions.${platform.toLowerCase()}`) : $t('filters.choosePlatform')"
        :title="$t('filters.choosePlatform')"
        @select="setPlatform"
      />
    </div>
  </div>
</template>

<script>
import { platformSelectOptions } from '@/helpers/constants'
import BaseDropdown from './BaseDropdown'
import IconCheckmark from './IconCheckmark'

export default {
  components: {
    BaseDropdown,
    IconCheckmark
  },
  props: {
    platform: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      platformSelectOptions: platformSelectOptions()
    }
  },
  computed: {
    platforms() {
      const platforms = []
      this.platformSelectOptions.map(platform => {
        platforms.push({
          selection: platform.selection,
          text: this.$t(`platformOptions.${platform.text.toLowerCase()}`)
        })
      })
      return platforms
    }
  },
  methods: {
    setPlatform(value) {
      this.$emit('updateField', 'platform', value)
      const errors = {
        field: 'platform',
        data: []
      }
      this.$emit('updateErrors', errors)
    }
  }
}
</script>


<style lang="scss" scoped>
.selection-wrapper {
  display: flex;
  align-items: center;
  @include highlight;
}

.selection {
  text-decoration: underline;
  width: 50%;
  border: 1px solid $color--black;
  border-left-width: 0;
  padding: 10px;
  transition: background 0.2s ease;
  &:first-child {
    border-left-width: 1px;
  }
  &.is-active {
    text-decoration: none;
    background: $color--black;
    color: $color--gray;
  }
}
</style>
