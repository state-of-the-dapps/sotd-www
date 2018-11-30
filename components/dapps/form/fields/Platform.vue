<template>
  <div class="item">
    <p class="heading">Platform</p>
    <div class="selection-wrapper">
      <button
        :class="platform === 'Ethereum' ? 'is-active' : ''"
        class="selection"
        @click="setPlatform('Ethereum')">Ethereum</button>
      <button
        :class="platform === 'EOS' ? 'is-active' : ''"
        class="selection"
        @click="setPlatform('EOS')">EOS</button>
      <button
        :class="platform === 'POA' ? 'is-active' : ''"
        class="selection"
        @click="setPlatform('POA')">POA</button>
    </div>
  </div>
</template>

<script>
import SvgBadgeComplete from '~/components/SvgBadgeComplete'

export default {
  components: {
    SvgBadgeComplete
  },
  computed: {
    platform() {
      return this.$store.getters['dapps/form/platform']
    }
  },
  methods: {
    setPlatform(value) {
      const field = {
        name: 'platform',
        value: value
      }
      this.$store.dispatch('dapps/form/setField', field)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.selection-wrapper {
  display: flex;
  align-items: center;
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
