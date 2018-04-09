<template>
  <div class="layout-default">
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
.layout-default {
  height: 100%;
  overflow: hidden;
}

.main {
  min-height: 98%;
  position: relative;
}
</style>
