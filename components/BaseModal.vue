<template>
  <transition name="fade">
    <div class="component-base-modal">
      <div class="outer-wrapper">
        <div class="inner-wrapper">
          <slot/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  destroyed() {
    this.setPageModal(false)
  },
  mounted() {
    this.setPageModal(true)
  },
  methods: {
    ...mapActions(['setPageModal'])
  }
}
</script>


<style lang="scss" scoped>
@import '~assets/css/settings';

.component-base-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background: rgba($color--black, 0.5);
  display: flex;
  justify-content: center;
  overflow-y: scroll;
}

.inner-wrapper {
  position: relative;
  max-width: 600px;
  background: $color--gray;
  padding: 20px;
  border-radius: 4px;
  margin: 40px 10px;
  z-index: 110;
  box-shadow: 0 0 50px rgba($color--black, 0.25);
  @include tweakpoint('min-width', 600px) {
    margin: 40px auto;
  }
}

.outer-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
