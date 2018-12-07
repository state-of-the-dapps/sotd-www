<template>
  <div class="layout-default">
    <main class="main">
      <slot/>
    </main>
    <footer class="footer">
      <SecondaryCta/>
      <BaseFooter/>
    </footer>
  </div>
</template>

<script>
import BaseFooter from '~/components/BaseFooter.vue'
import SecondaryCta from '~/components/SecondaryCta'

export default {
  components: {
    BaseFooter,
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
