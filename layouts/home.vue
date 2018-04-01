<template>
  <div class="layout-home">
    <div class="main">
      <nuxt/>
    </div>
    <div class="footer">
      <Foot/>
    </div>
  </div>
</template>

<script>
import Foot from '~/components/shared/Foot.vue'

export default {
  components: {
    Foot
  }
}
</script>

<style lang="scss" scoped>
.layout-home {
  height: 100%;
}

.main {
  min-height: 98%;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}
</style>
