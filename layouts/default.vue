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
        <nuxt/>
      </div>
      <div class="footer">
        <SecondaryCta/>
        <BaseFooter/>
      </div>
    </div>
    <Modal/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseFooter from '~/components/BaseFooter'
import Menu from '~/components/Menu'
import Modal from '~/components/Modal'
import SecondaryCta from '~/components/SecondaryCta'

export default {
  components: {
    BaseFooter,
    Menu,
    Modal,
    SecondaryCta
  },
  computed: {
    ...mapGetters(['pageModal', 'siteModal'])
  },
  head() {
    return {
      bodyAttrs: {
        class: this.siteModal.component || this.pageModal ? 'has-modal' : ''
      }
    }
  }
}
</script>

<style lang="scss">
input::placeholder {
  opacity: 1;
}

button:focus {
  outline: none;
}

p {
  margin: 1em 0;
}

h1,
h2 {
  margin: 0.83em 0;
}
</style>

<style lang="scss">
body {
  &.has-modal {
    overflow: hidden;
  }
}
</style>

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
