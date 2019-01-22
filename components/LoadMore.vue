<template>
  <div class="LoadMore">
    <div class="wrapper">
      <p 
        v-if="dapps.length < total && !isLoading" 
        class="button-wrapper">
        <button 
          class="button" 
          @click="loadMore">
          Load the <span v-if="total - dapps.length > 1"> <span v-if="total - dapps.length > limit">next {{ limit }}</span><span v-else>last {{ total - dapps.length }}</span> ÐApps</span><span v-else>last ÐApp</span>
        </button>
      </p>
      <p 
        v-if="dapps.length >= total && !isLoading" 
        class="message">No {{ dapps.length > 0 ? 'more' : '' }} ÐApps here. You can always <nuxt-link 
          :to="localePath({ name: 'dapps-new' })" 
          class="link" 
          @click.native="$mixpanel.track('DApps - New DApp')">submit one</nuxt-link>!</p>
      <p 
        v-if="isLoading" 
        class="loader-wrapper"><button class="loader"/></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dapps: {
      type: Array,
      required: true,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      required: true,
      default: false
    },
    limit: {
      type: Number,
      required: true,
      default: null
    },
    offset: {
      type: Number,
      required: true,
      default: null
    },
    total: {
      type: Number,
      required: true,
      default: null
    }
  },
  methods: {
    loadMore() {
      this.$emit('loadMore')
    }
  }
}
</script>

<style lang="scss" scoped>
.LoadMore {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75px;
}

.button {
  padding: 9px 18px;
  color: $color--gray;
  background: $color--black;
  box-shadow: 0 17px 70px rgba($color--black, 0.2);
  cursor: pointer;
  position: relative;
  &:active {
    top: 1px;
  }
}

.button-wrapper {
  text-align: center;
  margin: 0;
}

.loading-wrapper {
  padding-top: 20px;
}

.message {
  text-align: center;
  font-size: 1.25rem;
  color: $color--black;
}
</style>
