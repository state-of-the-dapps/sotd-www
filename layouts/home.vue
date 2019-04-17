<template>
  <div class="layout">
    <div class="wrapper">
      <main class="main">
        <nuxt/>
      </main>
      <footer class="footer">
        <!-- <SecondaryCta/> -->
        <TheFooter/>
      </footer>
    </div>
  </div>
</template>

<script>
import Layout from '~/layouts/default'

export default {
  extends: Layout
}
</script>
