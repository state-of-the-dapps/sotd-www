<template>
  <div class="layout-default">
    <main class="main">
      <slot/>
    </main>
    <footer class="footer">
      <SecondaryCta/>
      <Foot/>
    </footer>
  </div>
</template>

<script>
import Foot from '~/components/shared/Foot.vue'
import SecondaryCta from '~/components/SecondaryCta'

export default {
  components: {
    Foot,
    SecondaryCta
  }
}
</script>

<style lang="scss" scoped>
.layout-default {
  height: 100%;
}

.main {
  min-height: 98%;
  position: relative;
}
</style>
