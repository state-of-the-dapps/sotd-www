<template>
  <transition name="fade">
    <div 
      v-if="siteModal.component" 
      class="component-Modal">
      <div class="outer-wrapper">
        <div class="inner-wrapper">
          <component 
            :is="siteModal.component" 
            :modal-props="siteModal.props"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import ModalDappsDetailShare from './ModalDappsDetailShare'
import ModalDappsNewConfirmation from './ModalDappsNewConfirmation'
import ModalPromotedDappsNewConfirmation from './ModalPromotedDappsNewConfirmation'

export default {
  components: {
    ModalDappsDetailShare,
    ModalDappsNewConfirmation,
    ModalPromotedDappsNewConfirmation
  },
  computed: {
    ...mapGetters(['siteModal'])
  },
  watch: {
    $route() {
      this.close()
    }
  },
  destroyed() {
    this.close()
  },
  methods: {
    close() {
      const modal = {
        component: '',
        mpData: {},
        props: {}
      }
      this.$store.dispatch('setSiteModal', modal)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.component-Modal {
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
  text-align: center;
}

.inner-wrapper {
  position: relative;
  max-width: 600px;
  background: $color--gray;
  padding: 50px;
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
