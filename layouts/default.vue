<template>
  <div class="layout-default">
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
      <Foot/>
    </div>
  </div>
</template>

<script>
import Foot from '~/components/shared/Foot'
import Menu from '~/components/Menu'
import SecondaryCta from '~/components/SecondaryCta'

export default {
  components: {
    Foot,
    Menu,
    SecondaryCta
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/settings';

.layout-default {
  height: 100%;
}

.main {
  min-height: 98%;
  position: relative;
  overflow: hidden;
}

.menu {
  background: rgba($color--white, .5);
}

.menu-wrapper {
  @include margin-wrapper-main;
  padding: 7px 0;
}
</style>
