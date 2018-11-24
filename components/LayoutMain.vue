<template>
  <div 
    :class="siteModal.component ? 'has-modal' : ''" 
    class="layout-default">
    <div 
      :class="siteModal.component ? 'has-modal' : ''" 
      class="wrapper">
      <div class="main">
        <div class="menu">
          <div class="menu-wrapper">
            <Menu/>
          </div>
        </div>
        <slot/>
      </div>
      <div class="footer">
        <SecondaryCta/>
        <Foot/>
      </div>
    </div>
    <Modal/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Foot from '~/components/shared/Foot'
import Menu from '~/components/Menu'
import Modal from '~/components/Modal'
import SecondaryCta from '~/components/SecondaryCta'

export default {
  components: {
    Foot,
    Menu,
    Modal,
    SecondaryCta
  },
  computed: {
    ...mapGetters(['siteModal'])
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.layout-default {
  height: 100%;
  position: relative;
}

.main {
  min-height: 98%;
  position: relative;
}

.menu-wrapper {
  @include margin-wrapper-main;
  padding: 7px 0 0 0;
}

.wrapper {
  height: 100%;
  &.has-modal {
    filter: blur(8px);
  }
}
</style>
