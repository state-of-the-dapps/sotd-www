<template>
  <div 
    :class="siteModal.component ? 'has-modal' : ''" 
    class="layout-default">
    <div 
      :class="siteModal.component ? 'has-modal' : ''" 
      class="wrapper">
      <main class="main">
        <nuxt/>
      </main>
      <footer class="footer">
        <SecondaryCta/>
        <BaseFooter/>
      </footer>
    </div>
    <Modal/>
  </div>
</template>

<script>
import Layout from '~/layouts/default'

export default {
  extends: Layout
}
</script>
