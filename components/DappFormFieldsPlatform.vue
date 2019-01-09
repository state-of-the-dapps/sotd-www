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
export default {
  props: {
    platform: {
      type: String,
      required: true
    }
  },
  methods: {
    setPlatform(value) {
      this.$emit('updateField', 'platform', value)
    }
  }
}
</script>


<style lang="scss" scoped>
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
