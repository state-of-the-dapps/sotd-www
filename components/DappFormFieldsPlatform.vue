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
      <button
        :class="platform === 'GoChain' ? 'is-active' : ''"
        class="selection"
        @click="setPlatform('GoChain')">GoChain</button>
      <button
        :class="platform === 'Steem' ? 'is-active' : ''"
        class="selection"
        @click="setPlatform('Steem')">Steem</button>
    </div>
  </div>
</template>

<script>
import IconCheckmark from './IconCheckmark'

export default {
  components: {
    IconCheckmark
  },
  props: {
    platform: {
      type: String,
      required: true,
      default: ''
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
